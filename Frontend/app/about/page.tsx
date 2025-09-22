"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, User } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">About HealthPredict</h1>
        <p className="text-lg text-muted-foreground text-pretty">
          Learn about this AI-powered healthcare prediction platform
        </p>
      </div>

      <Card className="transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <User className="h-12 w-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Project Created by XYZ</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground text-pretty">
            This AI-powered healthcare prediction platform was developed to help users get quick health insights and
            connect with nearby medical professionals. The system uses machine learning to analyze health parameters and
            provide preliminary health assessments.
          </p>
          <div className="flex items-center justify-center gap-2 pt-4">
            <Activity className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">HealthPredict Platform</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
