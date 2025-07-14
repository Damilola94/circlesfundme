"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Gideon Ogbechie",
      role: "Business Man",
      content:
        "As a business owner, I needed a financing option that wouldn’t disrupt my cash flow. CirclesFundme gave me just that. With fair interest and flexible repayment terms, I’ve been able to access working capital easily, without the pressure of large lump-sum payments. It’s perfect for growing my operations.",
      rating: 5,
    },
    {
      name: "Godwin Edache",
      role: "Software Engineer",
      content:
        "Managing finances alongside a demanding tech role can be tough. CirclesFundme helped me stay financially stable by allowing me to save gradually and borrow when needed. The low interest and predictable contributions make it easy to plan ahead without worrying about overwhelming loan terms or repayment deadlines.",
      rating: 4,
    },
    {
      name: "Elizabeth Badmus",
      role: "Trader",
      content:
        "I used to struggle with restocking my shop during slow weeks. With CirclesFundme, I save a little weekly and access loans when needed. It fits my income pattern perfectly. The interest is fair, and the repayment terms are convenient. It’s really helped me manage and grow my trading business.",
      rating: 5,
    },
    {
      name: "Angela Ogah",
      role: "Trader",
      content:
        "CirclesFundme has made financing simple for someone like me. I no longer worry about large upfront payments. Their savings-based system allows me to contribute weekly and get loans without stress. It’s flexible, transparent, and tailored to small business owners like me who need stability and room to grow.”",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-accent-500 mb-2 font-outfit">Customers Testimonials</p>
          <h2 className="text-3xl lg:text-4xl font-bold font-outfit text-gray-900 mb-4">
            What Our Customers Are Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className=" border-primary/50 border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-8 h-8 text-primary/50 rotate-180 bg" />
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed font-outfit mb-4">
                  {testimonial.content}
                </p>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 font-outfit">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 font-outfit">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
