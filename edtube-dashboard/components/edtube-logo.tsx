import { Play, BookOpen } from "lucide-react"

export function EdTubeLogo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
          <Play className="h-4 w-4 text-white fill-white" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
          <BookOpen className="h-2.5 w-2.5 text-white" />
        </div>
      </div>
      <h1 className="text-xl font-bold text-white">EdTube</h1>
    </div>
  )
}

export default EdTubeLogo
