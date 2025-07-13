import Image from "next/image";
import Header from "@/components/website-ui/header";
import Footer from "@/components/website-ui/footer";
import Breadcrumb from "@/components/website-ui/breadcrumb";
import { Button } from "@/components/ui/button";

export default function MonthlySchemePage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Schemes", href: "#" },
    { label: "Monthly Scheme", href: "/schemes/monthly" },
  ];

  const eligibilityRequirements = [
    "You must have participated in the CirclesFundMe Monthly Contribution Scheme for at least three months.",
    "You should provide proof of employment for a minimum of six months.",
    "A good credit history is required.",
    "The loan repayment will be done via direct debit from your salary account.",
    "Post-dated cheques may be accepted as collateral for the loan.",
  ];

  const loanTerms = [
    "The loan incurs a management fee of 4% per annum.",
    "The repayment duration is twelve months, using your monthly contributions.",
    "There is a monthly membership fee of N2500.",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb items={breadcrumbItems} />

      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Monthly Scheme
              </h1>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Are you a salaried employee?</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-4">
                If so, the CirclesFundme Monthly Contribution Scheme may be the
                perfect fit for you. This scheme is designed specifically for
                individuals with a steady monthly income who are looking for a
                personal loan.
              </p>

              <p className="text-gray-600 leading-relaxed">
                With this scheme, you can borrow up to 12 times your monthly
                contribution as your personal loan.
              </p>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="relative z-10">
                <Image
                  src="/assets/images/surprised-man-m money-phone.jpg"
                  alt="Happy employee"
                  width={400}
                  height={500}
                  className="rounded-lg w-full h-auto"
                  priority
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-primary/10 rounded-lg -z-10"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 mb-12">
            <div className="bg-primary/5 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Eligibility Requirements
              </h2>
              <div className="space-y-4">
                {eligibilityRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 text-primary rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {requirement}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Terms of the Personal Capital Loan
              </h2>
              <div className="space-y-4">
                {loanTerms.map((term, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 text-primary rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {term}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-6">
              If you meet these criteria and are ready to achieve your financial
              goals, consider signing up for the CirclesFundme Monthly
              Contribution Scheme!
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
              Get Started
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
