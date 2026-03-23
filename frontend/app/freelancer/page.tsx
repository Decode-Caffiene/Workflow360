"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Star, DollarSign, Clock, FolderKanban } from "lucide-react"

interface Project {
  id: number
  name: string
  client: string
  deadline: string
  status: "In Progress" | "Pending" | "Completed"
  hoursLogged: number
  budget: number
}

interface Invoice {
  id: number
  invoiceNumber: string
  client: string
  amount: number
  status: "Paid" | "Pending" | "Overdue"
  date: string
}

export default function FreelancerDashboard() {
  const [isTracking, setIsTracking] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)

  // TODO: Load from API - GET /api/freelancer/profile
  const skills: string[] = []
  const hourlyRate = 0
  const rating = 0

  // TODO: Load from API - GET /api/freelancer/projects
  const projects: Project[] = []

  // TODO: Load from API - GET /api/freelancer/invoices
  const invoices: Invoice[] = []

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTracking])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "In Progress":
        return "bg-primary text-primary-foreground"
      case "Completed":
        return "bg-success text-success-foreground"
      default:
        return "bg-warning text-warning-foreground"
    }
  }

  const getInvoiceStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "Paid":
        return "bg-success text-success-foreground"
      case "Overdue":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-warning text-warning-foreground"
    }
  }

  const totalEarnings = invoices.filter(i => i.status === "Paid").reduce((acc, i) => acc + i.amount, 0)
  const pendingEarnings = invoices.filter(i => i.status === "Pending").reduce((acc, i) => acc + i.amount, 0)

  return (
    <div className="space-y-8">
      {/* Profile Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">AR</span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-2">Alex Rivera</h1>
              <div className="flex flex-wrap gap-2 mb-3">
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-success" />
                  <span className="font-medium text-foreground">${hourlyRate}/hr</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="font-medium text-foreground">{rating} Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <FolderKanban className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{projects.filter(p => p.status === "In Progress").length} Active Projects</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Earnings (2026)</p>
              <p className="text-3xl font-bold text-success">${totalEarnings.toLocaleString()}</p>
              <p className="text-sm text-warning">${pendingEarnings.toLocaleString()} pending</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Time Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground mb-2">Current Session</p>
              <p className="text-5xl font-mono font-bold text-foreground">{formatTime(elapsedTime)}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                onClick={() => setIsTracking(!isTracking)}
                className={isTracking ? "bg-destructive hover:bg-destructive/90" : ""}
              >
                {isTracking ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start
                  </>
                )}
              </Button>
              {elapsedTime > 0 && !isTracking && (
                <Button variant="outline" onClick={() => setElapsedTime(0)}>
                  Reset
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assigned Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Assigned Projects</span>
            <Badge variant="secondary">{projects.length} projects</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-secondary/30 rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">{project.name}</h4>
                  <p className="text-sm text-muted-foreground">{project.client}</p>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-muted-foreground">Deadline</p>
                    <p className="font-medium text-foreground">{project.deadline}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Hours</p>
                    <p className="font-medium text-foreground">{project.hoursLogged}h</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Budget</p>
                    <p className="font-medium text-foreground">${project.budget.toLocaleString()}</p>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invoice Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Invoice Summary</span>
            <Button variant="outline" size="sm">
              Create Invoice
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Invoice #</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Client</th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-foreground">{invoice.invoiceNumber}</td>
                    <td className="py-4 px-4 text-sm text-foreground">{invoice.client}</td>
                    <td className="py-4 px-4 text-sm font-medium text-foreground text-right">
                      ${invoice.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground hidden sm:table-cell">{invoice.date}</td>
                    <td className="py-4 px-4 text-center">
                      <Badge className={getInvoiceStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
