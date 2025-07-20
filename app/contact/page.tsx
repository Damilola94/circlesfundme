"use client";

import type React from "react";
import { useState } from "react";
import Header from "@/components/website-ui/header";
import Footer from "@/components/website-ui/footer";
import Breadcrumb from "@/components/website-ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import handleFetch from "@/services/api/handleFetch";
import { useMutation } from "react-query";
import { Loader } from "@/components/ui/Loader";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    title: "",
    message: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactMutation = useMutation(handleFetch, {
    onSuccess: (res: { statusCode: string; message: string }) => {
      if (res?.statusCode !== "200") {
        toast.error(res?.message || "Something went wrong.");
      } else {
        toast.success(res?.message || "Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          title: "",
          message: "",
        });
      }
    },
    onError: (err: { statusCode?: string; message: string }) => {
      toast.error(err?.message || "Something went wrong.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "title",
      "message",
    ];
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast.error(`Please fill in the ${field} field.`);
        return;
      }
    }

    const body = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      title: formData.title,
      message: formData.message,
    };

    contactMutation.mutate({
      endpoint: "utility/contact-us",
      method: "POST",
      body,
    });
  };

  const { isLoading } = contactMutation;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg border border-primary/20 p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2 font-outfit">
                Contact Us
              </h1>
              <p className="text-gray-600 mb-8 font-outfit">
                CirclesFundMe Digital Savings and Loans Cooperative Society
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 font-outfit">
                      Call Us
                    </h3>
                    <p className="text-gray-600 text-sm font-outfit">
                      +234 703 331 9394
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 font-outfit">
                      Email Us
                    </h3>
                    <p className="text-gray-600 text-sm font-outfit">
                      info@circlesfundme.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 font-outfit">
                      Visit Us
                    </h3>
                    <p className="text-gray-600 text-sm font-outfit">
                      Road 116,House 8, Gwarimpa, Abuja, Nigeria
                    </p>
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="font-semibold text-gray-900 mb-4 font-outfit">
                    Follow our social media
                  </h3>
                  <div className="flex space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Facebook className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Twitter className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6 font-outfit">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="bg-white border-0"
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="bg-white border-0"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-white border-0"
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-white border-0"
                    required
                  />
                </div>
                <Input
                  type="text"
                  placeholder="Subject"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="bg-white border-0"
                  required
                />
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="bg-white border-0 min-h-[120px]"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-white text-primary hover:bg-gray-100 font-semibold py-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {isLoading && <Loader />}
    </div>
  );
}
