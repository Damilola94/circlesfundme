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
  const router = useRouter();
  const [, setCookie] = useCookies(["data", "form"]);

  const loginMutation = useMutation(handleFetch, {
    onSuccess: (res: {
      statusCode: string;
      message: string;
      data: {
        accessToken: string;
        role: string;
      };
    }) => {
      if (res?.statusCode !== "200") {
        toast.error(res?.message || "Something went wrong.");
        return;
      }
      toast.success("Login Successful");
      setCookie("data", res.data, {
        secure: true,
        sameSite: "strict",
      });
      const role = res.data.role;
      const redirectPath =
        ROLE_REDIRECT_MAP[role] || "/dashboard";

      router.push(redirectPath);
    },
    onError: (err: { message?: string }) => {
      toast.error(err?.message || "Something went wrong.");
    },
  });

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

  const { isLoading } = loginMutation;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
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
                Log In
              </CardTitle>
              <p className="text-gray-600 mt-2 text-sm font-outfit">
                Please fill the details below to sign into your account.
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="space-y-4 mt-6">
                  <Input
                    id="email"
                    label="Email Address or Phone Number"
                    type="email"
                    placeholder="Enter Your Email Address or Phone Number"
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
                </div>

                <div className="text-right my-6">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Forgotten Password?
                  </Link>
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

      <div className="hidden lg:flex lg:flex-1 bg-primary-900 items-center justify-center">
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
