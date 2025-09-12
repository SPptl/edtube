"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { NavigationSidebar } from "@/components/navigation-sidebar"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import { ArrowLeft, TrendingUp, Target, Clock, Award, BookOpen, Brain, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

const subjectProgress = [
  {
    subject: "React.js Development",
    progress: 75,
    totalVideos: 45,
    watchedVideos: 34,
    totalTime: "12h 30m",
    watchedTime: "9h 22m",
    quizzesTaken: 8,
    avgScore: 85,
    streak: 12,
    color: "bg-blue-500",
  },
  {
    subject: "Physics - Mechanics",
    progress: 60,
    totalVideos: 32,
    watchedVideos: 19,
    totalTime: "8h 45m",
    watchedTime: "5h 15m",
    quizzesTaken: 5,
    avgScore: 78,
    streak: 7,
    color: "bg-green-500",
  },
  {
    subject: "Data Structures",
    progress: 40,
    totalVideos: 28,
    watchedVideos: 11,
    totalTime: "15h 20m",
    watchedTime: "6h 8m",
    quizzesTaken: 3,
    avgScore: 72,
    streak: 4,
    color: "bg-purple-500",
  },
  {
    subject: "Calculus Integration",
    progress: 90,
    totalVideos: 24,
    watchedVideos: 22,
    totalTime: "6h 15m",
    watchedTime: "5h 38m",
    quizzesTaken: 6,
    avgScore: 91,
    streak: 15,
    color: "bg-orange-500",
  },
]

const recentActivity = [
  {
    type: "video",
    title: "React Hooks - useEffect Deep Dive",
    subject: "React.js Development",
    time: "2 hours ago",
    duration: "25 min",
  },
  {
    type: "quiz",
    title: "Physics Motion Quiz",
    subject: "Physics - Mechanics",
    time: "1 day ago",
    score: 85,
  },
  {
    type: "video",
    title: "Binary Trees Implementation",
    subject: "Data Structures",
    time: "2 days ago",
    duration: "35 min",
  },
  {
    type: "achievement",
    title: "Week Streak Master",
    subject: "General",
    time: "3 days ago",
    badge: "7-day streak",
  },
]

const achievements = [
  { title: "First Steps", description: "Completed your first video", earned: true },
  { title: "Quiz Master", description: "Scored 90+ on 5 quizzes", earned: true },
  { title: "Consistent Learner", description: "7-day learning streak", earned: true },
  { title: "Subject Expert", description: "Complete a full course", earned: false },
  { title: "Speed Learner", description: "Watch 10 hours in a week", earned: false },
  { title: "Perfect Score", description: "Get 100% on any quiz", earned: false },
]

