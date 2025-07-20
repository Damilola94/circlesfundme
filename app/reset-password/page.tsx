"use client";

import type React from "react";
import { useState, useEffect } from "react";
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

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const resetPasswordMutation = useMutation(handleFetch, {
    onSuccess: (res: { statusCode: string; message: string }) => {
      if (res?.statusCode !== "200") {
        toast.error(res?.message || "Failed to reset password.");
      } else {
        toast.success(res?.message || "Password has been reset successfully.");
        router.push("/login");
      }
    },
    onError: (err: { statusCode?: string; message: string }) => {
      toast.error(err?.message || "Something went wrong.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&~`'"])[A-Za-z\d@$#!%*?&~`'"]{8,}$/.test(
        password
      )
    ) {
      toast.error(
        "Your password must be minimum of eight characters, with at least one uppercase letter, one lowercase letter, one digit and one special character (@$#!%*?&~`'\")"
      );
      return;
    }

    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    const body = {
      token,
      password,
      confirmPassword,
    };

    resetPasswordMutation.mutate({
      endpoint: "auth/reset-password",
      method: "POST",
      body,
    });
  };

  const { isLoading } = resetPasswordMutation;

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
                Reset Password
              </CardTitle>
              <p className="text-gray-600 mt-2 -m-6 text-sm font-outfit">
                Set your new password.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 mt-10">
                  <div className="space-y-2">
                    <div className="relative">
                      <Input
                        label="New Password"
                        id="new-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[70%] -translate-y-1/2 text-gray-400 hover:text-gray-600" 
                      >
                        {showPassword ? (
                          <EyeOff className="h-6 w-6" />
                        ) : (
                          <Eye className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Input
                        label="Confirm New Password"
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="h-12 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-[70%] -translate-y-1/2 text-gray-400 hover:text-gray-600" 
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-6 w-6" />
                        ) : (
                          <Eye className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-black hover:bg-primary-900 text-white mt-8"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
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
      {isLoading && <Loader />}
    </div>
  );
}
