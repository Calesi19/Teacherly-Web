import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, MoreVertical } from "lucide-react"
import { useState } from "react"
import { students } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const profileTabs = [
  { id: "overview", label: "Overview" },
  { id: "attendance", label: "Attendance" },
  { id: "grades", label: "Grades" },
  { id: "assignments", label: "Assignments" },
  { id: "notes", label: "Notes" },
  { id: "visitations", label: "Visitations" },
]

export function StudentProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")

  const student = students.find((s) => s.id === id)

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] p-6 text-center">
        <h2 className="text-xl font-bold">Student not found</h2>
        <Button variant="link" onClick={() => navigate("/students")}>
          Back to students
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Tabs Section */}
      <Tabs className="w-full">
        <div className="page-header">
          {/* Custom Header */}
          <div className="flex items-center justify-between px-4 py-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="-ml-2">
              <ArrowLeft className="size-5" />
            </Button>
            <h1 className="text-lg font-semibold">{student.name}</h1>
            <Button variant="ghost" size="icon" className="-mr-2">
              <MoreVertical className="size-5" />
            </Button>
          </div>

          <TabsList className="px-1">
            {profileTabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="min-w-max flex-none"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="p-4">
          <TabsContent active={activeTab === "overview"}>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Contact Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Email</span>
                    <span className="text-sm font-medium">{student.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">Gender</span>
                    <span className="text-sm font-medium">{student.gender}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Emergency Contact</h3>
                <div className="rounded-xl border p-4">
                  <p className="font-medium">Jane Doe (Mother)</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent active={activeTab === "attendance"}>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-muted-foreground">Attendance history will appear here.</p>
            </div>
          </TabsContent>
          <TabsContent active={activeTab === "grades"}>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-muted-foreground">Grade reports will appear here.</p>
            </div>
          </TabsContent>
          <TabsContent active={activeTab === "assignments"}>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-muted-foreground">Assignments will appear here.</p>
            </div>
          </TabsContent>
          <TabsContent active={activeTab === "notes"}>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-muted-foreground">Notes will appear here.</p>
            </div>
          </TabsContent>
          <TabsContent active={activeTab === "visitations"}>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-muted-foreground">Visitations will appear here.</p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
