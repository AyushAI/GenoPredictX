"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

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

interface MapProps {
  doctors: Doctor[]
  onDoctorSelect: (doctor: Doctor) => void
}

export function Map({ doctors, onDoctorSelect }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return

    const initMap = async () => {
      // Dynamically import Leaflet to avoid SSR issues
      const L = (await import("leaflet")).default

      // Fix for default markers in Leaflet
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      })

      // Initialize map centered on Nagpur
      const map = L.map(mapRef.current).setView([21.1458, 79.0882], 12)

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      // Add markers for doctors
      doctors.forEach((doctor) => {
        const marker = L.marker([doctor.lat, doctor.lng]).addTo(map)
        marker.bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold">${doctor.name}</h3>
            <p class="text-sm text-gray-600">${doctor.specialty}</p>
            <p class="text-sm">Rating: ${doctor.rating}/5</p>
            <p class="text-sm">${doctor.distance}</p>
          </div>
        `)

        marker.on("click", () => {
          onDoctorSelect(doctor)
        })
      })

      mapInstanceRef.current = map
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
      }
    }
  }, [doctors, onDoctorSelect])

  return (
    <Card className="overflow-hidden">
      <div ref={mapRef} className="h-96 w-full" style={{ minHeight: "400px" }} />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
    </Card>
  )
}
