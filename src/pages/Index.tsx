
import React from "react";
import ThemeToggle from "@/components/ThemeToggle";
import StudySchedule from "@/components/StudySchedule";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-study-purple">StudyGlow</h1>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-study-purple to-study-indigo bg-clip-text text-transparent">
              Personal Study Timetable
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Create and manage your study schedule efficiently. Organize your time, track your subjects,
              and boost your productivity with this simple timetable creator.
            </p>
          </div>
          
          <StudySchedule />
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-800 mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
          <p>© 2025 StudyGlow Schedule Maker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
