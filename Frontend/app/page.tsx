"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Activity, Brain, Stethoscope, Phone } from "lucide-react"
import Link from "next/link"
import { TypewriterText } from "@/components/typewriter-text"
import { MiniChat } from "@/components/mini-chat"

interface FormData {
  age: string
  gender: string
  height: string
  weight: string
  bloodPressure: string
  heartRate: string
  temperature: string
  symptoms: string
  medicalHistory: string
  medications: string
  lifestyle: string
  familyHistory: string
}

const diseaseExplanations = [
  "Hypertension is a condition where blood pressure is consistently elevated. It's often called the 'silent killer' because it typically has no symptoms. Regular monitoring and lifestyle changes like reducing salt intake, exercising regularly, and managing stress can help control blood pressure levels.",
  "Seasonal allergies occur when your immune system overreacts to airborne substances like pollen. Common symptoms include sneezing, runny nose, and itchy eyes. Treatment options include antihistamines, nasal sprays, and avoiding known allergens when possible.",
  "Maintaining good health requires a balanced approach including regular exercise, proper nutrition, adequate sleep, and stress management. Continue your healthy habits and schedule regular check-ups with your healthcare provider.",
  "Stress-related fatigue is your body's response to prolonged physical or mental stress. It can affect sleep quality, energy levels, and overall well-being. Consider relaxation techniques, regular exercise, and ensuring adequate rest to manage stress effectively.",
  "Cardiovascular health is crucial for overall well-being. Regular exercise, a heart-healthy diet rich in fruits and vegetables, maintaining a healthy weight, and avoiding smoking can significantly improve heart health and reduce disease risk.",
]

export default function HomePage() {
  const [formData, setFormData] = useState<FormData>({
    age: "",
    gender: "",
    height: "",
    weight: "",
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    symptoms: "",
    medicalHistory: "",
    medications: "",
    lifestyle: "",
    familyHistory: "",
  })
  const [prediction, setPrediction] = useState<string>("")
  const [diseaseExplanation, setDiseaseExplanation] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePredict = async () => {
    setIsLoading(true)
    // Simulate AI prediction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const predictions = [
      "Based on your symptoms and vital signs, you may be experiencing mild hypertension. Consider lifestyle modifications and consult with a healthcare provider.",
      "Your symptoms suggest possible seasonal allergies. Monitor symptoms and consider antihistamines if they persist.",
      "The data indicates good overall health markers. Continue maintaining your current lifestyle habits.",
      "Your symptoms may indicate stress-related fatigue. Consider stress management techniques and adequate rest.",
      "Based on the information provided, you may benefit from a cardiovascular health assessment.",
    ]

    const randomIndex = Math.floor(Math.random() * predictions.length)
    setPrediction(predictions[randomIndex])
    setDiseaseExplanation(diseaseExplanations[randomIndex])
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">AI-Powered Health Prediction</h1>
        <p className="text-lg text-muted-foreground text-pretty">
          Enter your health information to get personalized insights and connect with nearby healthcare providers
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            Health Information Form
          </CardTitle>
          <CardDescription>Please provide accurate information for the best predictions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="Enter height in cm"
                value={formData.height}
                onChange={(e) => handleInputChange("height", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter weight in kg"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodPressure">Blood Pressure</Label>
              <Input
                id="bloodPressure"
                placeholder="e.g., 120/80"
                value={formData.bloodPressure}
                onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
              <Input
                id="heartRate"
                type="number"
                placeholder="Enter heart rate"
                value={formData.heartRate}
                onChange={(e) => handleInputChange("heartRate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                placeholder="Enter temperature"
                value={formData.temperature}
                onChange={(e) => handleInputChange("temperature", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lifestyle">Lifestyle</Label>
              <Select value={formData.lifestyle} onValueChange={(value) => handleInputChange("lifestyle", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select lifestyle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="moderate">Moderately Active</SelectItem>
                  <SelectItem value="active">Very Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="symptoms">Current Symptoms</Label>
              <Textarea
                id="symptoms"
                placeholder="Describe any current symptoms you're experiencing"
                value={formData.symptoms}
                onChange={(e) => handleInputChange("symptoms", e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Textarea
                id="medicalHistory"
                placeholder="List any previous medical conditions or surgeries"
                value={formData.medicalHistory}
                onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                placeholder="List any medications you're currently taking"
                value={formData.medications}
                onChange={(e) => handleInputChange("medications", e.target.value)}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="familyHistory">Family Medical History</Label>
              <Textarea
                id="familyHistory"
                placeholder="Describe any relevant family medical history"
                value={formData.familyHistory}
                onChange={(e) => handleInputChange("familyHistory", e.target.value)}
                rows={2}
              />
            </div>
          </div>

          <Button onClick={handlePredict} disabled={isLoading} className="w-full" size="lg">
            {isLoading ? (
              <>
                <Activity className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Get AI Prediction
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {prediction && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Health Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-foreground">{prediction}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">AI Generated</Badge>
                <Badge variant="outline">Consult a Doctor</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {diseaseExplanation && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Understanding Your Condition</CardTitle>
          </CardHeader>
          <CardContent>
            <TypewriterText text={diseaseExplanation} speed={30} className="text-foreground leading-relaxed" />
          </CardContent>
        </Card>
      )}

      {prediction && (
        <div className="mb-8">
          <MiniChat diseaseInfo={prediction} />
        </div>
      )}

      {prediction && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Professional Consultation
            </CardTitle>
            <CardDescription>Connect with qualified doctors for professional medical advice</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/doctors">
              <Button className="w-full" size="lg">
                <Phone className="mr-2 h-4 w-4" />
                Consult a Doctor
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
