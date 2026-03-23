"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, FolderKanban, CalendarCheck, Sparkles, Star, TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

interface Freelancer {
  id: number
  name: string
  skills: string[]
  matchScore: number
  hourlyRate: number
  rating: number
}

export default function ManagerDashboard() {
  const [projectRequirements, setProjectRequirements] = useState("")
  const [matchedFreelancers, setMatchedFreelancers] = useState<Freelancer[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // TODO: Load from API - GET /api/team/members
  // TODO: Load from API - GET /api/projects
  // TODO: Load from API - GET /api/leaves/pending
  // TODO: Load from API - GET /api/analytics/performance
  
  const teamMembers: any[] = []
  const activeProjects: any[] = []
  const pendingLeaves: any[] = []
  const performanceData: any[] = []

  const handleFindFreelancers = async () => {
    setIsSearching(true)
    try {
      // TODO: Replace with actual backend API call
      // Expected endpoint: POST /api/freelancers/search
      // Body: { requirements: projectRequirements }
      // Response: { freelancers: Freelancer[] }
      
      const response = await fetch('/api/freelancers/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requirements: projectRequirements }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setMatchedFreelancers(data.freelancers)
      }
    } catch (error) {
      console.error('Error fetching freelancers:', error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back, Sarah</h1>
        <p className="text-muted-foreground">Engineering Manager | Team Lead</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Team Members</p>
                <p className="text-2xl font-bold text-foreground">{teamMembers.length}</p>
                <p className="text-xs text-success">{teamMembers.filter(m => m.status === "Active").length} active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-chart-2/10 rounded-full flex items-center justify-center">
                <FolderKanban className="w-6 h-6 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold text-foreground">{activeProjects.length}</p>
                <p className="text-xs text-muted-foreground">2 due this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                <CalendarCheck className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Leave Approvals</p>
                <p className="text-2xl font-bold text-foreground">{pendingLeaves.length}</p>
                <p className="text-xs text-warning">Requires attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Skill Matching Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Skill Matching
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Enter project requirements (e.g., React, Node.js, AWS)"
                value={projectRequirements}
                onChange={(e) => setProjectRequirements(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleFindFreelancers} 
                disabled={!projectRequirements || isSearching}
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {isSearching ? "Searching..." : "Find Best Freelancer"}
              </Button>
            </div>

            {matchedFreelancers.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Ranked Freelancers</h4>
                <div className="space-y-3">
                  {matchedFreelancers.map((freelancer, index) => (
                    <div 
                      key={freelancer.id} 
                      className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{freelancer.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {freelancer.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="text-muted-foreground">Match</p>
                          <p className="font-bold text-success">{freelancer.matchScore}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">Rate</p>
                          <p className="font-medium text-foreground">${freelancer.hourlyRate}/hr</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-warning text-warning" />
                          <span className="font-medium text-foreground">{freelancer.rating}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Team Performance Graph */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Team Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="tasks" name="Tasks Completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="hours" name="Hours Logged" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Team Overview & Pending Leaves */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Team Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <Badge 
                    className={member.status === "Active" ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"}
                  >
                    {member.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Leave Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingLeaves.map((leave) => (
                <div key={leave.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-foreground">{leave.employee}</p>
                      <p className="text-sm text-muted-foreground">
                        {leave.type} Leave | {leave.dates} ({leave.days} day{leave.days > 1 ? "s" : ""})
                      </p>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-success hover:bg-success/90 text-success-foreground">
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-destructive border-destructive hover:bg-destructive/10">
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
