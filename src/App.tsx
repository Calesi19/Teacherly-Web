import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Search, X } from "lucide-react";
import { MobileLayout } from "@/components/layout/mobile-layout";
import { StudentsPage } from "@/pages/students";
import { StudentProfilePage } from "@/pages/students/student-profile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { students } from "@/lib/mock-data";

const attendanceOptions = ["Present", "Absent", "Late", "Partial"] as const;

type AttendanceStatus = (typeof attendanceOptions)[number];

type StudentAssignmentMeta = {
  exempt: boolean;
  late: boolean;
  note: string;
};

const attendanceOptionClasses: Record<AttendanceStatus, string> = {
  Present:
    "data-[state=on]:bg-emerald-500/15 data-[state=on]:text-emerald-700 dark:data-[state=on]:text-emerald-400",
  Absent: "data-[state=on]:bg-destructive/10 data-[state=on]:text-destructive",
  Late: "data-[state=on]:bg-amber-500/15 data-[state=on]:text-amber-700 dark:data-[state=on]:text-amber-400",
  Partial:
    "data-[state=on]:bg-blue-500/10 data-[state=on]:text-blue-600 dark:data-[state=on]:text-blue-400",
};

const assignments = [
  {
    id: "a1",
    name: "Linear Equations Checkpoint",
    course: "Algebra II",
    date: "May 4, 2026",
    maxScore: 100,
    type: "Quiz",
  },
  {
    id: "a2",
    name: "Cell Structure Lab Report",
    course: "Biology",
    date: "May 6, 2026",
    maxScore: 50,
    type: "Project",
  },
  {
    id: "a3",
    name: "Chapter 8 Reading Response",
    course: "English Literature",
    date: "May 8, 2026",
    maxScore: 25,
    type: "Homework",
  },
  {
    id: "a4",
    name: "World War II Unit Test",
    course: "World History",
    date: "May 11, 2026",
    maxScore: 100,
    type: "Exam",
  },
  {
    id: "a5",
    name: "Data Visualization Portfolio",
    course: "Computer Science",
    date: "May 13, 2026",
    maxScore: 75,
    type: "Project",
  },
];

const assignmentCourses = [
  "All",
  ...Array.from(new Set(assignments.map((assignment) => assignment.course))),
];

function getScoreToneClass(percent: number | null) {
  if (percent === null) {
    return "text-muted-foreground";
  }

  if (percent >= 90) {
    return "text-emerald-600 dark:text-emerald-400";
  }

  if (percent >= 80) {
    return "text-blue-600 dark:text-blue-400";
  }

  if (percent >= 70) {
    return "text-amber-600 dark:text-amber-400";
  }

  if (percent >= 60) {
    return "text-orange-600 dark:text-orange-400";
  }

  return "text-red-600 dark:text-red-400";
}

function getLetterGrade(percent: number | null) {
  if (percent === null) {
    return "--";
  }

  if (percent >= 90) {
    return "A";
  }

  if (percent >= 80) {
    return "B";
  }

  if (percent >= 70) {
    return "C";
  }

  if (percent >= 60) {
    return "D";
  }

  return "F";
}

const assignmentTypeBadgeVariant: Record<
  string,
  React.ComponentProps<typeof Badge>["variant"]
> = {
  Exam: "destructive",
  Homework: "secondary",
  Project: "success",
  Quiz: "warning",
};

function HomePage() {
  return (
    <div className="flex flex-col">
      <header className="page-header space-y-2 p-6 pb-3 pt-12">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-muted-foreground">
          This is your mobile-only teacher dashboard.
        </p>
      </header>
      <div className="grid gap-4 p-6 pt-5">
        <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
          <h2 className="text-lg font-semibold">Today's Schedule</h2>
          <p className="text-sm opacity-90">
            You have 4 classes remaining today.
          </p>
          <Button variant="secondary" size="sm" className="mt-4 w-full">
            View Schedule
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Attendance
            </h3>
            <p className="mt-2 text-2xl font-bold text-foreground">94%</p>
          </div>
          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Reports
            </h3>
            <p className="mt-2 text-2xl font-bold text-foreground">12</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="flex flex-col">
      <header className="page-header space-y-2 p-6 pb-3 pt-12">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account preferences.
        </p>
      </header>
      <div className="space-y-4 p-6 pt-5">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Dark Mode</p>
            <p className="text-xs text-muted-foreground">
              Adjust the look of the app.
            </p>
          </div>
          <div className="font-mono text-[10px] text-muted-foreground">
            (Press <kbd>d</kbd> to toggle)
          </div>
        </div>
      </div>
    </div>
  );
}

