
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Define the subject colors and days
const subjectColors = [
  { name: "Purple", value: "purple" },
  { name: "Blue", value: "blue" },
  { name: "Green", value: "green" },
  { name: "Red", value: "red" },
  { name: "Orange", value: "orange" },
  { name: "Pink", value: "pink" },
  { name: "Yellow", value: "yellow" },
  { name: "Indigo", value: "indigo" },
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Define the validation schema
const formSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  day: z.string().min(1, "Day is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  color: z.string().min(1, "Color is required"),
});

export type StudySession = z.infer<typeof formSchema>;

interface ScheduleFormProps {
  onAddSession: (session: StudySession) => void;
  editingSession?: StudySession | null;
  onUpdate?: (session: StudySession) => void;
  onCancel?: () => void;
}

const ScheduleForm = ({
  onAddSession,
  editingSession = null,
  onUpdate,
  onCancel,
}: ScheduleFormProps) => {
  const form = useForm<StudySession>({
    resolver: zodResolver(formSchema),
    defaultValues: editingSession || {
      subject: "",
      day: "",
      startTime: "",
      endTime: "",
      color: "purple",
    },
  });

  const onSubmit = (data: StudySession) => {
    if (editingSession && onUpdate) {
      onUpdate(data);
      toast("Session updated", {
        description: `${data.subject} on ${data.day}`,
      });
    } else {
      onAddSession(data);
      toast("Session added", {
        description: `${data.subject} on ${data.day}`,
      });
    }
    if (!editingSession) {
      form.reset({
        subject: "",
        day: "",
        startTime: "",
        endTime: "",
        color: "purple",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
      >
        <h3 className="text-lg font-medium">
          {editingSession ? "Edit Study Session" : "Add Study Session"}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Math, Science, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="day"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Day</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subjectColors.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full bg-study-${color.value} mr-2`}
                          ></div>
                          {color.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          {editingSession && onCancel && (
            <Button variant="outline" onClick={onCancel} type="button">
              Cancel
            </Button>
          )}
          <Button type="submit">
            {editingSession ? "Update Session" : "Add Session"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ScheduleForm;
