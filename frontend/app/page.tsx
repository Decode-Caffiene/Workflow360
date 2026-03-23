"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // TODO: Integrate with backend authentication API
      // This will be replaced with actual API call to /api/auth/login
      // Expected response: { token, user, redirect_url }
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      
      if (response.ok) {
        const data = await response.json()
        // Store auth token and redirect based on user role
        localStorage.setItem('authToken', data.token)
        window.location.href = data.redirect_url || '/dashboard'
      } else {
        setShowError(true)
      }
    } catch (error) {
      setShowError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">W</span>
            </div>
            <span className="text-2xl font-semibold text-foreground">Workforce360</span>
          </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-foreground mb-2">Welcome back</h1>
                <p className="text-muted-foreground">Sign in to your account to continue</p>
              </div>

              {/* Error State */}
              {showError && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  <div>
                    <p className="text-sm font-medium text-destructive">Invalid credentials</p>
                    <p className="text-xs text-destructive/80">Please check your email and password</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setShowError(false)
                    }}
                    className="h-12 bg-background border-input"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-foreground">Password</Label>
                    <Link href="#" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setShowError(false)
                    }}
                    className="h-12 bg-background border-input"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                 
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Panel - Dark Background with Chart */}
      <div className="hidden lg:flex flex-1 bg-sidebar items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-sidebar-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-sidebar-primary rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 text-center">
          {/* Bar Chart Visualization */}
          <div className="mb-12 flex items-end justify-center gap-4 h-48">
            <div className="w-12 bg-sidebar-primary/60 rounded-t-lg animate-pulse" style={{ height: "40%" }} />
            <div className="w-12 bg-sidebar-primary/70 rounded-t-lg animate-pulse" style={{ height: "65%", animationDelay: "0.1s" }} />
            <div className="w-12 bg-sidebar-primary rounded-t-lg animate-pulse" style={{ height: "85%", animationDelay: "0.2s" }} />
            <div className="w-12 bg-sidebar-primary/80 rounded-t-lg animate-pulse" style={{ height: "55%", animationDelay: "0.3s" }} />
            <div className="w-12 bg-sidebar-primary/90 rounded-t-lg animate-pulse" style={{ height: "75%", animationDelay: "0.4s" }} />
            <div className="w-12 bg-sidebar-primary rounded-t-lg animate-pulse" style={{ height: "95%", animationDelay: "0.5s" }} />
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <BarChart3 className="w-8 h-8 text-sidebar-primary" />
          </div>

          <h2 className="text-4xl font-bold text-sidebar-foreground mb-4 text-balance">
            People. Processes. Performance.
          </h2>
          <p className="text-sidebar-foreground/70 text-lg max-w-md">
            Manage your hybrid workforce with ease. Track time, approve leaves, and boost productivity.
          </p>
        </div>
      </div>
    </div>
  )
}
