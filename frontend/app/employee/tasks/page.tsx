"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Priority = "HIGH" | "MEDIUM" | "LOW"
type Status = "To Do" | "In Progress" | "Completed"

interface Task {
  id: number
  name: string
  priority: Priority
  deadline: string
  status: Status
}

const priorityColors: Record<Priority, string> = {
  HIGH: "bg-destructive text-destructive-foreground",
  MEDIUM: "bg-warning text-warning-foreground",
  LOW: "bg-success text-success-foreground",
}

export default function EmployeeTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  // TODO: Load from API - GET /api/employee/tasks

  const handleStatusChange = (taskId: number, newStatus: Status) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const getStatusBadgeVariant = (status: Status) => {
    switch (status) {
      case "Completed":
        return "bg-success text-success-foreground"
      case "In Progress":
        return "bg-primary text-primary-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Tasks</h1>
        <p className="text-muted-foreground">Manage and track your assigned tasks</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Task List</span>
            <Badge variant="secondary">{tasks.length} tasks</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Task Name</th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">AI Priority</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Deadline</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-foreground">{task.name}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge className={priorityColors[task.priority]}>
                        {task.priority}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-foreground">{task.deadline}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Select
                        value={task.status}
                        onValueChange={(value: Status) => handleStatusChange(task.id, value)}
                      >
                        <SelectTrigger className="w-36">
                          <SelectValue>
                            <Badge className={getStatusBadgeVariant(task.status)}>
                              {task.status}
                            </Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="To Do">
                            <Badge className="bg-secondary text-secondary-foreground">To Do</Badge>
                          </SelectItem>
                          <SelectItem value="In Progress">
                            <Badge className="bg-primary text-primary-foreground">In Progress</Badge>
                          </SelectItem>
                          <SelectItem value="Completed">
                            <Badge className="bg-success text-success-foreground">Completed</Badge>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Task Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">To Do</p>
                <p className="text-2xl font-bold text-foreground">
                  {tasks.filter(t => t.status === "To Do").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-secondary-foreground">
                  {tasks.filter(t => t.status === "To Do").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-foreground">
                  {tasks.filter(t => t.status === "In Progress").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-primary">
                  {tasks.filter(t => t.status === "In Progress").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">
                  {tasks.filter(t => t.status === "Completed").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-success">
                  {tasks.filter(t => t.status === "Completed").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
