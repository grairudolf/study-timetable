
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SubjectBadge from "./SubjectBadge";
import ScheduleForm, { StudySession } from "./ScheduleForm";
import { Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const StudySchedule = () => {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [editingSession, setEditingSession] = useState<StudySession | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Load sessions from localStorage on component mount
  useEffect(() => {
    const savedSessions = localStorage.getItem("studySessions");
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("studySessions", JSON.stringify(sessions));
  }, [sessions]);

  const handleAddSession = (session: StudySession) => {
    setSessions([...sessions, session]);
    setShowForm(false);
  };

  const handleEditSession = (session: StudySession, index: number) => {
    setEditingSession(session);
    setEditingIndex(index);
    setDialogOpen(true);
  };

  const handleUpdateSession = (updatedSession: StudySession) => {
    if (editingIndex !== null) {
      const updatedSessions = [...sessions];
      updatedSessions[editingIndex] = updatedSession;
      setSessions(updatedSessions);
      setEditingSession(null);
      setEditingIndex(null);
      setDialogOpen(false);
    }
  };

  const handleDeleteSession = (index: number) => {
    const updatedSessions = sessions.filter((_, i) => i !== index);
    setSessions(updatedSessions);
    toast("Session deleted", { description: "The study session has been removed" });
  };

  const handleCancelEdit = () => {
    setEditingSession(null);
    setEditingIndex(null);
    setDialogOpen(false);
  };

  // Group sessions by day
  const sessionsByDay = sessions.reduce<Record<string, StudySession[]>>(
    (acc, session) => {
      if (!acc[session.day]) {
        acc[session.day] = [];
      }
      acc[session.day].push(session);
      return acc;
    },
    {}
  );

  // Sort days in the correct order
  const daysOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Study Schedule</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Add Study Session"}
        </Button>
      </div>

      {showForm && (
        <div className="my-4">
          <ScheduleForm onAddSession={handleAddSession} />
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Study Session</DialogTitle>
            <DialogDescription>
              Make changes to your study session here.
            </DialogDescription>
          </DialogHeader>
          {editingSession && (
            <ScheduleForm
              onAddSession={handleAddSession}
              editingSession={editingSession}
              onUpdate={handleUpdateSession}
              onCancel={handleCancelEdit}
            />
          )}
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {daysOrder.map((day) => (
          <Card key={day} className="overflow-hidden">
            <div className="bg-study-purple/10 dark:bg-study-purple/20 p-3 border-b">
              <h3 className="font-medium text-lg">{day}</h3>
            </div>
            <CardContent className="p-4">
              {sessionsByDay[day]?.length ? (
                <div className="space-y-3">
                  {sessionsByDay[day]
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((session, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg flex flex-col space-y-2"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{session.subject}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {session.startTime} - {session.endTime}
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditSession(session, sessions.findIndex(s => 
                                s.subject === session.subject && 
                                s.day === session.day && 
                                s.startTime === session.startTime && 
                                s.endTime === session.endTime
                              ))}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteSession(sessions.findIndex(s => 
                                s.subject === session.subject && 
                                s.day === session.day && 
                                s.startTime === session.startTime && 
                                s.endTime === session.endTime
                              ))}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <SubjectBadge
                          name={session.subject}
                          color={session.color}
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                  <p>No study sessions for {day}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudySchedule;
