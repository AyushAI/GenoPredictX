"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { AlertCircle, UserPlus, CheckCircle } from "lucide-react"

export default function SignupPage() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccess(false)

        // Validate passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters")
            return
        }

        setIsLoading(true)

        try {
        // Log the entered values to console
            console.log("[SIGNUP] User registered with:")
            console.log("Name:", name)
            console.log("Password:", password)
            console.log("Timestamp:", new Date().toISOString())

            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || "Signup failed")
                setIsLoading(false)
                return
            }

            setSuccess(true)

            // Redirect to home after 2 seconds
            setTimeout(() => {
                router.push("/")
            }, 2000)
            } catch (err) {
            setError("An error occurred during signup")
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl flex items-center justify-center gap-2">
                        <UserPlus className="h-5 w-5" />
                        Sign Up
                    </CardTitle>
                    <CardDescription>Create a new account</CardDescription>
                </CardHeader>
                <CardContent>
                    {success ? (
                        <div className="space-y-4 text-center">
                        <div className="flex justify-center">
                            <CheckCircle className="h-12 w-12 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-2">Account Created Successfully!</h3>
                            <p className="text-sm text-muted-foreground">Redirecting you to the home page...</p>
                        </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
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
                            placeholder="Enter password (min. 6 characters)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                            {isLoading ? "Creating account..." : "Sign Up"}
                        </Button>
                        </form>
                    )}

                    {!success && (
                        <div className="mt-4 text-center text-sm">
                        <span className="text-muted-foreground">Already have an account? </span>
                        <Link href="/user-login" className="text-primary hover:underline">
                            Login here
                        </Link>
                        </div>
                    )}

                    {!success && (
                        <div className="mt-4 text-center">
                            <Link href="/" className="text-sm text-muted-foreground hover:underline">
                                Back to home
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
