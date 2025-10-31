"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { AlertCircle, Shield } from "lucide-react"

export default function AdminLoginPage() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
        const response = await fetch("/api/auth/admin-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password }),
        })

        const data = await response.json()

        if (!response.ok) {
            setError(data.message || "Admin login failed")
            setIsLoading(false)
            return
        }

        // Login successful
        sessionStorage.setItem("adminToken", data.token)
        router.push("/")
        } catch (err) {
        setError("An error occurred during login")
        setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl flex items-center justify-center gap-2">
                        <Shield className="h-5 w-5" />
                        Admin Login
                    </CardTitle>
                    <CardDescription>Sign in as administrator</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Admin Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter admin name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-md">
                                <AlertCircle className="h-4 w-4 text-destructive" />
                                <span className="text-sm text-destructive">{error}</span>
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading} size="lg">
                            {isLoading ? "Logging in..." : "Admin Login"}
                        </Button>
                    </form>

                    <div className="mt-4 text-center">
                        <Link href="/" className="text-sm text-muted-foreground hover:underline">
                            Back to home
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}