export default function ProgressPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#272727] bg-[#0f0f0f]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0f0f0f]/60">
        <div className="flex h-14 items-center px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="h-9 w-9 text-white hover:bg-[#272727]"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <NavigationSidebar />
            <div className="h-6 w-px bg-[#272727] mx-2" />
            <h1 className="text-xl font-bold text-white">EdTube</h1>
          </div>

          <div className="flex-1" />

          <UserProfileDropdown />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-8 w-8 text-[#ff0000]" />
            <h1 className="text-3xl font-bold text-white">Learning Progress</h1>
          </div>
          <p className="text-[#aaaaaa] text-lg">Track your learning journey and celebrate your achievements</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-[#272727] border-[#404040]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#ff0000]/20">
                  <BookOpen className="h-5 w-5 text-[#ff0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">86</p>
                  <p className="text-sm text-[#aaaaaa]">Videos Watched</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#272727] border-[#404040]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#ff0000]/20">
                  <Clock className="h-5 w-5 text-[#ff0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">26h</p>
                  <p className="text-sm text-[#aaaaaa]">Total Watch Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#272727] border-[#404040]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#ff0000]/20">
                  <Brain className="h-5 w-5 text-[#ff0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">22</p>
                  <p className="text-sm text-[#aaaaaa]">Quizzes Taken</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#272727] border-[#404040]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#ff0000]/20">
                  <Target className="h-5 w-5 text-[#ff0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">15</p>
                  <p className="text-sm text-[#aaaaaa]">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subject Progress */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-[#272727] border-[#404040]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="h-5 w-5 text-[#ff0000]" />
                  Subject Progress
                </CardTitle>
                <CardDescription className="text-[#aaaaaa]">Your progress across different subjects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {subjectProgress.map((subject, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                        <h4 className="font-medium text-white">{subject.subject}</h4>
                      </div>
                      <Badge variant="outline" className="border-[#404040] text-white bg-[#404040]/50">
                        {subject.progress}%
                      </Badge>
                    </div>

                    <Progress value={subject.progress} className="h-2 bg-[#404040]" />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-[#aaaaaa]">
                      <div>
                        <span className="font-medium text-white">{subject.watchedVideos}</span>/{subject.totalVideos}{" "}
                        videos
                      </div>
                      <div>
                        <span className="font-medium text-white">{subject.watchedTime}</span>/{subject.totalTime}
                      </div>
                      <div>
                        <span className="font-medium text-white">{subject.quizzesTaken}</span> quizzes
                      </div>
                      <div>
                        <span className="font-medium text-white">{subject.avgScore}%</span> avg score
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-[#272727] border-[#404040]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Calendar className="h-5 w-5 text-[#ff0000]" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-[#aaaaaa]">Your latest learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg border border-[#404040] bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-[#ff0000]/20">
                        {activity.type === "video" && <BookOpen className="h-4 w-4 text-[#ff0000]" />}
                        {activity.type === "quiz" && <Brain className="h-4 w-4 text-[#ff0000]" />}
                        {activity.type === "achievement" && <Award className="h-4 w-4 text-[#ff0000]" />}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-white">{activity.title}</h5>
                        <p className="text-sm text-[#aaaaaa]">{activity.subject}</p>
                      </div>
                      <div className="text-right text-sm text-[#aaaaaa]">
                        <p>{activity.time}</p>
                        {activity.duration && <p>{activity.duration}</p>}
                        {activity.score && <p className="text-[#00ff00]">{activity.score}%</p>}
                        {activity.badge && (
                          <Badge variant="secondary" className="text-xs bg-[#404040] text-white">
                            {activity.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div className="space-y-6">
            <Card className="bg-[#272727] border-[#404040]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Award className="h-5 w-5 text-[#ff0000]" />
                  Achievements
                </CardTitle>
                <CardDescription className="text-[#aaaaaa]">Unlock badges as you learn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                        achievement.earned
                          ? "bg-[#00ff00]/10 border-[#00ff00]/30 hover:bg-[#00ff00]/20"
                          : "bg-[#1a1a1a] border-[#404040] hover:bg-[#2a2a2a]"
                      }`}
                    >
                      <div className={`p-2 rounded-full ${achievement.earned ? "bg-[#00ff00]/20" : "bg-[#404040]"}`}>
                        <Award className={`h-4 w-4 ${achievement.earned ? "text-[#00ff00]" : "text-[#888888]"}`} />
                      </div>
                      <div className="flex-1">
                        <h6 className={`font-medium ${achievement.earned ? "text-white" : "text-[#aaaaaa]"}`}>
                          {achievement.title}
                        </h6>
                        <p className={`text-xs ${achievement.earned ? "text-[#cccccc]" : "text-[#888888]"}`}>
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && (
                        <Badge className="bg-[#00ff00]/20 text-[#00ff00] border-[#00ff00]/30">Earned</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Goal */}
            <Card className="bg-[#272727] border-[#404040]">
              <CardHeader>
                <CardTitle className="text-lg text-white">Weekly Goal</CardTitle>
                <CardDescription className="text-[#aaaaaa]">Watch 5 hours this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#aaaaaa]">Progress</span>
                    <span className="text-white">3.2h / 5h</span>
                  </div>
                  <Progress value={64} className="h-3 bg-[#404040]" />
                  <p className="text-xs text-[#aaaaaa]">You're 64% towards your weekly goal! Keep it up!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
