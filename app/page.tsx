"use client";
import { Button } from "@/components/ui/button";
import { Home, Search, Clock, User, Menu } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex h-screen bg-blue-200 relative">
      {/* Sidebar */}
      

      {/* Top-right Login & Sign Up */}
      <div className="absolute top-4 right-4 space-x-2">
        <Button variant="outline">Login</Button>
        <Button className="bg-blue-500 hover:bg-blue-600">Sign Up</Button>
      </div>

      {/* Centered Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center text-center">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">Swiping Just Got Better!</h1>
          <h2 className="text-5xl font-light text-blue-900 mb-4">Get your work done faster</h2>

        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <Button className="h-12 w-35 bg-blue-600 text-white px-6 py-3 rounded-lg mb-20">
            Get Started!
          </Button>
        </div>
      </main>
    </div>
  );
}
