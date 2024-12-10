"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import DashboardNav from "@/components/dashboard-nav"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Mon', translations: 4 },
  { name: 'Tue', translations: 3 },
  { name: 'Wed', translations: 7 },
  { name: 'Thu', translations: 5 },
  { name: 'Fri', translations: 8 },
  { name: 'Sat', translations: 6 },
  { name: 'Sun', translations: 9 },
]

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="p-6 glass-morphism">
            <h3 className="text-lg font-medium">Total Translations</h3>
            <p className="text-3xl font-bold mt-2">1,234</p>
          </Card>
          <Card className="p-6 glass-morphism">
            <h3 className="text-lg font-medium">Languages Used</h3>
            <p className="text-3xl font-bold mt-2">15</p>
          </Card>
          <Card className="p-6 glass-morphism">
            <h3 className="text-lg font-medium">Accuracy Rate</h3>
            <p className="text-3xl font-bold mt-2">98.5%</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8"
        >
          <Card className="p-6 glass-morphism">
            <h3 className="text-lg font-medium mb-4">Translation Activity</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="translations"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Card className="p-6 glass-morphism">
            <h3 className="text-lg font-medium mb-4">Recent Translations</h3>
            <div className="space-y-4">
              {recentTranslations.map((translation, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{translation.text}</p>
                    <p className="text-sm text-muted-foreground">
                      {translation.from} → {translation.to}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 glass-morphism">
            <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
            <div className="space-y-4">
              <Button
                className="w-full"
                onClick={() => router.push("/translate")}
              >
                New Translation
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => router.push("/translate/document")}
              >
                Upload Document
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => router.push("/translate/multi")}
              >
                Batch Translation
              </Button>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

const recentTranslations = [
  { text: "Hello world", from: "English", to: "Spanish" },
  { text: "Good morning", from: "English", to: "French" },
  { text: "Thank you", from: "English", to: "German" },
]