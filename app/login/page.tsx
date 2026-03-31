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
import { Loader } from "@/components/ui/Loader";
import { useMutation } from "react-query";
import handleFetch from "@/services/api/handleFetch";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import AuthCode from "react-auth-code-input";

const ROLE_REDIRECT_MAP: Record<string, string> = {
  SuperAdmin: "/dashboard",
  CreditRiskOfficer: "/user-management",
  Admin: "/admin-user-management",
  Referrer: "/my-dashboard",
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [step, setStep] = useState<"login" | "otp">("login");
  const [otp, setOtp] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const router = useRouter();
  const [, setCookie] = useCookies(["data"]);

  // LOGIN MUTATION
  const loginMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      if (res?.statusCode !== "200") {
        toast.error(res?.message || "Something went wrong.");
        return;
      }

      if (res.data.requiresOtp) {
        toast.success(res.message);
        setUserEmail(res.data.email);
        setStep("otp");
        return;
      }

      toast.success("Login Successful");

      setCookie("data", res.data, {
        secure: true,
        sameSite: "strict",
      });

      const redirectPath =
        ROLE_REDIRECT_MAP[res.data.role] || "/dashboard";

      router.push(redirectPath);
    },
    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong.");
    },
  });

  // OTP MUTATION
  const verifyOtpMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      if (res?.statusCode !== "200") {
        toast.error(res?.message || "Invalid OTP.");
        return;
      }

      toast.success("Login Successful");

      setCookie("data", res.data, {
        secure: true,
        sameSite: "strict",
      });

      const redirectPath =
        ROLE_REDIRECT_MAP[res.data.role] || "/dashboard";

      router.push(redirectPath);
    },
    onError: (err: any) => {
      toast.error(err?.message || "OTP verification failed.");
    },
  });

  // HANDLERS
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    loginMutation.mutate({
      endpoint: "auth/login",
      method: "POST",
      body: { email, password },
    });
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter complete OTP.");
      return;
    }

    verifyOtpMutation.mutate({
      endpoint: "auth/verify-admin-otp",
      method: "POST",
      body: {
        email: userEmail,
        otp,
      },
    });
  };

  // OPTIONAL: AUTO SUBMIT WHEN OTP COMPLETE
  const handleOtpChange = (value: string) => {
    setOtp(value);

    if (value.length === 6) {
      verifyOtpMutation.mutate({
        endpoint: "auth/verify-admin-otp",
        method: "POST",
        body: {
          email: userEmail,
          otp: value,
        },
      });
    }
  };

  const isLoading =
    loginMutation.isLoading || verifyOtpMutation.isLoading;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT */}
      <div className="w-full lg:flex-1 flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-lg space-y-8">
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
                {step === "login" ? "Log In" : "Verify OTP"}
              </CardTitle>
              <p className="text-gray-600 mt-2 text-sm">
                {step === "login"
                  ? "Please fill the details below to sign into your account."
                  : `Enter the OTP sent to ${userEmail}`}
              </p>
            </CardHeader>

            <CardContent>
              {step === "login" ? (
                <form onSubmit={handleLogin}>
                  <div className="space-y-4 mt-6">
                    <Input
                      id="email"
                      label="Email Address"
                      type="email"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12"
                      required
                    />

                    <div className="relative">
                      <Input
                        id="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="absolute right-3 top-[70%] -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="text-right my-6">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary-600"
                    >
                      Forgotten Password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-black text-white"
                    disabled={loginMutation.isLoading}
                  >
                    {loginMutation.isLoading
                      ? "Signing In..."
                      : "Continue"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <div className="flex flex-col items-center gap-4 mt-6">
                    <AuthCode
                      length={6}
                      onChange={handleOtpChange}
                      inputClassName="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:border-black text-lg"
                      containerClassName="flex gap-3 justify-center"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 mt-6 bg-black text-white"
                    disabled={verifyOtpMutation.isLoading}
                  >
                    {verifyOtpMutation.isLoading
                      ? "Verifying..."
                      : "Verify OTP"}
                  </Button>

                  {/* RESEND */}
                  <button
                    type="button"
                    className="mt-4 text-sm text-primary-600 underline w-full text-center"
                    onClick={() =>
                      loginMutation.mutate({
                        endpoint: "auth/login",
                        method: "POST",
                        body: { email, password },
                      })
                    }
                  >
                    Resend OTP
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep("login")}
                    className="mt-2 text-sm text-gray-500 underline w-full text-center"
                  >
                    Back to Login
                  </button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* RIGHT */}
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

      {/* LOADER */}
      {isLoading && <Loader />}
    </div>
  );
}