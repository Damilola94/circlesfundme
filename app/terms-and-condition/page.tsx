"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/website-ui/header"
import Footer from "@/components/website-ui/footer"
import Breadcrumb from "@/components/website-ui/breadcrumb"

const LAST_UPDATED = "September 10, 2025"
const CONTACT_EMAIL = "support@circlesfundme.com"
const DATA_CONTROLLER = "CirclesFundMe"

const TermsAndConditions: React.FC = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Terms & Conditions", href: "/terms" },
  ]
  const [selectedContent, setSelectedContent] = useState<number>(1)

  const handleContentClick = (id: number, sectionId: string) => {
    setSelectedContent(id)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <main className="relative">
        <section>
          <div className="bg-primary p-6 w-full">
            <h3 className="ff-regular text-center text-4xl md:text-5xl text-white">
              Terms & Conditions
            </h3>
            <p className="m-auto mt-2 max-w-lg text-center text-white text-base ff-regular">
              Last updated: {LAST_UPDATED}
            </p>
          </div>

          <div className="flex w-full sm:px-16 px-8 sm:py-24 py-12">
            {/* Sidebar */}
            <aside className="w-[40%] hidden md:block sticky top-20 max-h-screen overflow-y-auto scrollbar pr-6">
              <h3 className="ff-regular text-xl font-bold">Table of Contents</h3>
              <nav className="ff-regular font-mono mt-4 space-y-3">
                {[
                  { id: 1, title: "Introduction", sectionId: "introduction" },
                  { id: 2, title: "Eligibility & Accounts", sectionId: "eligibility" },
                  { id: 3, title: "Use of Services", sectionId: "use" },
                  { id: 4, title: "User Responsibilities", sectionId: "responsibilities" },
                  { id: 5, title: "Payments & Contributions", sectionId: "payments" },
                  { id: 6, title: "Loans & Credit", sectionId: "loans" },
                  { id: 7, title: "Intellectual Property", sectionId: "ip" },
                  { id: 8, title: "Prohibited Activities", sectionId: "prohibited" },
                  { id: 9, title: "Termination", sectionId: "termination" },
                  { id: 10, title: "Disclaimers & Liability", sectionId: "liability" },
                  { id: 11, title: "Governing Law", sectionId: "law" },
                  { id: 12, title: "Changes to Terms", sectionId: "changes" },
                  { id: 13, title: "Contact Us", sectionId: "contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleContentClick(item.id, item.sectionId)}
                    className={`block text-left hover:text-primary transition-colors ${
                      selectedContent === item.id ? "text-primary font-semibold" : ""
                    }`}
                  >
                    {item.id}. {item.title}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <article className="w-full prose max-w-none">
              {/* 1. Introduction */}
              <section id="introduction" className="mb-10">
                <h3 className="text-xl font-bold">1. Introduction</h3>
                <p className="mt-4">
                  These Terms and Conditions (“Terms”) govern your use of CirclesFundMe
                  (“we”, “our”, “us”, or the “Platform”). By accessing or using our website,
                  mobile apps, and services (collectively, the “Services”), you agree to be
                  bound by these Terms. If you do not agree, you may not use our Services.
                </p>
              </section>

              {/* 2. Eligibility & Accounts */}
              <section id="eligibility" className="mb-10">
                <h3 className="text-xl font-bold">2. Eligibility & Accounts</h3>
                <p className="mt-4">
                  To use our Services, you must be at least 18 years old and legally capable
                  of entering into a binding agreement. You are responsible for maintaining
                  the confidentiality of your account credentials and all activities under
                  your account.
                </p>
              </section>

              {/* 3. Use of Services */}
              <section id="use" className="mb-10">
                <h3 className="text-xl font-bold">3. Use of Services</h3>
                <p className="mt-4">
                  Our Services provide group-based savings, contributions, credit/loan
                  facilitation, and wallet services. You agree to use the Services only for
                  lawful purposes, in compliance with these Terms and applicable laws.
                </p>
              </section>

              {/* 4. User Responsibilities */}
              <section id="responsibilities" className="mb-10">
                <h3 className="text-xl font-bold">4. User Responsibilities</h3>
                <ul className="list-disc ml-6 mt-3">
                  <li>Provide accurate, complete, and current information when registering.</li>
                  <li>Use Services in good faith and not to defraud other users or the Platform.</li>
                  <li>Comply with KYC and identity verification requirements.</li>
                </ul>
              </section>

              {/* 5. Payments & Contributions */}
              <section id="payments" className="mb-10">
                <h3 className="text-xl font-bold">5. Payments & Contributions</h3>
                <p className="mt-4">
                  All payments, contributions, and transfers must be made through authorized
                  methods. You authorize us and our payment partners to process transactions
                  as instructed. Fees, if any, will be communicated before processing.
                </p>
              </section>

              {/* 6. Loans & Credit */}
              <section id="loans" className="mb-10">
                <h3 className="text-xl font-bold">6. Loans & Credit</h3>
                <p className="mt-4">
                  Loan eligibility, approval, and repayment are subject to our policies and
                  regulatory requirements. Failure to repay may affect your credit rating and
                  ability to use Services in the future.
                </p>
              </section>

              {/* 7. Intellectual Property */}
              <section id="ip" className="mb-10">
                <h3 className="text-xl font-bold">7. Intellectual Property</h3>
                <p className="mt-4">
                  All content, logos, trademarks, and software related to our Services are
                  owned by CirclesFundMe or licensed to us. You may not copy, distribute, or
                  use them without prior written consent.
                </p>
              </section>

              {/* 8. Prohibited Activities */}
              <section id="prohibited" className="mb-10">
                <h3 className="text-xl font-bold">8. Prohibited Activities</h3>
                <ul className="list-disc ml-6 mt-3">
                  <li>Using the Services for illegal or fraudulent purposes.</li>
                  <li>Attempting to gain unauthorized access to accounts or systems.</li>
                  <li>Transmitting harmful code, malware, or disruptive content.</li>
                </ul>
              </section>

              {/* 9. Termination */}
              <section id="termination" className="mb-10">
                <h3 className="text-xl font-bold">9. Termination</h3>
                <p className="mt-4">
                  We may suspend or terminate your access to Services if you violate these
                  Terms or engage in unlawful conduct. You may stop using the Services at any
                  time.
                </p>
              </section>

              {/* 10. Disclaimers & Liability */}
              <section id="liability" className="mb-10">
                <h3 className="text-xl font-bold">10. Disclaimers & Limitation of Liability</h3>
                <p className="mt-4">
                  Services are provided “as is” and “as available” without warranties of any
                  kind. To the maximum extent permitted by law, we disclaim all liability for
                  damages arising from use of the Services.
                </p>
              </section>

              {/* 11. Governing Law */}
              <section id="law" className="mb-10">
                <h3 className="text-xl font-bold">11. Governing Law</h3>
                <p className="mt-4">
                  These Terms are governed by and construed under the laws of your country of
                  residence, unless otherwise required by applicable law.
                </p>
              </section>

              {/* 12. Changes to Terms */}
              <section id="changes" className="mb-10">
                <h3 className="text-xl font-bold">12. Changes to Terms</h3>
                <p className="mt-4">
                  We may update these Terms from time to time. Continued use of the Services
                  after updates constitutes acceptance of the revised Terms.
                </p>
              </section>

              {/* 13. Contact */}
              <section id="contact" className="mb-10">
                <h3 className="text-xl font-bold">13. Contact Us</h3>
                <p className="mt-4">
                  For questions or concerns about these Terms, please contact:
                </p>
                <ul className="list-disc ml-6 mt-3">
                  <li>
                    <strong>Data Controller:</strong> {DATA_CONTROLLER}
                  </li>
                  <li>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-dark-purple underline">
                      {CONTACT_EMAIL}
                    </a>
                  </li>
                  <li>
                    <strong>Support:</strong> Use in-app support or our help center.
                  </li>
                </ul>
              </section>
            </article>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  )
}

export default TermsAndConditions
