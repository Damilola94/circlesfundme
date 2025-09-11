"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/website-ui/header"
import Footer from "@/components/website-ui/footer"
import Breadcrumb from "@/components/website-ui/breadcrumb"

const LAST_UPDATED = "September 10, 2025"
const CONTACT_EMAIL = "privacy@circlesfundme.com"
const DATA_CONTROLLER = "CirclesFundMe"

const PrivacyPolicy: React.FC = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Privacy-Policy", href: "/privacy-policy" },
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
        <section className="">
          <div className="bg-primary p-6 w-full">
            <h3 className="ff-regular text-center text-4xl md:text-5xl text-white">Privacy Policy</h3>
            <p className="m-auto mt-2 max-w-lg text-center text-white text-base ff-regular">
              Last updated: {LAST_UPDATED}
            </p>
          </div>

          <div className="flex w-full sm:px-16 px-8 sm:py-24 py-12">
            <aside className="w-[40%] hidden md:block sticky top-20 max-h-screen overflow-y-auto scrollbar pr-6">
              <h3 className="ff-regular text-xl font-bold">Table of Contents</h3>
              <nav className="ff-regular font-mono mt-4 space-y-3">
                <button
                  onClick={() => handleContentClick(1, "introduction")}
                  className={`block text-left hover:text-primary transition-colors ${selectedContent === 1 ? "text-primary font-semibold" : ""}`}
                >
                  1. Introduction
                </button>
                <button
                  onClick={() => handleContentClick(2, "personal-data")}
                  className={`block text-left hover:text-primary transition-colors ${selectedContent === 2 ? "text-primary font-semibold" : ""}`}
                >
                  2. Personal Data We Collect
                </button>
                <button
                  onClick={() => handleContentClick(3, "how-we-use")}
                  className={`block text-left hover:text-primary transition-colors ${selectedContent === 3 ? "text-primary font-semibold" : ""}`}
                >
                  3. How We Use Your Data
                </button>
                <button
                  onClick={() => handleContentClick(4, "sharing")}
                  className={`block text-left hover:text-primary transition-colors ${selectedContent === 4 ? "text-primary font-semibold" : ""}`}
                >
                  4. Sharing & Third Parties
                </button>
                <button
                  onClick={() => handleContentClick(5, "kyc")}
                  className={`block text-left hover:text-primary transition-colors ${selectedContent === 5 ? "text-primary font-semibold" : ""}`}
                >
                  5. KYC & Documents
                </button>
                <button
                  onClick={() => handleContentClick(6, "cookies")}
                  className={`block text-left hover:text-primary transition-colors ${selectedContent === 6 ? "text-primary font-semibold" : ""}`}
                >
                  6. Cookies & Tracking
                </button>
                <button
                  onClick={() => handleContentClick(7, "retention")}
                  className={`block text-left hover:text-primary transition-colors ${selectedContent === 7 ? "text-primary font-semibold" : ""}`}
                >
                  7. Data Retention
                </button>
                <button
                  onClick={() => handleContentClick(8, "rights")}
                  className={`block text-left hover:text-primary transition-colors ${selectedContent === 8 ? "text-primary font-semibold" : ""}`}
                >
                  8. Your Rights
                </button>
                <button
                  onClick={() => handleContentClick(9, "security")}
                  className={`block text-left hover:text-primary transition-colors ${selectedContent === 9 ? "text-primary font-semibold" : ""}`}
                >
                  9. Security
                </button>
                <button
                  onClick={() => handleContentClick(10, "children")}
                  className={`block text-left hover:text-primary transition-colors ${selectedContent === 10 ? "text-primary font-semibold" : ""}`}
                >
                  10. Children
                </button>
                 <button
                  onClick={() => handleContentClick(11, "changes")}
                  className={`block text-left hover:text-primary transition-colors ${selectedContent === 10 ? "text-primary font-semibold" : ""}`}
                >
                  11. Changes to URl Policy
                </button>
                 <button
                  onClick={() => handleContentClick(12, "contact")}
                  className={`block text-left hover:text-primary transition-colors ${selectedContent === 10 ? "text-primary font-semibold" : ""}`}
                >
                  12. Contact Us
                </button>
              </nav>
            </aside>

            <article className="w-full prose max-w-none">
              {/* 1. Introduction */}
              <section id="introduction" className="mb-10">
                <h3 className="text-xl font-bold">1. Introduction</h3>
                <p className="mt-4">
                  CirclesFundMe (we, us, or the “Platform”) provides group-based savings, contributions, loan/credit
                  facilitation, and wallet services. This Privacy Policy explains how we collect, use, disclose, and
                  protect personal information when you visit <strong>circlesfundme.com </strong>
                  or use our mobile/web applications and services (together, the “Services”).
                </p>
                <p className="mt-3">
                  By using our Services you consent to the collection and use of your personal data as described in this
                  policy. If you do not agree with this policy, please do not use the Services.
                </p>
              </section>

              {/* 2. Personal Data We Collect */}
              <section id="personal-data" className="mb-10">
                <h3 className="text-xl font-bold">2. Personal Data We Collect</h3>
                <p className="mt-4">
                  We collect information you provide directly and information we obtain automatically when you interact
                  with our Services. Categories include:
                </p>
                <ul className="list-disc ml-6 mt-3">
                  <li>
                    <strong>Identity & contact:</strong> name, email, phone, date of birth, postal address.
                  </li>
                  <li>
                    <strong>Account data:</strong> username, password, account identifiers and wallet IDs.
                  </li>
                  <li>
                    <strong>Financial & transactional:</strong> bank details, contribution amounts, transfers, loan
                    details and transaction history.
                  </li>
                  <li>
                    <strong>KYC & identity documents:</strong> government ID, selfie, proof of address, BVN/NIN (where
                    required by law).
                  </li>
                  <li>
                    <strong>Device & usage:</strong> IP address, device identifiers, browser, operating system, activity
                    logs.
                  </li>
                  <li>
                    <strong>Communications:</strong> correspondence with support, feedback, and preferences.
                  </li>
                </ul>
              </section>

              {/* 3. How We Use Your Data */}
              <section id="how-we-use" className="mb-10">
                <h3 className="text-xl font-bold">3. How We Use Your Data</h3>
                <p className="mt-4">We use personal data to:</p>
                <ul className="list-disc ml-6 mt-3">
                  <li>Provide and improve the Services (account management, payments, contributions, loans).</li>
                  <li>
                    Perform KYC, fraud checks, credit assessments and comply with legal and regulatory obligations.
                  </li>
                  <li>
                    Communicate with you about your account, transactions, security alerts and marketing (where
                    permitted).
                  </li>
                  <li>Personalize and measure service usage, support, analytics and product development.</li>
                  <li>Enforce our terms, prevent abuse and protect the security and integrity of our platform.</li>
                </ul>
              </section>

              {/* 4. Sharing & Third Parties */}
              <section id="sharing" className="mb-10">
                <h3 className="text-xl font-bold">4. Sharing & Third Parties</h3>
                <p className="mt-4">We may share personal data with:</p>
                <ul className="list-disc ml-6 mt-3">
                  <li>Payment processors, banks and financial partners to complete transactions.</li>
                  <li>Credit bureaus and fraud prevention agencies for risk and compliance checks.</li>
                  <li>
                    Service providers (hosting, analytics, customer support) subject to confidentiality obligations.
                  </li>
                  <li>Legal, regulatory or government authorities when required by law or to protect our rights.</li>
                </ul>
                <p className="mt-3">
                  Where data is transferred to third parties or across borders, we use contractual safeguards or rely on
                  permitted legal mechanisms to protect your data.
                </p>
              </section>

              {/* 5. KYC & Documents */}
              <section id="kyc" className="mb-10">
                <h3 className="text-xl font-bold">5. KYC, Identity Verification & Documents</h3>
                <p className="mt-4">
                  To comply with anti-money laundering (AML), counter-terrorism financing and other regulatory
                  requirements, we may require KYC documents (government ID, proof of address, selfie). We store and
                  process this data securely and only keep copies as required by law or our retention policy.
                </p>
              </section>

              {/* 6. Cookies & Tracking */}
              <section id="cookies" className="mb-10">
                <h3 className="text-xl font-bold">6. Cookies & Tracking</h3>
                <p className="mt-4">
                  We and our service providers use cookies and similar technologies to provide and secure the Services,
                  analyze usage, and support advertising. You can manage cookie preferences through your browser or
                  device settings.
                </p>
              </section>

              {/* 7. Data Retention */}
              <section id="retention" className="mb-10">
                <h3 className="text-xl font-bold">7. Data Retention</h3>
                <p className="mt-4">
                  We retain personal data only as long as necessary to provide Services, comply with legal obligations,
                  resolve disputes, and enforce agreements. Specific retention periods may vary by data type and
                  regulatory requirement.
                </p>
              </section>

              {/* 8. Your Rights */}
              <section id="rights" className="mb-10">
                <h3 className="text-xl font-bold">8. Your Rights</h3>
                <p className="mt-4">
                  Depending on your jurisdiction, you may have rights including access, rectification, deletion,
                  restriction, portability and objection to processing. To exercise these rights please contact us at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-dark-purple underline">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </section>

              {/* 9. Security */}
              <section id="security" className="mb-10">
                <h3 className="text-xl font-bold">9. Security</h3>
                <p className="mt-4">
                  We implement administrative, technical and physical safeguards designed to protect personal data.
                  While we work to protect your information, no security system is impenetrable; please take steps to
                  protect your account (strong password, keep credentials confidential).
                </p>
              </section>

              {/* 10. Children */}
              <section id="children" className="mb-10">
                <h3 className="text-xl font-bold">11. Children</h3>
                <p className="mt-4">
                  Our Services are not intended for children under 18. We do not knowingly collect personal data from
                  minors. If you believe a child has provided us with personal data, please contact us and we will take
                  steps to delete it where appropriate.
                </p>
              </section>

              {/* 11. Changes to this Policy */}
              <section id="changes" className="mb-10">
                <h3 className="text-xl font-bold">12. Changes to this Policy</h3>
                <p className="mt-4">
                  We may update this policy. We will post the updated policy with a revised effective date. Continued
                  use of the Services after changes indicates acceptance of the updated policy.
                </p>
              </section>

              {/* 12. Contact */}
              <section id="contact" className="mb-10">
                <h3 className="text-xl font-bold">13. Contact Us</h3>
                <p className="mt-4">
                  If you have questions, requests, or complaints about this privacy policy or our data practices,
                  contact:
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
                    <strong>Support:</strong> use the in-app support or help center for account-specific issues.
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

export default PrivacyPolicy
