import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "@/pages/LoginPage"
import SignupPage from "@/pages/SignupPage"
import LoginPageV1 from "@/pages/authv1/LoginPage"
import SignupPageV1 from "@/pages/authv1/SignupPage"

export default function AppRoutes() {
    return (
        <Routes>
            {/* New Redesigned Auth Pages (authv1) */}
            <Route path="/auth/login" element={<LoginPageV1 />} />
            <Route path="/auth/signup" element={<SignupPageV1 />} />
            <Route path="/v1/login" element={<LoginPageV1 />} />
            <Route path="/v1/signup" element={<SignupPageV1 />} />

            {/* Existing Auth Routes */}
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
            {/* Redirect everything else to /auth/login */}
            <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
    )
}
