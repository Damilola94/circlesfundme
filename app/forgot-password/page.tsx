"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "@/components/ui/Loader";
import { useMutation } from "react-query";
import handleFetch from "@/services/api/handleFetch";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const forgotPasswordMutation = useMutation(handleFetch, {
    onSuccess: (res: { statusCode: string; message: string }) => {
      if (res?.statusCode !== "200") {
        toast.error(res?.message || "Failed to send reset link.");
      } else {
        toast.success("OTP sent successfully");
        router.push(`/reset-password?email=${email}`);
      }
    },
    onError: (err: { statusCode?: string; message: string }) => {
      toast.error(err?.message || "Something went wrong.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    forgotPasswordMutation.mutate({
      endpoint: "auth/forgot-password",
      method: "POST",
      body: { email },
    });
  };

  const { isLoading } = forgotPasswordMutation;

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full space-y-8 max-w-2xl">
          <div className="flex items-center space-x-2 mb-15 -mt-10">
            <div className="flex pt-10 pl-10 mb-4">
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
                Forgot Password
              </CardTitle>
              <p className="text-gray-600 mt-2 -m-6 text-sm font-outfit">
                Enter your email address to receive a password reset link.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 mt-10">
                  <div className="space-y-2">
                    <Input
                      label="Email Address"
                      id="email"
                      type="email"
                      placeholder="Enter Your Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-black hover:bg-primary-900 text-white mt-8"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
                <div className="text-center mt-4">
                  <Link
                    href="/login"
                    className="text-sm text-primary-600 font-outfit hover:text-primary-700"
                  >
                    Back to Login
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="hidden lg:flex lg:flex-1 bg-primary-900 items-center justify-center">
        <div className="relative w-64 h-72">
          <Image
            src="/assets/images/logo-v.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}
