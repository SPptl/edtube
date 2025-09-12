"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { NavigationSidebar } from "@/components/navigation-sidebar"
import { UserProfileDropdown } from "@/components/user-profile-dropdown"
import { EdTubeLogo } from "@/components/edtube-logo"
import { ArrowLeft, Brain, Clock, Trophy, Target, CheckCircle, XCircle, Play } from "lucide-react"
import { useRouter } from "next/navigation"

const quizzes = [
  {
    id: 1,
    title: "React Fundamentals Quiz",
    subject: "Programming",
    difficulty: "Beginner",
    questions: 15,
    duration: "20 min",
    attempts: 3,
    bestScore: 85,
    completed: true,
    description: "Test your knowledge of React components, props, and state",
    topics: ["Components", "Props", "State", "Events"],
  },
  {
    id: 2,
    title: "Physics - Motion & Forces",
    subject: "Physics",
    difficulty: "Intermediate",
    questions: 20,
    duration: "30 min",
    attempts: 1,
    bestScore: 72,
    completed: true,
    description: "Comprehensive quiz on kinematics and dynamics",
    topics: ["Kinematics", "Newton's Laws", "Forces", "Energy"],
  },
  {
    id: 3,
    title: "Data Structures Mastery",
    subject: "Programming",
    difficulty: "Advanced",
    questions: 25,
    duration: "45 min",
    attempts: 0,
    bestScore: null,
    completed: false,
    description: "Advanced concepts in arrays, linked lists, trees, and graphs",
    topics: ["Arrays", "Linked Lists", "Trees", "Graphs", "Algorithms"],
  },
  {
    id: 4,
    title: "Calculus Integration",
    subject: "Mathematics",
    difficulty: "Intermediate",
    questions: 18,
    duration: "35 min",
    attempts: 2,
    bestScore: 91,
    completed: true,
    description: "Master integration techniques and applications",
    topics: ["Basic Integration", "Substitution", "Parts", "Applications"],
  },
]

const subjects = ["All", "Programming", "Physics", "Mathematics", "Chemistry"]
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

export default function QuizzesPage() {
  const router = useRouter()
  const [selectedSubject, setSelectedSubject] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSubject = selectedSubject === "All" || quiz.subject === selectedSubject
    const matchesDifficulty = selectedDifficulty === "All" || quiz.difficulty === selectedDifficulty
    return matchesSubject && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-600 text-white"
      case "Intermediate":
        return "bg-yellow-600 text-white"
      case "Advanced":
        return "bg-red-600 text-white"
      default:
        return "bg-[#3f3f3f] text-white"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

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
            <Brain className="h-8 w-8 text-[#ff0000]" />
            <h1 className="text-2xl font-medium text-white">Quizzes</h1>
          </div>
          <p className="text-[#aaa] text-base">Test your understanding and track your learning progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#272727] rounded-xl p-4 hover:bg-[#3f3f3f] transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#ff0000]/20">
                <Target className="h-5 w-5 text-[#ff0000]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">12</p>
                <p className="text-sm text-[#aaa]">Total Quizzes</p>
              </div>
            </div>
          </div>

          <div className="bg-[#272727] rounded-xl p-4 hover:bg-[#3f3f3f] transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-600/20">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">8</p>
                <p className="text-sm text-[#aaa]">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-[#272727] rounded-xl p-4 hover:bg-[#3f3f3f] transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-600/20">
                <Trophy className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">82%</p>
                <p className="text-sm text-[#aaa]">Avg Score</p>
              </div>
            </div>
          </div>

          <div className="bg-[#272727] rounded-xl p-4 hover:bg-[#3f3f3f] transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-600/20">
                <Clock className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">4.2h</p>
                <p className="text-sm text-[#aaa]">Time Spent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <Button
                key={subject}
                variant={selectedSubject === subject ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedSubject(subject)}
                className={
                  selectedSubject === subject
                    ? "bg-white text-black hover:bg-[#d9d9d9]"
                    : "bg-[#272727] text-white hover:bg-[#3f3f3f] border-[#3f3f3f]"
                }
              >
                {subject}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedDifficulty(difficulty)}
                className={
                  selectedDifficulty === difficulty
                    ? "bg-white text-black hover:bg-[#d9d9d9]"
                    : "bg-[#272727] text-white hover:bg-[#3f3f3f] border-[#3f3f3f]"
                }
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-[#272727] rounded-xl p-6 hover:bg-[#3f3f3f] transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-medium text-white text-lg line-clamp-2 flex-1">{quiz.title}</h3>
                {quiz.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 ml-2" />
                ) : (
                  <XCircle className="h-5 w-5 text-[#aaa] flex-shrink-0 ml-2" />
                )}
              </div>

              <p className="text-[#aaa] text-sm mb-4 line-clamp-2">{quiz.description}</p>

              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty}
                </span>
                <span className="px-2 py-1 rounded text-xs font-medium bg-[#3f3f3f] text-white">{quiz.subject}</span>
              </div>

              <div className="space-y-2 text-sm text-[#aaa] mb-4">
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="text-white">{quiz.questions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="text-white">{quiz.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Attempts:</span>
                  <span className="text-white">{quiz.attempts}</span>
                </div>
                {quiz.bestScore && (
                  <div className="flex justify-between">
                    <span>Best Score:</span>
                    <span className={getScoreColor(quiz.bestScore)}>{quiz.bestScore}%</span>
                  </div>
                )}
              </div>

              {quiz.bestScore && (
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#aaa]">Progress</span>
                    <span className="text-white">{quiz.bestScore}%</span>
                  </div>
                  <div className="w-full bg-[#3f3f3f] rounded-full h-2">
                    <div
                      className="bg-[#ff0000] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${quiz.bestScore}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-1 mb-4">
                {quiz.topics.slice(0, 3).map((topic) => (
                  <span key={topic} className="px-2 py-1 bg-[#3f3f3f] text-white text-xs rounded">
                    {topic}
                  </span>
                ))}
                {quiz.topics.length > 3 && (
                  <span className="px-2 py-1 bg-[#3f3f3f] text-white text-xs rounded">
                    +{quiz.topics.length - 3} more
                  </span>
                )}
              </div>

              <Button
                className={`w-full ${
                  quiz.completed
                    ? "bg-[#3f3f3f] text-white hover:bg-[#4f4f4f]"
                    : "bg-[#ff0000] text-white hover:bg-[#cc0000]"
                }`}
              >
                <Play className="h-4 w-4 mr-2" />
                {quiz.completed ? "Retake Quiz" : "Start Quiz"}
              </Button>
            </div>
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-12">
            <Brain className="h-12 w-12 text-[#aaa] mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2 text-white">No quizzes found</h3>
            <p className="text-[#aaa]">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
