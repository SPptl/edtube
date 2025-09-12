"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, PlaySquare, Brain, TrendingUp, History, Home, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"

interface NavigationSidebarProps {
  className?: string
}

const mainNavigationItems = [
  {
    title: "Playlists",
    icon: PlaySquare,
    href: "/playlists",
    description: "Browse curated learning playlists",
  },
  {
    title: "Quizzes",
    icon: Brain,
    href: "/quizzes",
    description: "Test your knowledge",
  },
  {
    title: "Progress",
    icon: TrendingUp,
    href: "/progress",
    description: "Track your learning journey",
  },
  {
    title: "Previously Watched",
    icon: History,
    href: "/history",
    description: "Continue where you left off",
  },
]

const menuItems = [
  {
    title: "Home",
    icon: Home,
    href: "/",
    description: "Go to dashboard",
  },
  {
    title: "You",
    icon: User,
    href: "/account",
    description: "Your profile",
  },
]

const NavigationSidebar = ({ className }: NavigationSidebarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isDashboard = pathname === "/"

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsMenuOpen(false)
  }

  const PermanentSidebar = () => (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-[#0f0f0f] border-r border-[#272727] z-30">
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-2">
          <div className="pb-2">
            <h3 className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-[#aaa]">Navigation</h3>
            {mainNavigationItems.map((item, index) => (
              <div key={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 px-3 py-3 text-white hover:bg-[#272727] rounded-lg transition-colors duration-200"
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className="h-5 w-5 text-[#aaa]" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className="text-xs text-[#aaa]">{item.description}</span>
                  </div>
                </Button>
                {index < mainNavigationItems.length - 1 && <div className="h-2" />}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )

  const CollapsibleMenuContent = () => (
    <div className="flex h-full flex-col bg-[#0f0f0f] border-r border-[#272727]">
      <div className="flex h-14 items-center border-b border-[#272727] px-4">
        <h2 className="text-lg font-semibold text-white">Menu</h2>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item, index) => (
            <div key={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-3 py-3 text-white hover:bg-[#272727] rounded-lg transition-colors duration-200"
                onClick={() => handleNavigation(item.href)}
              >
                <item.icon className="h-5 w-5 text-[#aaa]" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className="text-xs text-[#aaa]">{item.description}</span>
                </div>
              </Button>
              {index < menuItems.length - 1 && <div className="h-2" />}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )

  return (
    <>
      {isDashboard && <PermanentSidebar />}

      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-9 w-9 text-white hover:bg-[#272727]", className)}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0 bg-[#0f0f0f] border-[#272727]">
          <CollapsibleMenuContent />
        </SheetContent>
      </Sheet>
    </>
  )
}

export { NavigationSidebar }
export default NavigationSidebar
