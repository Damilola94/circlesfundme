"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "@/components/ui/Loader";
import { useMutation } from "react-query";
import handleFetch from "@/services/api/handleFetch";
import { toast } from "react-toastify";

export default function SetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, [searchParams]);

  const forgotPasswordMutation = useMutation(handleFetch, {
    onSuccess: (res: { statusCode: string; message: string }) => {
      if (res?.statusCode !== "200") {
        toast.error(res?.message || "Something went wrong.");
      } else {
        toast.success("OTP sent successfully");
        router.push(`/reset-password?email=${email}`);
      }
    },
    onError: (err: { message: string }) => {
      toast.error(err?.message || "Something went wrong.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:flex-1 flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-lg space-y-8">
          <div className="flex justify-center lg:justify-start py-10">
            <Link href="/">
              <Image
                src="/assets/images/logo.png"
                alt="logo"
                width={220}
                height={80}
              />
            </Link>
          </div>

          <Card className="border-0 shadow-none">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Set Password
              </CardTitle>
              <p className="text-gray-600 mt-2 text-sm">
                Enter your email to receive an OTP.
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />

                <Button
                  type="submit"
                  className="w-full h-12 bg-black text-white mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-primary-900 items-center justify-center">
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
