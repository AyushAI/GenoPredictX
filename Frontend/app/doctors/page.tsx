"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Map } from "@/components/map"
import { Phone, MapPin } from "lucide-react"

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
}

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Rajesh Sharma",
    specialty: "Cardiologist",
    rating: 4.8,
    distance: "1.2 km away",
    lat: 21.1458,
    lng: 79.0882,
    phone: "+91 9876543210",
    address: "Civil Lines, Nagpur",
  },
  {
    id: 2,
    name: "Dr. Priya Patel",
    specialty: "General Physician",
    rating: 4.6,
    distance: "2.1 km away",
    lat: 21.1558,
    lng: 79.0982,
    phone: "+91 9876543211",
    address: "Sitabuldi, Nagpur",
  },
  {
    id: 3,
    name: "Dr. Amit Kumar",
    specialty: "Neurologist",
    rating: 4.9,
    distance: "1.8 km away",
    lat: 21.1358,
    lng: 79.0782,
    phone: "+91 9876543212",
    address: "Dharampeth, Nagpur",
  },
  {
    id: 4,
    name: "Dr. Sunita Joshi",
    specialty: "Dermatologist",
    rating: 4.7,
    distance: "3.2 km away",
    lat: 21.1658,
    lng: 79.1082,
    phone: "+91 9876543213",
    address: "Ramdaspeth, Nagpur",
  },
  {
    id: 5,
    name: "Dr. Vikram Singh",
    specialty: "Orthopedic",
    rating: 4.5,
    distance: "2.8 km away",
    lat: 21.1258,
    lng: 79.0682,
    phone: "+91 9876543214",
    address: "Mahal, Nagpur",
  },
  {
    id: 6,
    name: "Dr. Kavita Desai",
    specialty: "Pediatrician",
    rating: 4.8,
    distance: "1.5 km away",
    lat: 21.1508,
    lng: 79.0932,
    phone: "+91 9876543215",
    address: "Sadar, Nagpur",
  },
]

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [specialtyFilter, setSpecialtyFilter] = useState("all")

  const filteredDoctors = doctors.filter((doctor) => {
    return specialtyFilter === "all" || doctor.specialty === specialtyFilter
  })

  const specialties = Array.from(new Set(doctors.map((d) => d.specialty)))

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
  }

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Consult a Doctor</h1>
        <p className="text-lg text-muted-foreground text-pretty">Find and call qualified doctors near you in Nagpur</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Filter by Specialty
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="All Specialties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Doctors Near You</h2>
          <Map doctors={filteredDoctors} onDoctorSelect={handleDoctorSelect} />
        </div>

        <div className="lg:col-span-1">
          {selectedDoctor ? (
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>{selectedDoctor.name}</CardTitle>
                <CardDescription>{selectedDoctor.specialty}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <strong>Address:</strong> {selectedDoctor.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Distance:</strong> {selectedDoctor.distance}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Rating:</strong> ⭐ {selectedDoctor.rating}/5
                  </p>
                </div>
                <Button onClick={() => handleCall(selectedDoctor.phone)} className="w-full" size="lg">
                  <Phone className="mr-2 h-4 w-4" />
                  Call {selectedDoctor.phone}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Select a Doctor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Click on a doctor marker on the map to view details and call them directly.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