function AttendancePage() {
  const [attendance, setAttendance] = useState<
    Record<string, AttendanceStatus>
  >(() =>
    Object.fromEntries(
      students.map((student) => [
        student.id,
        "Present" satisfies AttendanceStatus,
      ]),
    ),
  );

  return (
    <div className="flex flex-col">
      <header className="page-header px-4 py-4 pb-2">
        <h1 className="text-xl font-bold tracking-tight">Attendance</h1>
      </header>

      <div className="mt-2 flex flex-col">
        {students.map((student) => (
          <div key={student.id} className="px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{student.name}</p>
              </div>
            </div>

            <ToggleGroup
              type="single"
              value={attendance[student.id]}
              onValueChange={(value) =>
                value &&
                setAttendance((current) => ({
                  ...current,
                  [student.id]: value as AttendanceStatus,
                }))
              }
              className="mt-3 grid w-full grid-cols-4 gap-0 rounded-lg bg-muted/50 p-0.5"
              aria-label={`${student.name} attendance`}
            >
              {attendanceOptions.map((option) => (
                <ToggleGroupItem
                  key={option}
                  value={option}
                  aria-label={`${option} for ${student.name}`}
                  className={`h-8 min-w-0 rounded-md px-1.5 text-[11px] data-[state=on]:shadow-sm ${attendanceOptionClasses[option]}`}
                >
                  {option}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssignmentsPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");

  const filteredAssignments = assignments.filter(
    (assignment) =>
      (selectedCourse === "All" || assignment.course === selectedCourse) &&
      (assignment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.type.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <div className="relative h-[100svh] overflow-hidden">
      <header className="glass-1 fixed top-0 right-0 left-0 z-40 flex flex-col gap-3 px-4 py-4 pb-2 backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            {isSearching ? (
              <div className="relative">
                <Search className="absolute top-3 left-3 size-4 text-muted-foreground" />
                <Input
                  autoFocus
                  placeholder="Search assignments..."
                  className="h-10 w-full rounded-xl border-none bg-muted/50 pl-9 pr-3 shadow-none focus-visible:ring-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            ) : (
              <h1 className="text-xl font-bold tracking-tight">Assignments</h1>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label={isSearching ? "Close search" : "Search assignments"}
            onClick={() => setIsSearching((current) => !current)}
            className="-mr-1 shrink-0"
          >
            {isSearching ? (
              <X className="size-5" />
            ) : (
              <Search className="size-5" />
            )}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {assignmentCourses.map((course) => {
            const isActive = selectedCourse === course;

            return (
              <button
                key={course}
                type="button"
                onClick={() => setSelectedCourse(course)}
                className={
                  isActive
                    ? "inline-flex h-8 items-center rounded-full bg-foreground px-3 text-[11px] font-medium text-background transition-colors"
                    : "inline-flex h-8 items-center rounded-full border border-border bg-background px-3 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted"
                }
              >
                {course}
              </button>
            );
          })}
        </div>
      </header>

      <div className="absolute inset-x-0 top-[152px] bottom-20 overflow-y-auto overscroll-y-none">
        {filteredAssignments.map((assignment, index) => (
          <div key={assignment.id} className="group">
            <Link
              to={`/assignments/${assignment.id}`}
              className="flex items-center justify-between gap-3 px-4 py-2.5 transition-colors active:bg-muted/50"
            >
              <div className="min-w-0">
                <p className="truncate text-[14px] font-medium text-foreground">
                  {assignment.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {assignment.course} · {assignment.date}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge
                  variant={
                    assignmentTypeBadgeVariant[assignment.type] ?? "outline"
                  }
                >
                  {assignment.type}
                </Badge>
                <span className="text-xs font-medium text-muted-foreground">
                  {assignment.maxScore} pts
                </span>
              </div>
            </Link>
            {index < filteredAssignments.length - 1 && <Separator />}
          </div>
        ))}
        {filteredAssignments.length === 0 && (
          <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
            <p className="text-sm font-medium">No assignments found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AssignmentGradesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const assignment = assignments.find((item) => item.id === id);
  const [scores, setScores] = useState<Record<string, string>>(() =>
    Object.fromEntries(students.map((student) => [student.id, ""])),
  );
  const [studentMeta] = useState<Record<string, StudentAssignmentMeta>>(() =>
    Object.fromEntries(
      students.map((student) => [
        student.id,
        {
          exempt: false,
          late: false,
          note: "",
        } satisfies StudentAssignmentMeta,
      ]),
    ),
  );

  if (!assignment) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold">Assignment not found</h2>
        <Button variant="link" onClick={() => navigate("/assignments")}>
          Back to assignments
        </Button>
      </div>
    );
  }

  return (
    <div className="relative h-[100svh] overflow-hidden">
      <header className="page-header fixed top-0 right-0 left-0 z-40 flex items-center gap-3 px-4 py-4 pb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="-ml-2"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold tracking-tight">
            {assignment.name}
          </h1>
          <p className="text-xs text-muted-foreground">
            {assignment.course} · {assignment.maxScore} pts
          </p>
        </div>
      </header>

      <div className="absolute inset-x-0 top-[76px] bottom-20 overflow-y-auto overscroll-y-none">
        {students.map((student) => {
          const score = Number(scores[student.id]);
          const meta = studentMeta[student.id];
          const hasScore = scores[student.id] !== "" && Number.isFinite(score);
          const percentValue = hasScore
            ? Math.round((score / assignment.maxScore) * 100)
            : null;
          const percent = percentValue === null ? "--%" : `${percentValue}%`;
          const toneClass = getScoreToneClass(percentValue);
          const letterGrade = getLetterGrade(percentValue);
          const showLetterGrade = assignment.type === "Exam";

          return (
            <div
              key={student.id}
              className="flex items-center gap-3 overflow-hidden px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">
                  {student.name}
                </span>
                <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-[13px] font-medium">
                  <span className={toneClass}>{percent}</span>
                  {showLetterGrade && <span className={toneClass}>{letterGrade}</span>}
                  {meta.late && (
                    <Badge variant="warning" className="shrink-0 px-2 py-0 text-[10px]">
                      Late
                    </Badge>
                  )}
                </div>
                {meta.note && (
                  <p className="mt-1 min-w-0 truncate text-xs text-muted-foreground">
                    {meta.note}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-1 text-right">
                {meta.exempt ? (
                  <Badge variant="secondary" className="px-2.5 py-1 text-xs">
                    Exempt
                  </Badge>
                ) : (
                  <div className="flex items-center rounded-full bg-background px-2.5 py-1.5 focus-within:bg-background">
                    <Input
                      type="number"
                      inputMode="decimal"
                      min={0}
                      max={assignment.maxScore}
                      disabled={meta.exempt}
                      value={scores[student.id]}
                      onChange={(event) =>
                        setScores((current) => ({
                          ...current,
                          [student.id]: event.target.value,
                        }))
                      }
                      className="h-7 w-14 border-none bg-background px-0 text-right text-base font-semibold shadow-none [appearance:textfield] focus-visible:ring-0 disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      aria-label={`Score for ${student.name}`}
                    />
                    <span className="ml-1 text-sm font-medium text-muted-foreground">
                      / {assignment.maxScore}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<MobileLayout />}>
          <Route index element={<HomePage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="students/:id" element={<StudentProfilePage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="assignments/:id" element={<AssignmentGradesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
