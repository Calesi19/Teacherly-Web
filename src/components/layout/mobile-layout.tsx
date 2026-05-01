import { NavLink, Outlet } from "react-router-dom"
import {
  ClipboardCheck,
  ClipboardList,
  Home,
  Settings,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/students", label: "Students", icon: Users },
  { to: "/attendance", label: "Attendance", icon: ClipboardCheck },
  { to: "/assignments", label: "Assignments", icon: ClipboardList },
  { to: "/settings", label: "Settings", icon: Settings },
]

export function MobileLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      {/* Scrollable Content Area */}
      <main className="flex-1 pb-[calc(5rem+env(safe-area-inset-bottom))]">
        <Outlet />
      </main>

      {/* Fixed Bottom Tab Bar */}
      <nav className="glass-3 fixed right-0 bottom-0 left-0 z-50 bg-background/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
        <div className="grid h-16 grid-cols-5 items-center px-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex min-w-0 flex-col items-center gap-1 text-[10px] font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              <Icon className="size-5" />
              <span className="max-w-full truncate">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
