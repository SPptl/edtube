"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { NavigationSidebar } from "@/components/navigation-sidebar"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import { ArrowLeft, History, Search, Play, Clock, Calendar, Filter, BookOpen, RotateCcw } from "lucide-react"
import { useRouter } from "next/navigation"

const watchHistory = [
  {
    id: 1,
    title: "React Hooks - useEffect Deep Dive",
    creator: "Code with Harry",
    thumbnail: "/react-tutorial-coding.png",
    duration: "25:30",
    watchedDuration: "25:30",
    progress: 100,
    watchedAt: "2 hours ago",
    subject: "Programming",
    playlist: "Complete React.js Course",
    resumeAt: null,
  },
  {
    id: 2,
    title: "Physics - Newton's Second Law",
    creator: "Physics Wallah",
    thumbnail: "/physics-kinematics-education.jpg",
    duration: "18:45",
    watchedDuration: "12:30",
    progress: 67,
    watchedAt: "5 hours ago",
    subject: "Physics",
    playlist: "Physics - Mechanics & Kinematics",
    resumeAt: "12:30",
  },
  {
    id: 3,
    title: "Binary Search Trees - Implementation",
    creator: "Apni Kaksha",
    thumbnail: "/data-structures-algorithms.png",
    duration: "32:15",
    watchedDuration: "8:20",
    progress: 26,
    watchedAt: "1 day ago",
    subject: "Programming",
    playlist: "Data Structures & Algorithms",
    resumeAt: "8:20",
  },
  {
    id: 4,
    title: "Integration by Parts - Advanced",
    creator: "Khan Academy",
    thumbnail: "/calculus-integration-math.jpg",
    duration: "22:10",
    watchedDuration: "22:10",
    progress: 100,
    watchedAt: "2 days ago",
    subject: "Mathematics",
    playlist: "Calculus - Integration Mastery",
    resumeAt: null,
  },
  {
    id: 5,
    title: "JavaScript ES6 - Arrow Functions",
    creator: "Traversy Media",
    thumbnail: "/javascript-es6-programming.jpg",
    duration: "15:45",
    watchedDuration: "15:45",
    progress: 100,
    watchedAt: "3 days ago",
    subject: "Programming",
    playlist: "Modern JavaScript Course",
    resumeAt: null,
  },
  {
    id: 6,
    title: "Organic Chemistry - Nomenclature",
    creator: "Unacademy",
    thumbnail: "/organic-chemistry-education.jpg",
    duration: "28:30",
    watchedDuration: "14:15",
    progress: 50,
    watchedAt: "4 days ago",
    subject: "Chemistry",
    playlist: "Organic Chemistry Basics",
    resumeAt: "14:15",
  },
]

const subjects = ["All", "Programming", "Physics", "Mathematics", "Chemistry"]
const timeFilters = ["All Time", "Today", "This Week", "This Month"]

export default function HistoryPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("All")
  const [selectedTime, setSelectedTime] = useState("All Time")

  const filteredHistory = watchHistory.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.playlist.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = selectedSubject === "All" || video.subject === selectedSubject
    // For simplicity, we'll show all videos regardless of time filter in this demo
    return matchesSearch && matchesSubject
  })

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  const formatDuration = (duration: string) => {
    return duration
  }

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
            <History className="h-8 w-8 text-[#ff0000]" />
            <h1 className="text-3xl font-bold text-white">Watch History</h1>
          </div>
          <p className="text-[#aaaaaa] text-lg">Continue where you left off and revisit your learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-[#272727] border-[#404040]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#ff0000]/20">
                  <BookOpen className="h-5 w-5 text-[#ff0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{watchHistory.length}</p>
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
                  <p className="text-2xl font-bold text-white">8.2h</p>
                  <p className="text-sm text-[#aaaaaa]">Total Watch Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#272727] border-[#404040]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#ff0000]/20">
                  <RotateCcw className="h-5 w-5 text-[#ff0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">3</p>
                  <p className="text-sm text-[#aaaaaa]">To Resume</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#272727] border-[#404040]">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#ff0000]/20">
                  <Calendar className="h-5 w-5 text-[#ff0000]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">7</p>
                  <p className="text-sm text-[#aaaaaa]">Days Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#aaaaaa]" />
            <Input
              placeholder="Search your watch history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-[#121212] border-[#404040] text-white placeholder:text-[#aaaaaa] focus:border-[#ff0000]"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#aaaaaa]" />
              <span className="text-sm font-medium text-white">Filters:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <Button
                  key={subject}
                  variant={selectedSubject === subject ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSubject(subject)}
                  className={
                    selectedSubject === subject
                      ? "bg-[#ff0000] hover:bg-[#cc0000] text-white border-[#ff0000]"
                      : "bg-transparent border-[#404040] text-[#aaaaaa] hover:bg-[#272727] hover:text-white"
                  }
                >
                  {subject}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {timeFilters.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                  className={
                    selectedTime === time
                      ? "bg-[#ff0000] hover:bg-[#cc0000] text-white border-[#ff0000]"
                      : "bg-transparent border-[#404040] text-[#aaaaaa] hover:bg-[#272727] hover:text-white"
                  }
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.map((video) => (
            <Card
              key={video.id}
              className="group hover:shadow-md transition-all duration-200 bg-[#272727] border-[#404040] hover:bg-[#2a2a2a]"
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-32 h-20 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-lg group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 rounded">
                      {video.duration}
                    </div>
                    {video.resumeAt && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="text-xs bg-[#ff0000] text-white border-[#ff0000]">
                          Resume
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-lg line-clamp-2 group-hover:text-[#ff0000] transition-colors text-white">
                          {video.title}
                        </h3>
                        <p className="text-sm text-[#aaaaaa]">{video.creator}</p>
                        <p className="text-xs text-[#888888]">{video.playlist}</p>
                      </div>
                      <Button size="icon" variant="ghost" className="flex-shrink-0 text-white hover:bg-[#404040]">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-[#aaaaaa]">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {video.watchedAt}
                      </div>
                      <Badge variant="outline" className="border-[#404040] text-[#aaaaaa] bg-[#404040]/50">
                        {video.subject}
                      </Badge>
                      {video.resumeAt && <span className="text-[#ff0000] font-medium">Resume at {video.resumeAt}</span>}
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-[#aaaaaa]">
                        <span>
                          Watched: {video.watchedDuration} / {video.duration}
                        </span>
                        <span>{video.progress}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={video.progress} className="flex-1 h-1 bg-[#404040]" />
                        <div className={`w-2 h-2 rounded-full ${getProgressColor(video.progress)}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <History className="h-12 w-12 text-[#aaaaaa] mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2 text-white">No videos found</h3>
            <p className="text-[#aaaaaa]">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
