"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "Who are we?",
      answer:
        "CirclesFundMe is a registered digital savings and loans cooperative society. Our vision is to become an SEC-licensed fund management company by 2025/2026.",
    },
    {
      question: "Who can be a member?",
      answer:
        "   Anyone with a verifiable and legitimate source of income who can sustain weekly or monthly savings & the capacity to repay loans.",
    },
    {
      question: "Who is eligible for loans?",
      answer: "Only qualified registered members can access loans.",
    },
    {
      question: "How much loan can a member access?",
      answer: "Up to #100 million subject to meeting other loan terms.",
    },
    {
      question: "What is the requirement to access a loan?",
      answer:
        "Meeting up with the equity contribution and minimum membership period for loans.",
    },
    {
      question: "What interest does the loan attract?",
      answer:
        "  The loan is interest-free. However, loan beneficiaries will pay a 6% annual fee as a Loan Management Fee.",
    },
    {
      question: "What can the loan be used for?",
      answer:
        "  The loan can be used for:♤Auto Finance, ♤♤ Working Capital Loan, ♤♤♤ Personal loans.",
    },
    {
      question: "Are there any monthly fees?",
      answer:
        " Yes, all members must pay a monthly non-refundable membership service charge.",
    },
    {
      question: "Is a guarantor required for the loan?",
      answer: "   No, you do not need a guarantor",
    },
    {
      question: "How can someone become a member?",
      answer:
        "You can become a member by downloading our app, completing the registration process, and making your first savings deposit.",
    },
    {
      question: "Do you have further inquiries about Circlesfundme?",
      answer:
        "Call 07033319394 08055357592 or send a message on WhatsApp at 2347033319394 2348055357592.",
    },
    {
      question: "Office Address:",
      answer: "Road 116, House 8, Gwarinpa, Abuja.",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-accent-500 mb-2 font-outfit">FAQ</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-outfit">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-[1px] space-y-3 border-[#B3B3B3] rounded-2xl last:border-b-0"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline transition-colors">
                  <span className="font-medium text-primary-800">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
