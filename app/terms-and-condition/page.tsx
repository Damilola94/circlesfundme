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
              Terms &amp; Conditions
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
                  { id: 1,  title: "Introduction",               sectionId: "introduction" },
                  { id: 2,  title: "Eligibility",                sectionId: "eligibility" },
                  { id: 3,  title: "Subscription Fee",           sectionId: "subscription" },
                  { id: 4,  title: "Payment Methods & Liability",sectionId: "payments" },
                  { id: 5,  title: "Savings Commitment",         sectionId: "savings" },
                  { id: 6,  title: "Loan Eligibility & Requirements", sectionId: "loans" },
                  { id: 7,  title: "Group Guarantee Model",      sectionId: "group" },
                  { id: 8,  title: "Contribution Default & Penalties", sectionId: "default" },
                  { id: 9,  title: "Withdrawals",                sectionId: "withdrawals" },
                  { id: 10, title: "Account Closure",            sectionId: "closure" },
                  { id: 11, title: "Platform Features & Updates",sectionId: "features" },
                  { id: 12, title: "Compliance & Integrity",     sectionId: "compliance" },
                  { id: 13, title: "Amendments",                 sectionId: "amendments" },
                  { id: 14, title: "Acceptance",                 sectionId: "acceptance" },
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
                  CirclesFundMe ("the Platform") is a collaborative savings and credit solution
                  designed to provide affordable financing for mobility entrepreneurs and small
                  business owners, including hire purchase (auto financing) and SME inventory
                  financing.
                </p>
                <p className="mt-4">
                  By registering on the Platform, all users agree to comply with these Terms
                  and Conditions.
                </p>
              </section>

              {/* 2. Eligibility */}
              <section id="eligibility" className="mb-10">
                <h3 className="text-xl font-bold">2. Eligibility</h3>
                <p className="mt-4">
                  To qualify for participation on the Platform, users must:
                </p>
                <ul className="list-disc ml-6 mt-3 space-y-1">
                  <li>
                    Be a mobility entrepreneur or small business owner operating within a
                    recognized market cluster.
                  </li>
                  <li>
                    Demonstrate the capacity to save a minimum of ₦30,000 per month.
                  </li>
                  <li>
                    Provide accurate and verifiable personal and business information as
                    required during onboarding.
                  </li>
                </ul>
              </section>

              {/* 3. Subscription Fee */}
              <section id="subscription" className="mb-10">
                <h3 className="text-xl font-bold">3. Subscription Fee</h3>
                <p className="mt-4">
                  All users are required to pay a daily subscription fee ranging from ₦100 to
                  ₦167, which covers platform maintenance, administrative, and operational
                  costs. This fee is mandatory and non-refundable.
                </p>
              </section>

              {/* 4. Payment Methods & Liability */}
              <section id="payments" className="mb-10">
                <h3 className="text-xl font-bold">4. Payment Methods and Liability</h3>
                <p className="mt-4">
                  All payments on the Platform must be made exclusively through approved
                  channels, including direct debit, bank transfer, and bank deposit into
                  designated company accounts.
                </p>
                <p className="mt-4">
                  The Platform does not authorize or recognize cash payments made to any
                  individual, staff member, agent, or third party on its behalf. Accordingly,
                  CirclesFundMe shall not be held liable for any loss, dispute, or claim
                  arising from cash payments made outside the approved payment channels.
                </p>
                <p className="mt-4">
                  Users are strongly advised to ensure that all transactions are conducted
                  through the officially designated payment methods and to retain valid proof
                  of payment for all transactions.
                </p>
              </section>

              {/* 5. Savings Commitment */}
              <section id="savings" className="mb-10">
                <h3 className="text-xl font-bold">5. Savings Commitment</h3>
                <p className="mt-4">
                  Users agree to make savings contributions on a daily, weekly, or monthly
                  basis through the Platform.
                </p>
                <p className="mt-4">
                  A minimum of three (3) consecutive months of consistent savings is required
                  before a user becomes eligible to apply for any loan facility, subject to
                  meeting other platform requirements.
                </p>
              </section>

              {/* 6. Loan Eligibility & Requirements */}
              <section id="loans" className="mb-10">
                <h3 className="text-xl font-bold">6. Loan Eligibility and Requirements</h3>

                <h4 className="text-base font-semibold mt-4">6.1 General Loan Access</h4>
                <p className="mt-2">Access to loans is contingent upon:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Meeting the minimum savings duration requirement.</li>
                  <li>Maintaining consistent contribution records.</li>
                  <li>Satisfying all internal credit and risk assessment criteria.</li>
                </ul>

                <h4 className="text-base font-semibold mt-4">6.2 Mobility Financing (Hire Purchase)</h4>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>
                    Mobility entrepreneurs must contribute at least 10% of the value of the
                    intended vehicle.
                  </li>
                  <li>
                    The Platform may finance up to 90% of the vehicle value, subject to
                    approval.
                  </li>
                </ul>

                <h4 className="text-base font-semibold mt-4">6.3 SME Inventory Financing</h4>
                <p className="mt-2">
                  Eligible users may access inventory financing based on their savings history,
                  contribution consistency, and internal credit evaluation.
                </p>
              </section>

              {/* 7. Group Guarantee Model */}
              <section id="group" className="mb-10">
                <h3 className="text-xl font-bold">7. Group Guarantee Model</h3>
                <ul className="list-disc ml-6 mt-3 space-y-1">
                  <li>
                    Users are required to form or join a group of five (5) individuals
                    (friends, colleagues, neighbors, or business associates within the same
                    market).
                  </li>
                  <li>
                    When a group member accesses a loan, the remaining four (4) members act
                    as guarantors.
                  </li>
                  <li>
                    A lien may be placed on guarantors' savings contributions until the loan
                    is fully repaid.
                  </li>
                  <li>
                    All group members share collective responsibility for loan performance.
                  </li>
                </ul>
              </section>

              {/* 8. Contribution Default & Penalties */}
              <section id="default" className="mb-10">
                <h3 className="text-xl font-bold">8. Contribution Default and Penalties</h3>

                <h4 className="text-base font-semibold mt-4">8.1 Late Contribution Fee</h4>
                <p className="mt-2">
                  Users who fail to meet their scheduled contribution after receiving reminders
                  and exceeding a 24-hour grace period will incur a penalty ranging from ₦200
                  to ₦1,000.
                </p>

                <h4 className="text-base font-semibold mt-4">8.2 Loan Repayment Default</h4>
                <p className="mt-2">
                  Users who miss any loan repayment will incur a default fee of 10% of the
                  missed repayment amount. Continued default may result in additional recovery
                  actions in line with Platform policies.
                </p>
              </section>

              {/* 9. Withdrawals */}
              <section id="withdrawals" className="mb-10">
                <h3 className="text-xl font-bold">9. Withdrawals</h3>

                <h4 className="text-base font-semibold mt-4">9.1 Withdrawal Charges</h4>
                <p className="mt-2">All withdrawals attract a ₦500 processing fee.</p>

                <h4 className="text-base font-semibold mt-4">9.2 Withdrawal Limits</h4>
                <p className="mt-2">
                  Users may withdraw up to 20% of their total savings per quarter, subject to
                  system rules and eligibility.
                </p>
              </section>

              {/* 10. Account Closure */}
              <section id="closure" className="mb-10">
                <h3 className="text-xl font-bold">10. Account Closure</h3>
                <p className="mt-4">
                  Users intending to close their accounts must provide a minimum of sixty (60)
                  days' prior written notice.
                </p>
                <p className="mt-4">
                  All outstanding obligations, including loans and applicable fees, must be
                  fully settled before account closure is processed.
                </p>
              </section>

              {/* 11. Platform Features & Updates */}
              <section id="features" className="mb-10">
                <h3 className="text-xl font-bold">11. Platform Features and Updates</h3>
                <p className="mt-4">
                  The Platform may introduce, modify, or discontinue features (including
                  savings products or loan offerings) at its discretion.
                </p>
                <p className="mt-4">
                  Users will be duly notified of any significant changes affecting their
                  participation.
                </p>
              </section>

              {/* 12. Compliance & Integrity */}
              <section id="compliance" className="mb-10">
                <h3 className="text-xl font-bold">12. Compliance and Integrity</h3>
                <p className="mt-4">
                  Users are expected to maintain honesty and accuracy in all transactions and
                  representations on the Platform.
                </p>
                <p className="mt-4">
                  Any attempt to falsify information, manipulate records, or breach platform
                  rules may result in suspension, termination, or legal action.
                </p>
              </section>

              {/* 13. Amendments */}
              <section id="amendments" className="mb-10">
                <h3 className="text-xl font-bold">13. Amendments</h3>
                <p className="mt-4">
                  CirclesFundMe reserves the right to amend these Terms and Conditions at any
                  time. Continued use of the Platform constitutes acceptance of any revised
                  terms.
                </p>
              </section>

              {/* 14. Acceptance */}
              <section id="acceptance" className="mb-10">
                <h3 className="text-xl font-bold">14. Acceptance</h3>
                <p className="mt-4">
                  By registering and using the Platform, users acknowledge that they have
                  read, understood, and agreed to be bound by these Terms and Conditions.
                </p>
                <p className="mt-4">
                  For questions or concerns, please contact us at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-dark-purple underline">
                    {CONTACT_EMAIL}
                  </a>{" "}
                  or use in-app support.
                </p>
                <p className="mt-6 italic text-sm text-gray-500">
                  For and on behalf of {DATA_CONTROLLER} — Management Team
                </p>
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