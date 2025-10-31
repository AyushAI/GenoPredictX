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

function saveAuthData(data: AuthCredentials): void {
    try {
        fs.writeFileSync(authFilePath, JSON.stringify(data, null, 2))
    } catch (err) {
        console.error("Error writing auth file:", err)
        throw err
    }
}

export async function POST(request: NextRequest) {
    try {
        const { name, password } = await request.json()

        if (!name || !password) {
        return NextResponse.json({ message: "Name and password are required" }, { status: 400 })
        }

        const authData = getAuthData()

        // Check if user already exists
        if (authData.users.some((u) => u.name === name)) {
        return NextResponse.json({ message: "User already exists" }, { status: 409 })
        }

        // Add new user
        authData.users.push({ name, password })
        saveAuthData(authData)

        console.log(`[SIGNUP API] New user registered: ${name}`)

        return NextResponse.json({ message: "User created successfully" }, { status: 201 })
    } catch (err) {
        console.error("Error during signup:", err)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}