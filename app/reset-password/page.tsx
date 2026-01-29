"use client";

import type React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "@/components/ui/Loader";
import { useMutation } from "react-query";
import handleFetch from "@/services/api/handleFetch";
import { toast } from "react-toastify";

export default function SetNewPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailOrPhone = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const resetPasswordMutation = useMutation(handleFetch, {
    onSuccess: (res: { statusCode: string; message: string }) => {
      if (res?.statusCode !== "200") {
        toast.error(res?.message || "Something went wrong.");
      } else {
        toast.success("Password reset successful");
        router.push("/login");
      }
    },
    onError: (err: { message: string }) => {
      toast.error(err?.message || "Something went wrong.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    resetPasswordMutation.mutate({
      endpoint: "auth/reset-password",
      method: "POST",
      body: {
        email: emailOrPhone,
        otp,
        newPassword,
      },
    });
  };

  const { isLoading } = resetPasswordMutation;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center lg:justify-start pt-10">
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
                Set New Password
              </CardTitle>
              <p className="text-gray-600 mt-2 text-sm">
                Enter the OTP sent to your email and set a new password.
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="OTP"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="h-12"
                  required
                />

                <div className="relative">
                  <Input
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-12 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[70%] -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff className="h-6 w-6" />
                    ) : (
                      <Eye className="h-6 w-6" />
                    )}
                  </button>
                </div>

                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12"
                  required
                />

                <Button
                  type="submit"
                  className="w-full h-12 bg-black text-white mt-4"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting Password..." : "Reset Password"}
                </Button>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-primary-900 items-center justify-center">
        <div className="relative w-96 h-96">
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
