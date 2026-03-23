"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Edit2, Megaphone } from "lucide-react"

export default function EmployeeDashboard() {
  const [isClockedIn, setIsClockedIn] = useState(false)
  const [clockInTime, setClockInTime] = useState<string | null>(null)
  const [todayHours, setTodayHours] = useState(0)

  const handleClockIn = () => {
    const now = new Date()
    setClockInTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }))
    setIsClockedIn(true)
  }

  const handleClockOut = () => {
    setIsClockedIn(false)
    setTodayHours(8.5)
    setClockInTime(null)
  }

  // TODO: Load from API - GET /api/employee/leave-balances
  // TODO: Load from API - GET /api/employee/timesheet/week
  // TODO: Load from API - GET /api/employee/leave-requests
  // TODO: Load from API - GET /api/announcements

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">JD</span>
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                <h1 className="text-2xl font-bold text-foreground">John Doe</h1>
                <Badge variant="secondary" className="w-fit">EMP-2024-001</Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>Software Engineer</span>
                <span className="hidden sm:inline">|</span>
                <span>Engineering Department</span>
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Clock In/Out Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Status</p>
                {isClockedIn ? (
                  <p className="text-lg font-semibold text-success">
                    CLOCKED IN since {clockInTime}
                  </p>
                ) : (
                  <p className="text-lg font-semibold text-muted-foreground">CLOCKED OUT</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {!isClockedIn ? (
                <Button onClick={handleClockIn} className="px-8">
                  Clock In
                </Button>
              ) : (
                <Button onClick={handleClockOut} variant="destructive" className="px-8">
                  Clock Out
                </Button>
              )}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-xl font-bold text-foreground">{todayHours}h</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leave Days & Timesheet Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Leave Days */}
        <Card>
          <CardHeader>
            <CardTitle>Available Leave Days</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {leaveBalances.map((leave) => (
              <div key={leave.type} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{leave.type}</span>
                  <span className="text-muted-foreground">
                    {leave.total - leave.used} / {leave.total} days
                  </span>
                </div>
                <Progress 
                  value={((leave.total - leave.used) / leave.total) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Timesheet Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Timesheet Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Day</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {timesheetData.map((row) => (
                    <tr key={row.day} className="border-b border-border">
                      <td className="py-3 px-2 text-sm text-foreground">{row.day}</td>
                      <td className="py-3 px-2 text-sm text-foreground text-right">{row.hours}h</td>
                    </tr>
                  ))}
                  <tr className="bg-secondary/50">
                    <td className="py-3 px-2 text-sm font-semibold text-foreground">Total</td>
                    <td className="py-3 px-2 text-sm font-semibold text-foreground text-right">
                      {timesheetData.reduce((acc, row) => acc + row.hours, 0)}h
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Leave Requests & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Leave Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Period</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingLeaves.map((leave) => (
                    <tr key={leave.id} className="border-b border-border">
                      <td className="py-3 px-2 text-sm text-foreground">{leave.type}</td>
                      <td className="py-3 px-2 text-sm text-foreground">
                        {leave.startDate} - {leave.endDate}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <Badge 
                          variant={leave.status === "Approved" ? "default" : "secondary"}
                          className={leave.status === "Approved" ? "bg-success text-success-foreground" : ""}
                        >
                          {leave.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="w-5 h-5" />
              Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{announcement.title}</h4>
                    <span className="text-xs text-muted-foreground">{announcement.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{announcement.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
