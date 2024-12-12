"use client"

import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, FileText, Upload } from "lucide-react"

import { useToast } from "@/components/ui/use-toast"

interface FileDropzoneProps {
  onFileSelect: (content: string) => void
}

export function FileDropzone({ onFileSelect }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true)
    } else if (e.type === "dragleave") {
      setIsDragging(false)
    }
  }, [])

  const validateFile = (file: File): boolean => {
    if (file.type !== "text/plain") {
      setError("Please upload a .txt file")
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Only .txt files are supported",
      })
      return false
    }
    return true
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      setError(null)

      const file = e.dataTransfer.files[0]
      if (file && validateFile(file)) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          onFileSelect(content)
        }
        reader.readAsText(file)
      }
    },
    [onFileSelect]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file && validateFile(file)) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          onFileSelect(content)
        }
        reader.readAsText(file)
      }
    },
    [onFileSelect]
  )

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            relative h-64 rounded-lg border-2 border-dashed
            glass-morphism transition-colors duration-300
            flex flex-col items-center justify-center space-y-4
            cursor-pointer
            ${isDragging ? "border-primary" : "border-border"}
            ${error ? "border-destructive" : ""}
          `}
        >
          <input
            type="file"
            accept=".txt"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <AnimatePresence mode="wait">
            {error ? (
              <motion.div
                key="error"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex flex-col items-center text-destructive"
              >
                <AlertCircle className="h-12 w-12 mb-2" />
                <p className="text-sm">{error}</p>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex flex-col items-center text-muted-foreground"
              >
                {isDragging ? (
                  <Upload className="h-12 w-12 mb-2" />
                ) : (
                  <FileText className="h-12 w-12 mb-2" />
                )}
                <p className="text-lg font-medium">
                  {isDragging
                    ? "Drop your file here"
                    : "Drag & drop your text file"}
                </p>
                <p className="text-sm">or click to browse</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
