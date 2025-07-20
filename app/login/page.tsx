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
// import { useCookies } from "react-cookie";

import { toast } from "react-toastify";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // const [cookie, , removeCookie] = useCookies(["err"]);
  // const [, setCookie] = useCookies(["data", "form"]);

  const loginMutation = useMutation(handleFetch, {
    onSuccess: (res: {
      statusCode: string;
      message: string;
      data: { accessToken: string };
    }) => {
      if (res?.statusCode !== "200") {
        toast.error(res?.message || "Something went wrong.");
      } else {
        toast.success("Login Successful");
        // setCookie("data", res?.data, { secure: true, sameSite: true });
        router.push("/dashboard");
      }
    },
    onError: (err: { statusCode?: string; message: string }) => {
      toast.error(err?.message || "Something went wrong.");
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(email && password)) {
      toast.error("Please, enter your email and password.");
      return;
    }
    const body = {
      email,
      password,
    };
    loginMutation.mutate({
      endpoint: "auth/login",
      method: "POST",
      body,
    });
  };

  const { isLoading } = loginMutation;

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full space-y-8 max-w-2xl">
          <div className="flex items-center space-x-2 mb-15 -mt-10">
            <div className="flex pt-10 pl-10 mb-4">
              <Link href="">
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
              <p className="text-gray-600 mt-2 -m-6 text-sm font-outfit">
                Please fill the details below to sign into your account.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="space-y-4 mt-10">
                  <div className="space-y-2">
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
                  </div>
                  <div className="space-y-2">
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
                </div>
                <div className="text-right mb-12">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary-600 font-outfit hover:text-primary-700"
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
