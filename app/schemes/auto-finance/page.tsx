import Image from "next/image";
import Header from "@/components/website-ui/header";
import Footer from "@/components/website-ui/footer";
import Breadcrumb from "@/components/website-ui/breadcrumb";
import { Button } from "@/components/ui/button";

export default function AutoFinancePage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Schemes", href: "#" },
    { label: "Auto Finance", href: "/schemes/auto-finance" },
  ];

  const eligibilityRequirements = [
    "To participate in the CirclesFundme Auto Finance Contribution Savings Linked Auto Finance Scheme, you must save a minimum of ₦50,000 weekly or monthly towards your auto finance scheme.",
    "You must be a member for at least three months and meet the 10% down payment requirement to access our auto finance scheme.",
    "A good credit history is necessary.",
    "Direct debit from your corporate or personal account is required.",
    "Post-dated cheques will be accepted to cover future installments.",
  ];

  const loanCoverage = [
    "One brand new or foreign-used vehicle.",
    "Four years of comprehensive insurance.",
    "One additional engine.",
    "Two complete sets of tires.",
  ];

  const loanTerms = [
    "Access to a 90% auto finance loan.",
    "An annual loan management fee of 4%.",
    "An auto finance loan repayment duration of 208 weeks (4 years).",
    "A monthly membership fee ranging starting at ₦2,500, depending on the amount of the work loan a member is seeking to access.",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb items={breadcrumbItems} />

      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6 font-outfit">
                Auto Finance Scheme
              </h1>

              <p className="text-gray-600 leading-relaxed mb-4 font-outfit">
                Are you in need of a vehicle for commercial or personal use?
              </p>

              <p className="text-gray-600 leading-relaxed font-outfit">
                With the CirclesFundme Auto Finance Contribution Scheme, you can access up to 90% financing for purchasing a vehicle after
                providing a 10% down payment, which is required to qualify for
                the loan.
              </p>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="relative z-10">
                <Image
                  src="/assets/images/cheerful-man-car.jpg"
                  alt="Happy driver"
                  width={400}
                  height={500}
                  className="rounded-lg w-full h-auto"
                  priority
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-primary/10 rounded-lg -z-10"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-primary/5 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 font-outfit">
                Eligibility Requirements
              </h2>
              <div className="space-y-4">
                {eligibilityRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6  text-primary  flex items-center justify-center text-base font-bold flex-shrink-0 mt-0.5 font-outfit">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed mt-0.5 font-outfit">
                      {requirement}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 font-outfit">
                What the CirclesFundme Auto Finance Loan Will Cover
              </h2>
              <div className="space-y-4">
                {loanCoverage.map((coverage, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6  text-primary  flex items-center justify-center text-base font-bold flex-shrink-0 mt-0.5 font-outfit">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mt-1 font-outfit">
                      {coverage}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg p-6 mb-12">
            <h2 className="text-xl font-outfit font-semibold text-gray-900 mb-6">
              Terms of the CirclesFundme Auto Finance Contribution Scheme
            </h2>
            <div className="space-y-4">
              {loanTerms.map((term, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6  text-primary flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 font-outfit">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mt-1 font-outfit">
                    {term}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-6 font-outfit">
              If you meet these criteria and are ready to take your business to
              the next level, consider signing up for the CirclesFundme Auto
              Finance Contribution Scheme!
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
