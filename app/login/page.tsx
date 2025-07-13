"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full space-y-8 max-w-2xl">
          <div className="flex items-center space-x-2 mb-15 -mt-10">
            <div className="flex mb-4">
              <Link href="/">
                <Image
                  src="/assets/images/logo.png"
                  alt="logo"
                  width={250}
                  height={100}
                />
              </Link>
            </div>
          </div>

          <Card className="border-0 shadow-none max-w-lg mx-auto">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Log In
              </CardTitle>
              <p className="text-gray-600 mt-2 -m-6 text-sm">
                Please fill the details below to sign into your account.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="space-y-4 mt-10">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email Address or Phone Number
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter Your Email Address or Phone Number"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-6 w-6" />
                        ) : (
                          <Eye className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-right mb-12">
                  <a
                    href="#"
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Forgotten Password?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-black hover:bg-primary-900 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Log In"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex-1 bg-primary-900 flex items-center justify-center">
        <div className="relative w-80 h-80">
          <Image
            src="/assets/images/logo-v.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
