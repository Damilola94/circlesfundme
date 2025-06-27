"use client";

import { Button } from "@/components/ui/button";
import { Construction, LogIn } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="p-4 bg-orange-100 rounded-full">
            <Construction className="w-12 h-12 text-orange-600" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-800">
            Under Construction
          </h1>
          <p className="text-slate-600 text-lg">
            {"We're working hard to bring you something amazing. Stay tuned!"}
          </p>
        </div>

        <div className="pt-4">
          <Button
            size="lg"
            className="w-full sm:w-auto px-8 py-3 text-base font-semibold"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            <LogIn className="w-5 h-5 mr-2" />
            Click Here to Login
          </Button>
        </div>

        <div className="pt-8 text-sm text-slate-500">
          <p>© 2025 CMG Tech Studio. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
