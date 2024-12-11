"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText } from "lucide-react"

interface FilePreviewProps {
    content: string
}

export function FilePreview({ content }: FilePreviewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="glass-morphism">
                <div className="p-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <FileText className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">File Content</h3>
                    </div>
                    <ScrollArea className="h-[300px] w-full rounded-md border">
                        <div className="p-4 text-sm">
                            <pre className="whitespace-pre-wrap font-mono">{content}</pre>
                        </div>
                    </ScrollArea>
                </div>
            </Card>
        </motion.div>
    )
}