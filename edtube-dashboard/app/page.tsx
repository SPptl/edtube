"use client"

import { useState } from "react"
import { Home, Search, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NavigationSidebar } from "@/components/navigation-sidebar"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import { EdTubeLogo } from "@/components/edtube-logo"

export default function Dashboard() {
  const [currentView, setCurrentView] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("")

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const type = prompt("Search for 'playlists' or 'videos'?")
      if (type === "playlists" || type === "videos") {
        setSearchType(type)
        console.log(`Searching for ${type}: ${searchQuery}`)
      }
    }
  }

  const recommendedVideos = [
    {
      id: 1,
      title: "React Tutorial for Beginners",
      channel: "Code with Harry",
      thumbnail: "/react-tutorial-coding.png",
      duration: "2:45:30",
    },
    {
      id: 2,
      title: "Physics - Kinematics",
      channel: "Physics Wallah",
      thumbnail: "/physics-kinematics-education.jpg",
      duration: "1:20:15",
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      channel: "Apni Kaksha",
      thumbnail: "/data-structures-algorithms.png",
      duration: "3:15:45",
    },
    {
      id: 7,
      title: "Python Programming Complete Course",
      channel: "CodeWithHarry",
      thumbnail: "/python-programming-tutorial.png",
      duration: "4:30:20",
    },
  ]

  const previouslyWatched = [
    {
      id: 4,
      title: "Organic Chemistry Basics",
      channel: "Unacademy",
      thumbnail: "/organic-chemistry-education.jpg",
      duration: "1:45:20",
      progress: 75,
    },
    {
      id: 5,
      title: "JavaScript ES6 Features",
      channel: "Coding Ninjas",
      thumbnail: "/javascript-es6-programming.jpg",
      duration: "2:10:30",
      progress: 45,
    },
    {
      id: 6,
      title: "Calculus - Integration",
      channel: "Khan Academy",
      thumbnail: "/calculus-integration-math.jpg",
      duration: "1:30:15",
      progress: 90,
    },
    {
      id: 8,
      title: "Machine Learning Fundamentals",
      channel: "3Blue1Brown",
      thumbnail: "/machine-learning-neural-networks.jpg",
      duration: "2:25:45",
      progress: 30,
    },
  ]

  const subjectProgress = [
    { subject: "Mathematics", progress: 85, color: "bg-blue-500" },
    { subject: "Physics", progress: 72, color: "bg-green-500" },
    { subject: "Chemistry", progress: 68, color: "bg-purple-500" },
    { subject: "Computer Science", progress: 91, color: "bg-orange-500" },
  ]

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <header className="bg-[#0f0f0f] border-b border-[#272727] px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4 flex-shrink-0">
            <NavigationSidebar className="text-white hover:bg-[#272727]" />

            <div className="flex items-center space-x-2">
              <EdTubeLogo />
              <div className="h-6 w-px bg-[#272727]"></div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView("home")}
              className="p-2 hover:bg-[#272727] text-white rounded-lg transition-colors duration-200"
            >
              <Home className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 flex justify-center px-4 min-w-0">
            <div className="flex items-center bg-[#121212] border border-[#272727] rounded-full overflow-hidden w-full max-w-3xl hover:border-[#3f3f3f] transition-colors">
              <Input
                placeholder="Search topics, playlists, or videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-0 text-white placeholder-[#aaa] focus:ring-0 focus:outline-none rounded-l-full px-6 py-3"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button
                onClick={handleSearch}
                size="sm"
                className="bg-[#272727] hover:bg-[#3f3f3f] border-l border-[#272727] rounded-none rounded-r-full px-6 py-3 flex-shrink-0 transition-colors duration-200"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentView("progress")}
              className="p-2 hover:bg-[#272727] text-white rounded-lg transition-colors duration-200"
            >
              <TrendingUp className="h-5 w-5" />
            </Button>

            <UserProfileDropdown />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6 ml-64">
        {currentView === "home" && (
          <div className="space-y-8">
            {/* Recommended Videos */}
            <section>
              <h2 className="text-xl font-medium text-white mb-6 tracking-tight">Recommended</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {recommendedVideos.map((video) => (
                  <div key={video.id} className="cursor-pointer group">
                    <div className="relative mb-3">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full aspect-video object-cover rounded-xl bg-[#272727] group-hover:rounded-lg transition-all duration-200"
                      />
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-90 text-white px-2 py-1 rounded text-xs font-medium">
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <div className="w-9 h-9 bg-[#ff0000] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {video.channel.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white text-sm line-clamp-2 group-hover:text-[#aaa] mb-1 transition-colors duration-200">
                          {video.title}
                        </h3>
                        <p className="text-[#aaa] text-xs hover:text-white transition-colors duration-200 cursor-pointer">
                          {video.channel}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Previously Watched */}
            <section>
              <h2 className="text-xl font-medium text-white mb-6 tracking-tight">Continue watching</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {previouslyWatched.map((video) => (
                  <div key={video.id} className="cursor-pointer group">
                    <div className="relative mb-3">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full aspect-video object-cover rounded-xl bg-[#272727] group-hover:rounded-lg transition-all duration-200"
                      />
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-90 text-white px-2 py-1 rounded text-xs font-medium">
                        {video.duration}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ffffff1a] rounded-b-xl">
                        <div
                          className="h-full bg-[#ff0000] rounded-b-xl transition-all duration-300"
                          style={{ width: `${video.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <div className="w-9 h-9 bg-[#ff0000] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {video.channel.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white text-sm line-clamp-2 group-hover:text-[#aaa] mb-1 transition-colors duration-200">
                          {video.title}
                        </h3>
                        <p className="text-[#aaa] text-xs hover:text-white transition-colors duration-200 cursor-pointer mb-1">
                          {video.channel}
                        </p>
                        <p className="text-[#aaa] text-xs">{video.progress}% complete</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {currentView === "progress" && (
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-white tracking-tight">Your learning progress</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjectProgress.map((subject, index) => (
                <div
                  key={index}
                  className="bg-[#272727] rounded-xl p-6 hover:bg-[#3f3f3f] transition-colors duration-200 border border-[#3f3f3f] hover:border-[#555]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-white">{subject.subject}</h3>
                    <span className="text-[#aaa] text-sm font-medium">{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-[#3f3f3f] rounded-full h-2">
                    <div
                      className="bg-[#ff0000] h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
