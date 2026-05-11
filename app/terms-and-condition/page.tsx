"use client";

import type React from "react";
import { useState } from "react";

import Header from "@/components/website-ui/header";
import Footer from "@/components/website-ui/footer";
import Breadcrumb from "@/components/website-ui/breadcrumb";

const LAST_UPDATED = "September 10, 2025";
const CONTACT_EMAIL = "support@circlesfundme.com";
const WEBSITE_URL = "https://www.circlesfundme.com";
const DATA_CONTROLLER = "CirclesFundMe Collaborative Savings and Credit Platform";

const TermsAndConditions: React.FC = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Terms & Conditions", href: "/terms" },
  ];

  const [selectedContent, setSelectedContent] = useState<number>(1);

  const sections = [
    { id: 1, title: "Introduction", sectionId: "introduction" },
    { id: 2, title: "Definitions", sectionId: "definitions" },
    { id: 3, title: "Eligibility", sectionId: "eligibility" },
    {
      id: 4,
      title: "User Registration & Responsibility",
      sectionId: "registration",
    },
    { id: 5, title: "Subscription Fee", sectionId: "subscription" },
    { id: 6, title: "Payment Methods & Liability", sectionId: "payments" },
    { id: 7, title: "Savings Commitment", sectionId: "savings" },
    {
      id: 8,
      title: "Loan Eligibility & Financing",
      sectionId: "financing",
    },
    {
      id: 9,
      title: "Tracking & Monitoring",
      sectionId: "tracking",
    },
    {
      id: 10,
      title: "Repayment Obligations",
      sectionId: "repayment",
    },
    {
      id: 11,
      title: "Defaults & Penalties",
      sectionId: "defaults",
    },
    {
      id: 12,
      title: "Group Guarantee Model",
      sectionId: "group",
    },
    { id: 13, title: "Withdrawals", sectionId: "withdrawals" },
    { id: 14, title: "User Obligations", sectionId: "obligations" },
    { id: 15, title: "Prohibited Conduct", sectionId: "prohibited" },
    { id: 16, title: "Default & Remedies", sectionId: "remedies" },
    { id: 17, title: "Account Closure", sectionId: "closure" },
    {
      id: 18,
      title: "Platform Features & Modifications",
      sectionId: "features",
    },
    {
      id: 19,
      title: "Privacy & Data Protection",
      sectionId: "privacy",
    },
    {
      id: 20,
      title: "Limitation of Liability",
      sectionId: "liability",
    },
    {
      id: 21,
      title: "Compliance & Integrity",
      sectionId: "compliance",
    },
    { id: 22, title: "Amendments", sectionId: "amendments" },
    {
      id: 23,
      title: "Governing Law & Dispute Resolution",
      sectionId: "governing-law",
    },
    { id: 24, title: "Acceptance", sectionId: "acceptance" },
  ];

  const handleContentClick = (id: number, sectionId: string) => {
    setSelectedContent(id);

    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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

          <div className="flex w-full sm:px-16 px-6 sm:py-24 py-12 gap-12">
            {/* Sidebar */}
            <aside className="w-[32%] hidden lg:block sticky top-20 h-fit max-h-[85vh] overflow-y-auto pr-4">
              <h3 className="ff-regular text-xl font-bold">
                Table of Contents
              </h3>

              <nav className="mt-5 space-y-3">
                {sections.map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      handleContentClick(item.id, item.sectionId)
                    }
                    className={`block text-left text-sm transition-colors hover:text-primary ${
                      selectedContent === item.id
                        ? "text-primary font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {item.id}. {item.title}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <article className="w-full prose max-w-none prose-headings:text-black prose-p:text-gray-700 prose-li:text-gray-700">
              {/* 1 */}
              <section id="introduction" className="mb-12">
                <h3>1. Introduction</h3>

                <p>
                  CirclesFundMe (“the Platform”) is a collaborative savings and
                  credit solution designed to provide affordable financing for
                  mobility entrepreneurs and small business owners, including
                  commercial vehicle financing through hire purchase
                  arrangements and SME inventory financing solutions.
                </p>

                <p>
                  By registering on the Platform, accessing any of its services,
                  or applying for financing, all users agree to comply with and
                  be bound by these Terms and Conditions.
                </p>
              </section>

              {/* 2 */}
              <section id="definitions" className="mb-12">
                <h3>2. Definitions</h3>

                <p>For the purpose of these Terms and Conditions:</p>

                <ul>
                  <li>
                    <strong>“Platform”</strong> refers to CirclesFundMe
                    Collaborative Savings and Credit Platform.
                  </li>

                  <li>
                    <strong>“User”</strong> refers to any individual, mobility
                    entrepreneur, small business owner, guarantor, or entity
                    registered on the Platform.
                  </li>

                  <li>
                    <strong>“Financed Asset”</strong> refers to any commercial
                    vehicle or financed inventory acquired through the Platform.
                  </li>

                  <li>
                    <strong>“Hire Purchase”</strong> refers to the financing
                    arrangement through which a user acquires a commercial
                    vehicle subject to instalment repayments.
                  </li>

                  <li>
                    <strong>“Tracker”</strong> refers to the monitoring device
                    installed on financed vehicles for operational and repayment
                    compliance purposes.
                  </li>

                  <li>
                    <strong>“Savings Contributions”</strong> refers to daily,
                    weekly, or monthly deposits made by users through the
                    Platform.
                  </li>

                  <li>
                    <strong>“Default Fee”</strong> refers to penalties charged
                    for non-compliance with repayment or contribution
                    obligations.
                  </li>
                </ul>
              </section>

              {/* 3 */}
              <section id="eligibility" className="mb-12">
                <h3>3. Eligibility</h3>

                <p>
                  To qualify for participation on the Platform, users must:
                </p>

                <ol>
                  <li>Be at least eighteen (18) years old.</li>

                  <li>
                    Be a mobility entrepreneur or small business owner operating
                    within a recognised market cluster.
                  </li>

                  <li>
                    Demonstrate the capacity to save a minimum of ₦30,000
                    monthly or as may be required by the Platform.
                  </li>

                  <li>
                    Provide accurate, complete, and verifiable personal and
                    business information during onboarding.
                  </li>

                  <li>
                    Meet all internal credit, verification, and risk assessment
                    requirements.
                  </li>

                  <li>
                    Agree to the installation and operation of tracking devices
                    on financed vehicles where applicable.
                  </li>
                </ol>
              </section>

              {/* 4 */}
              <section id="registration" className="mb-12">
                <h3>4. User Registration and Account Responsibility</h3>

                <ol>
                  <li>
                    Users are responsible for maintaining the confidentiality of
                    their account credentials.
                  </li>

                  <li>
                    Users shall ensure that all information provided to the
                    Platform remains accurate and up to date.
                  </li>

                  <li>
                    CirclesFundMe reserves the right to suspend or terminate
                    accounts containing false, misleading, or unverifiable
                    information.
                  </li>
                </ol>
              </section>

              {/* 5 */}
              <section id="subscription" className="mb-12">
                <h3>5. Subscription Fee</h3>

                <ol>
                  <li>
                    All users shall pay a daily subscription fee ranging from
                    ₦100 to ₦167.
                  </li>

                  <li>
                    The subscription fee covers platform maintenance,
                    administrative, and operational costs.
                  </li>

                  <li>
                    Subscription fees are mandatory and non-refundable.
                  </li>
                </ol>
              </section>

              {/* 6 */}
              <section id="payments" className="mb-12">
                <h3>6. Payment Methods and Liability</h3>

                <ol>
                  <li>
                    All payments on the Platform must be made exclusively
                    through approved payment channels, including:
                    <ul>
                      <li>Direct debit;</li>
                      <li>Bank transfer; and</li>
                      <li>
                        Bank deposit into designated company accounts.
                      </li>
                    </ul>
                  </li>

                  <li>
                    The Platform does not authorise or recognise cash payments
                    made to any individual, staff member, agent, or third party
                    on its behalf.
                  </li>

                  <li>
                    CirclesFundMe shall not be liable for any loss, dispute, or
                    claim arising from unauthorised cash payments or payments
                    made outside approved channels.
                  </li>

                  <li>
                    Users are advised to retain valid proof of payment for all
                    transactions conducted on the Platform.
                  </li>
                </ol>
              </section>

              {/* 7 */}
              <section id="savings" className="mb-12">
                <h3>7. Savings Commitment</h3>

                <ol>
                  <li>
                    Users agree to make savings contributions on a daily,
                    weekly, or monthly basis.
                  </li>

                  <li>
                    A minimum of three (3) consecutive months of consistent
                    savings contributions is required before a user becomes
                    eligible to apply for any financing facility, subject to
                    other platform requirements.
                  </li>

                  <li>
                    The Platform may introduce various savings products,
                    including flexible and locked savings plans, subject to
                    applicable terms.
                  </li>
                </ol>
              </section>

              {/* 8 */}
              <section id="financing" className="mb-12">
                <h3>8. Loan Eligibility and Financing Requirements</h3>

                <h4>8.1 General Loan Access</h4>

                <p>Access to financing is subject to:</p>

                <ul>
                  <li>
                    Completion of the minimum savings duration requirement;
                  </li>

                  <li>Consistent contribution records;</li>

                  <li>
                    Internal credit and risk assessment approval; and
                  </li>

                  <li>Compliance with all Platform policies.</li>
                </ul>

                <h4>8.2 Mobility Financing (Hire Purchase)</h4>

                <ol>
                  <li>
                    Users seeking vehicle financing must contribute at least ten
                    percent (10%) of the value of the intended vehicle.
                  </li>

                  <li>
                    The Platform may finance up to ninety percent (90%) of the
                    vehicle value, subject to approval.
                  </li>

                  <li>
                    Ownership of financed vehicles shall remain with
                    CirclesFundMe or its financing partner until full repayment
                    of all obligations.
                  </li>
                </ol>

                <h4>8.3 SME Inventory Financing</h4>

                <p>
                  Eligible users may access inventory financing based on their
                  savings history, repayment capacity, contribution consistency,
                  and internal credit evaluation.
                </p>
              </section>

              {/* 9 */}
              <section id="tracking" className="mb-12">
                <h3>9. Tracking and Monitoring of Financed Vehicles</h3>

                <ol>
                  <li>
                    All financed commercial vehicles shall be fitted with
                    approved tracking devices.
                  </li>

                  <li>
                    Users expressly consent to the installation, monitoring, and
                    use of tracker-generated data for operational, repayment,
                    and compliance purposes.
                  </li>

                  <li>
                    The tracker may transmit operational alerts whenever the
                    financed vehicle operates for between eight (8) and twelve
                    (12) hours within a day or week.
                  </li>

                  <li>
                    Tracker data may be used by the Platform to determine
                    repayment obligations and compliance status.
                  </li>

                  <li>
                    Users shall not tamper with, disable, remove, or damage
                    tracking devices installed on financed assets.
                  </li>
                </ol>
              </section>

              {/* 10 */}
              <section id="repayment" className="mb-12">
                <h3>10. Repayment Obligations</h3>

                <ol>
                  <li>
                    Users shall make repayments in accordance with the agreed
                    repayment schedule under their financing arrangement.
                  </li>

                  <li>
                    Upon receipt of an operational alert generated by the
                    tracker, the user shall make the applicable daily or weekly
                    instalment repayment.
                  </li>

                  <li>
                    Repayments must be made through approved payment channels
                    only.
                  </li>

                  <li>
                    Failure to make due repayments constitutes a default under
                    these Terms and Conditions.
                  </li>
                </ol>
              </section>

              {/* 11 */}
              <section id="defaults" className="mb-12">
                <h3>11. Operating Hours, Contribution Defaults, and Penalties</h3>

                <h4>11.1 Operating Hours Requirement</h4>

                <ol>
                  <li>
                    Where tracker records indicate that a financed vehicle
                    failed to achieve at least twenty percent (20%) of the
                    expected operating hours within a day or week, the user may
                    not be required to make the corresponding instalment
                    repayment for that specific period.
                  </li>

                  <li>
                    However, the user shall pay a default fee equivalent to ten
                    percent (10%) of the applicable repayment amount.
                  </li>
                </ol>

                <h4>11.2 Late Contribution Fee</h4>

                <ol>
                  <li>
                    Users who fail to make scheduled savings contributions after
                    reminders and beyond a twenty-four (24) hour grace period
                    shall incur a penalty ranging from ₦200 to ₦1,000.
                  </li>
                </ol>

                <h4>11.3 Loan Repayment Default</h4>

                <ol>
                  <li>
                    Users who fail to make loan repayments when due shall incur
                    a default fee equivalent to ten percent (10%) of the missed
                    repayment amount.
                  </li>

                  <li>
                    Continued default may result in additional recovery
                    measures, including repossession of financed assets,
                    suspension of services, or legal action.
                  </li>
                </ol>
              </section>

              {/* 12 */}
              <section id="group" className="mb-12">
                <h3>12. Group Guarantee Model</h3>

                <ol>
                  <li>
                    Users may be required to form or join a group of five (5)
                    individuals comprising friends, colleagues, neighbours, or
                    business associates within the same market cluster.
                  </li>

                  <li>
                    Where one group member accesses financing, the remaining
                    four (4) members shall serve as guarantors.
                  </li>

                  <li>
                    The Platform may place a lien on guarantors’ savings
                    contributions until the financed obligation has been fully
                    repaid.
                  </li>

                  <li>
                    Group members collectively share responsibility for loan
                    performance and repayment compliance.
                  </li>
                </ol>
              </section>

              {/* 13 */}
              <section id="withdrawals" className="mb-12">
                <h3>13. Withdrawals</h3>

                <h4>13.1 Withdrawal Charges</h4>

                <p>
                  All withdrawals shall attract a processing fee of ₦500.
                </p>

                <h4>13.2 Withdrawal Limits</h4>

                <ol>
                  <li>
                    Users may withdraw up to twenty percent (20%) of their total
                    savings per quarter, subject to system rules and eligibility
                    requirements.
                  </li>

                  <li>
                    Withdrawal requests may be delayed or restricted where the
                    user has outstanding obligations or pledged savings.
                  </li>
                </ol>
              </section>

              {/* 14 */}
              <section id="obligations" className="mb-12">
                <h3>14. User Obligations</h3>

                <p>Users agree to:</p>

                <ol>
                  <li>
                    Operate financed assets responsibly and lawfully;
                  </li>

                  <li>
                    Maintain financed vehicles or inventory in good condition;
                  </li>

                  <li>
                    Provide truthful and accurate information at all times;
                  </li>

                  <li>
                    Promptly notify the Platform of theft, accident, damage, or
                    tracker malfunction;
                  </li>

                  <li>
                    Make all required contributions and repayments on time; and
                  </li>

                  <li>
                    Comply with all applicable laws and Platform policies.
                  </li>
                </ol>
              </section>

              {/* 15 */}
              <section id="prohibited" className="mb-12">
                <h3>15. Prohibited Conduct</h3>

                <p>Users shall not:</p>

                <ol>
                  <li>
                    Tamper with or interfere with any tracking device;
                  </li>

                  <li>
                    Use financed assets for unlawful activities;
                  </li>

                  <li>
                    Falsify records or provide misleading information;
                  </li>

                  <li>
                    Transfer, sell, or assign financed assets without prior
                    written consent from the Platform; or
                  </li>

                  <li>
                    Engage in fraudulent or abusive activities on the Platform.
                  </li>
                </ol>
              </section>

              {/* 16 */}
              <section id="remedies" className="mb-12">
                <h3>16. Default and Remedies</h3>

                <p>
                  The following shall constitute events of default:
                </p>

                <ul>
                  <li>
                    Failure to make required repayments or contributions;
                  </li>

                  <li>Tampering with tracking devices;</li>

                  <li>Fraudulent conduct or misrepresentation;</li>

                  <li>
                    Unauthorized transfer or sale of financed assets; and
                  </li>

                  <li>Persistent breach of Platform policies.</li>
                </ul>

                <p>Upon default, CirclesFundMe reserves the right to:</p>

                <ul>
                  <li>Impose penalties and charges;</li>

                  <li>Suspend or terminate user accounts;</li>

                  <li>Recover financed assets;</li>

                  <li>Place liens on guarantors’ savings;</li>

                  <li>
                    Report defaults to relevant authorities or credit agencies;
                    and
                  </li>

                  <li>
                    Institute legal proceedings where necessary.
                  </li>
                </ul>
              </section>

              {/* 17 */}
              <section id="closure" className="mb-12">
                <h3>17. Account Closure</h3>

                <ol>
                  <li>
                    Users intending to close their accounts must provide at
                    least sixty (60) days’ prior written notice.
                  </li>

                  <li>
                    All outstanding obligations, including loans, penalties, and
                    fees, must be fully settled before account closure is
                    processed.
                  </li>
                </ol>
              </section>

              {/* 18 */}
              <section id="features" className="mb-12">
                <h3>18. Platform Features and Modifications</h3>

                <ol>
                  <li>
                    CirclesFundMe reserves the right to introduce, modify,
                    suspend, or discontinue any feature, savings product, or
                    financing service at its discretion.
                  </li>

                  <li>
                    Users shall be notified of significant changes affecting
                    their participation on the Platform.
                  </li>
                </ol>
              </section>

              {/* 19 */}
              <section id="privacy" className="mb-12">
                <h3>19. Privacy and Data Protection</h3>

                <ol>
                  <li>
                    Users consent to the collection, processing, and storage of
                    personal, financial, and operational data for financing,
                    monitoring, compliance, and service improvement purposes.
                  </li>

                  <li>
                    Data collected may include identification records, repayment
                    history, savings activity, location data, and
                    tracker-generated operational information.
                  </li>

                  <li>
                    CirclesFundMe shall take reasonable measures to protect user
                    information in accordance with applicable laws and
                    regulations.
                  </li>
                </ol>
              </section>

              {/* 20 */}
              <section id="liability" className="mb-12">
                <h3>20. Limitation of Liability</h3>

                <p>
                  CirclesFundMe shall not be liable for losses arising from:
                </p>

                <ul>
                  <li>Vehicle downtime;</li>

                  <li>Accidents or third-party conduct;</li>

                  <li>Technical failures or network interruptions;</li>

                  <li>Unauthorized access to user accounts; or</li>

                  <li>Payments made outside approved channels.</li>
                </ul>

                <p>
                  The Platform does not guarantee uninterrupted or error-free
                  services.
                </p>
              </section>

              {/* 21 */}
              <section id="compliance" className="mb-12">
                <h3>21. Compliance and Integrity</h3>

                <p>
                  Users are expected to maintain honesty, transparency, and
                  integrity in all dealings on the Platform. Any attempt to
                  manipulate records, engage in fraud, or breach Platform rules
                  may result in suspension, termination, or legal action.
                </p>
              </section>

              {/* 22 */}
              <section id="amendments" className="mb-12">
                <h3>22. Amendments</h3>

                <p>
                  CirclesFundMe reserves the right to amend these Terms and
                  Conditions at any time. Continued use of the Platform after
                  amendments have been communicated constitutes acceptance of
                  the revised Terms.
                </p>
              </section>

              {/* 23 */}
              <section id="governing-law" className="mb-12">
                <h3>23. Governing Law and Dispute Resolution</h3>

                <ol>
                  <li>
                    These Terms and Conditions shall be governed by and
                    construed in accordance with the laws of the Federal
                    Republic of Nigeria.
                  </li>

                  <li>
                    Any dispute arising from the use of the Platform shall first
                    be resolved amicably through negotiation.
                  </li>

                  <li>
                    Where amicable resolution fails, disputes shall be submitted
                    to the appropriate courts within the Federal Republic of
                    Nigeria.
                  </li>
                </ol>
              </section>

              {/* 24 */}
              <section id="acceptance" className="mb-12">
                <h3>24. Acceptance</h3>

                <p>
                  By registering on and using the CirclesFundMe Platform, users
                  acknowledge that they have read, understood, and agreed to be
                  bound by these Terms and Conditions.
                </p>

                <p>
                  For inquiries or support, users may contact:
                </p>

                <div className="mt-4 space-y-1">
                  <p>
                    Email:{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-primary underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </p>

                  <p>
                    Website:{" "}
                    <a
                      href={WEBSITE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      {WEBSITE_URL}
                    </a>
                  </p>
                </div>

                <p className="mt-8 italic text-sm text-gray-500">
                  {DATA_CONTROLLER}
                  <br />
                  Management
                </p>
              </section>
            </article>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default TermsAndConditions;