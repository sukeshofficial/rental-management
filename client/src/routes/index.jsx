import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "@/pages/LoginPage"
import SignupPage from "@/pages/SignupPage"

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
                path="/dashboard"
                element={
                    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4">
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="mt-2 text-neutral-400">Welcome to your dashboard.</p>
                    </div>
                }
            />
            {/* Redirect everything else to login until more pages are built */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}
