"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Phone, MapPin, Clock } from "lucide-react"

interface Doctor {
  id: number
  name: string
  specialty: string
  rating: number
  distance: string
  lat: number
  lng: number
  phone: string
  address: string
  availability?: string
  experience?: string
}

interface DoctorCardProps {
  doctor: Doctor
  onSelect?: (doctor: Doctor) => void
}

export function DoctorCard({ doctor, onSelect }: DoctorCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{doctor.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
          </div>
          <Badge variant="secondary" className="ml-2">
            <Star className="h-3 w-3 mr-1 fill-current" />
            {doctor.rating}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{doctor.address}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          <span>{doctor.distance}</span>
        </div>
        {doctor.availability && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>{doctor.availability}</span>
          </div>
        )}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button size="sm" className="flex-1" onClick={() => onSelect?.(doctor)}>
            Book Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
