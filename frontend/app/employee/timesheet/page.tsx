"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DayData {
  date: number
  clockIn: string | null
  clockOut: string | null
  hours: number
}

export default function EmployeeTimesheetPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2)) // March 2026

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // TODO: Load from API - GET /api/employee/timesheet?month={monthYear}
  const timesheetData: Record<number, DayData> = {}

  // TODO: Load from API - GET /api/employee/timesheet/summary?month={monthYear}
  const weeklySummary: Array<{week: string; mon: number; tue: number; wed: number; thu: number; fri: number; total: number}> = []

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)

  const calendarDays: (DayData | null)[] = []
  
  // Add empty cells for days before the first of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    if (timesheetData[day]) {
      calendarDays.push(timesheetData[day])
    } else {
      calendarDays.push({ date: day, clockIn: null, clockOut: null, hours: 0 })
    }
  }

  const isWeekend = (index: number) => {
    const dayOfWeek = index % 7
    return dayOfWeek === 0 || dayOfWeek === 6
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Timesheet</h1>
        <p className="text-muted-foreground">View your clock in/out records and hours worked</p>
      </div>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Monthly Calendar</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-lg font-semibold min-w-40 text-center">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 mb-2">
            {weekdays.map((day) => (
              <div key={day} className="text-center py-2 text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`min-h-24 p-2 rounded-lg border border-border ${
                  day === null
                    ? "bg-transparent"
                    : isWeekend(index)
                    ? "bg-secondary/30"
                    : day.hours > 0
                    ? "bg-success/5 border-success/20"
                    : "bg-card"
                }`}
              >
                {day && (
                  <>
                    <div className="text-sm font-medium text-foreground mb-1">{day.date}</div>
                    {day.clockIn && (
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">
                          <span className="text-success">In:</span> {day.clockIn}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <span className="text-destructive">Out:</span> {day.clockOut}
                        </div>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {day.hours}h
                        </Badge>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Week</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">Mon</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">Tue</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">Wed</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">Thu</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">Fri</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground bg-secondary/50">Total</th>
                </tr>
              </thead>
              <tbody>
                {weeklySummary.map((week, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="py-4 px-4 text-sm font-medium text-foreground">{week.week}</td>
                    <td className="py-4 px-4 text-sm text-center text-foreground">{week.mon || "-"}h</td>
                    <td className="py-4 px-4 text-sm text-center text-foreground">{week.tue || "-"}h</td>
                    <td className="py-4 px-4 text-sm text-center text-foreground">{week.wed || "-"}h</td>
                    <td className="py-4 px-4 text-sm text-center text-foreground">{week.thu || "-"}h</td>
                    <td className="py-4 px-4 text-sm text-center text-foreground">{week.fri || "-"}h</td>
                    <td className="py-4 px-4 text-sm text-center font-bold text-foreground bg-secondary/50">
                      {week.total}h
                    </td>
                  </tr>
                ))}
                <tr className="bg-primary/5">
                  <td colSpan={6} className="py-4 px-4 text-sm font-bold text-foreground text-right">
                    Month Total:
                  </td>
                  <td className="py-4 px-4 text-sm text-center font-bold text-primary">
                    {weeklySummary.reduce((acc, week) => acc + week.total, 0)}h
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
