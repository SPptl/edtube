"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, BookOpen, User, Settings, Trophy, Clock, Eye } from "lucide-react"
import Link from "next/link"

export default function AccountPage() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2024",
    totalWatchTime: "45 hours",
    coursesCompleted: 12,
    currentStreak: 7,
  })

  const achievements = [
    { name: "First Course", description: "Completed your first course", earned: true },
    { name: "Week Streak", description: "7 days of continuous learning", earned: true },
    { name: "Math Master", description: "Completed 5 math courses", earned: false },
    { name: "Code Warrior", description: "Completed 10 programming courses", earned: false },
  ]

  const recentActivity = [
    { course: "React Fundamentals", progress: 85, lastWatched: "2 hours ago" },
    { course: "Calculus Basics", progress: 60, lastWatched: "1 day ago" },
    { course: "Physics Mechanics", progress: 30, lastWatched: "3 days ago" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-balance">My Account</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback className="text-lg">
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold mb-1 text-balance">{profileData.name}</h2>
                <p className="text-muted-foreground text-sm mb-4">{profileData.email}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Joined:</span>
                    <span>{profileData.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Watch Time:</span>
                    <span>{profileData.totalWatchTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed:</span>
                    <span>{profileData.coursesCompleted} courses</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Streak:</span>
                    <Badge variant="secondary">{profileData.currentStreak} days</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="achievements" className="gap-2">
                  <Trophy className="h-4 w-4" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="activity" className="gap-2">
                  <Clock className="h-4 w-4" />
                  Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Profile Settings
                    </CardTitle>
                    <CardDescription>Update your personal information and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5" />
                      Achievements
                    </CardTitle>
                    <CardDescription>Your learning milestones and accomplishments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${
                            achievement.earned ? "bg-primary/5 border-primary/20" : "bg-muted/50 border-muted"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-full ${
                                achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <Trophy className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium text-balance">{achievement.name}</h3>
                              <p className="text-sm text-muted-foreground text-balance">{achievement.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>Your recent learning progress and activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-primary/10">
                              <Eye className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium text-balance">{activity.course}</h3>
                              <p className="text-sm text-muted-foreground">Last watched: {activity.lastWatched}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium mb-1">{activity.progress}%</div>
                            <Progress value={activity.progress} className="w-20 h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
