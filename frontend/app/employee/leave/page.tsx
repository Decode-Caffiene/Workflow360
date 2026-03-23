"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarIcon, Send } from "lucide-react"

type LeaveStatus = "Pending" | "Approved" | "Rejected"

interface LeaveRequest {
  id: number
  type: string
  startDate: string
  endDate: string
  reason: string
  status: LeaveStatus
  submittedOn: string
}

export default function EmployeeLeavePage() {
  const [leaveType, setLeaveType] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [leaveHistory, setLeaveHistory] = useState<LeaveRequest[]>([])

  // TODO: Load from API - GET /api/employee/leave-requests

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Integrate with backend API - POST /api/employee/leave-requests
      // const response = await fetch('/api/employee/leave-requests', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ leaveType, startDate, endDate, reason }),
      // })

      const newLeave: LeaveRequest = {
        id: leaveHistory.length + 1,
        type: leaveType,
        startDate: new Date(startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        endDate: new Date(endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        reason,
        status: "Pending",
        submittedOn: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      }

      setLeaveHistory([newLeave, ...leaveHistory])
      setLeaveType("")
      setStartDate("")
      setEndDate("")
      setReason("")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusBadge = (status: LeaveStatus) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-success text-success-foreground">Approved</Badge>
      case "Rejected":
        return <Badge className="bg-destructive text-destructive-foreground">Rejected</Badge>
      default:
        return <Badge variant="secondary">Pending</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Apply for Leave</h1>
        <p className="text-muted-foreground">Submit a new leave request and view your leave history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leave Application Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              New Leave Request
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="leaveType">Leave Type</Label>
                <Select value={leaveType} onValueChange={setLeaveType} required>
                  <SelectTrigger id="leaveType">
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Annual">Annual Leave</SelectItem>
                    <SelectItem value="Sick">Sick Leave</SelectItem>
                    <SelectItem value="Compassionate">Compassionate Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="Enter reason for leave..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                <Send className="w-4 h-4" />
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Leave History Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Leave History</span>
              <Badge variant="secondary">{leaveHistory.length} requests</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Period</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Reason</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Submitted</th>
                    <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveHistory.map((leave) => (
                    <tr key={leave.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                      <td className="py-4 px-4">
                        <Badge variant="outline">{leave.type}</Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-foreground">
                        {leave.startDate === leave.endDate 
                          ? leave.startDate 
                          : `${leave.startDate} - ${leave.endDate}`}
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground hidden md:table-cell max-w-48 truncate">
                        {leave.reason}
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground hidden sm:table-cell">
                        {leave.submittedOn}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {getStatusBadge(leave.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
