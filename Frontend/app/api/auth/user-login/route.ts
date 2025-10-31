import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const authFilePath = path.join(process.cwd(), "auth-credentials.json")

interface AuthCredentials {
  users: Array<{ name: string; password: string }>
  admins: Array<{ name: string; password: string }>
}

function getAuthData(): AuthCredentials {
    try {
        if (fs.existsSync(authFilePath)) {
            const data = fs.readFileSync(authFilePath, "utf-8")
            return JSON.parse(data)
        }
    } catch (err) {
        console.error("Error reading auth file:", err)
    }
    return { users: [], admins: [] }
}

export async function POST(request: NextRequest) {
    try {
        const { name, password } = await request.json()

        if (!name || !password) {
            return NextResponse.json({ message: "Name and password are required" }, { status: 400 })
        }

        const authData = getAuthData()
        const user = authData.users.find((u) => u.name === name && u.password === password)

        if (!user) {
            return NextResponse.json({ message: "Invalid name or password" }, { status: 401 })
        }

        // Generate a simple token
        const token = btoa(`${name}:${Date.now()}`)
        return NextResponse.json({ message: "User login successful", token }, { status: 200 })
    } catch (err) {
        console.error("Error during user login:", err)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}