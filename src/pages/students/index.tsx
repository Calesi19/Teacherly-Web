import { useState } from "react";
import { Search, Mars, Venus } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { students } from "@/lib/mock-data";

export function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.gender.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const GenderIcon = ({ gender }: { gender: string }) => {
    if (gender === "Male") {
      return (
        <div className="flex size-7 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
          <Mars className="size-4" />
        </div>
      );
    }
    if (gender === "Female") {
      return (
        <div className="flex size-7 items-center justify-center rounded-full bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400">
          <Venus className="size-4" />
        </div>
      );
    }
    return (
      <div className="flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <span className="text-[10px] font-bold">?</span>
      </div>
    );
  };

  return (
    <div className="relative h-full overflow-hidden">
      <header
        className="glass-3 fixed top-0 right-0 border-t-transparent
        left-0 z-40 flex flex-col gap-4 px-4 py-4 pb-2 backdrop-blur-md"
      >
        <h1 className="text-xl font-bold tracking-tight">Students</h1>
        <div className="relative">
          <Search className="absolute top-3 left-3 size-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="h-10 rounded-xl border-none bg-muted/50 pl-9 shadow-none focus-visible:ring-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="absolute inset-x-0 top-[104px] bottom-20 overflow-y-auto overscroll-y-none">
        {filteredStudents.map((student, index) => (
          <div key={student.id} className="group">
            <Link
              to={`/students/${student.id}`}
              className="flex items-center justify-between px-4 py-2.5 transition-colors active:bg-muted/50"
            >
              <span className="text-[14px] font-medium text-foreground">
                {student.name}
              </span>
              <GenderIcon gender={student.gender} />
            </Link>
            {index < filteredStudents.length - 1 && <Separator />}
          </div>
        ))}
        {filteredStudents.length === 0 && (
          <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
            <p className="text-sm font-medium">No students found</p>
          </div>
        )}
      </div>
    </div>
  );
}
