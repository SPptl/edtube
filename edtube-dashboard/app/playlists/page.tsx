"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NavigationSidebar } from "@/components/navigation-sidebar"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import { EdTubeLogo } from "@/components/edtube-logo"
import { ArrowLeft, Search, Play, BookOpen, Code, Calculator, Atom } from "lucide-react"
import { useRouter } from "next/navigation"

const playlists = [
  {
    id: 1,
    title: "Complete React.js Course",
    creator: "Code with Harry",
    thumbnail: "/react-tutorial-coding.png",
    videos: 45,
    duration: "12h 30m",
    level: "Beginner",
    category: "Programming",
    description: "Master React.js from basics to advanced concepts",
    enrolled: 15420,
    rating: 4.8,
    icon: Code,
  },
  {
    id: 2,
    title: "Physics - Mechanics & Kinematics",
    creator: "Physics Wallah",
    thumbnail: "/physics-kinematics-education.jpg",
    videos: 32,
    duration: "8h 45m",
    level: "Intermediate",
    category: "Physics",
    description: "Complete mechanics and kinematics for JEE/NEET",
    enrolled: 8930,
    rating: 4.9,
    icon: Atom,
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    creator: "Apni Kaksha",
    thumbnail: "/data-structures-algorithms.png",
    videos: 28,
    duration: "15h 20m",
    level: "Advanced",
    category: "Programming",
    description: "Master DSA for coding interviews",
    enrolled: 12340,
    rating: 4.7,
    icon: Code,
  },
  {
    id: 4,
    title: "Calculus - Integration Mastery",
    creator: "Khan Academy",
    thumbnail: "/calculus-integration-math.jpg",
    videos: 24,
    duration: "6h 15m",
    level: "Intermediate",
    category: "Mathematics",
    description: "Complete guide to integration techniques",
    enrolled: 6780,
    rating: 4.6,
    icon: Calculator,
  },
]

const categories = ["All", "Programming", "Physics", "Mathematics", "Chemistry", "Biology"]
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"]

export default function PlaylistsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")

  const filteredPlaylists = playlists.filter((playlist) => {
    const matchesSearch =
      playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playlist.creator.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || playlist.category === selectedCategory
    const matchesLevel = selectedLevel === "All Levels" || playlist.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <header className="bg-[#0f0f0f] border-b border-[#3f3f3f] px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="p-2 hover:bg-[#272727] text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <NavigationSidebar />
            <div className="flex items-center space-x-2">
              <EdTubeLogo />
              <div className="h-6 w-px bg-[#3f3f3f]"></div>
            </div>
          </div>

          <UserProfileDropdown />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-[#ff0000]" />
            <h1 className="text-2xl font-medium text-white">Playlists</h1>
          </div>
          <p className="text-[#aaa] text-base">Discover curated YouTube playlists from top educators</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center bg-[#121212] border border-[#3f3f3f] rounded-full overflow-hidden max-w-2xl">
            <Search className="ml-4 h-4 w-4 text-[#aaa]" />
            <Input
              placeholder="Search playlists"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-0 text-white placeholder-[#aaa] focus:ring-0"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-white text-black hover:bg-[#d9d9d9]"
                    : "bg-[#272727] text-white hover:bg-[#3f3f3f] border-[#3f3f3f]"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedLevel(level)}
                className={
                  selectedLevel === level
                    ? "bg-white text-black hover:bg-[#d9d9d9]"
                    : "bg-[#272727] text-white hover:bg-[#3f3f3f] border-[#3f3f3f]"
                }
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {/* Playlists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPlaylists.map((playlist) => {
            const IconComponent = playlist.icon
            return (
              <div key={playlist.id} className="cursor-pointer group">
                <div className="relative mb-3">
                  <img
                    src={playlist.thumbnail || "/placeholder.svg"}
                    alt={playlist.title}
                    className="w-full aspect-video object-cover rounded-xl bg-[#272727]"
                  />
                  <div className="absolute top-2 left-2 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-xs font-medium">
                    {playlist.videos} videos
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-xs font-medium">
                    {playlist.duration}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-xl flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-[#ff0000] rounded-full flex items-center justify-center">
                        <Play className="h-5 w-5 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="w-9 h-9 bg-[#ff0000] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {playlist.creator.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white text-sm line-clamp-2 group-hover:text-[#aaa] mb-1">
                      {playlist.title}
                    </h3>
                    <p className="text-[#aaa] text-xs mb-1">{playlist.creator}</p>
                    <div className="flex items-center gap-2 text-[#aaa] text-xs">
                      <span>{playlist.enrolled.toLocaleString()} enrolled</span>
                      <span>•</span>
                      <span>★ {playlist.rating}</span>
                      <span>•</span>
                      <span>{playlist.level}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredPlaylists.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-[#aaa] mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2 text-white">No playlists found</h3>
            <p className="text-[#aaa]">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
