import Image from "next/image"
import Header from "@/components/website-ui/header"
import Footer from "@/components/website-ui/footer"
import Breadcrumb from "@/components/website-ui/breadcrumb"
import { Button } from "@/components/ui/button"

export default function WeeklySchemePage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Schemes", href: "#" },
    { label: "Weekly Scheme", href: "/schemes/weekly" },
  ]

  const eligibilityRequirements = [
    "Participation in the CirclesFundMe Weekly Contribution Scheme for at least three months.",
    "Proof of a physical business premises.",
    "A good credit history.",
    "A direct debit setup for your corporate account.",
    "A corporate account demonstrating weekly sales revenue of at least five times your weekly contribution for at least one month.",
    "Ownership of collateral, such as a shop or store in a market, which can be used as collateral against deliberate default in repayment.",
  ]

  const loanTerms = [
    "A loan management fee of 4% per annum.",
    "The repayment duration is 52 weeks, utilizing your weekly contributions.",
    "A monthly membership fee of N2500 applies.",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb items={breadcrumbItems} />

      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6 font-outfit">Weekly Scheme</h1>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 font-outfit">
                    Are you a business owner in need of a working capital loan to expand your operations?
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 font-outfit">Do you have a consistent daily or weekly sales revenue stream?</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-4 font-outfit">
                If so, the CirclesFundme Weekly Contribution Scheme is designed specifically for MSME operators like you
                who have regular revenues.
              </p>

              <p className="text-gray-600 leading-relaxed font-outfit">
                By signing up for the CirclesFundme Weekly Contribution Scheme, you can access a loan amount of up to 52
                times your weekly contributions as working capital.
              </p>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="relative z-10">
                <Image
                  src="/assets/images/happy-woman.jpg"
                  alt="Happy customers"
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
              <h2 className="text-xl font-semibold text-gray-900 mb-6 font-outfit">Eligibility Requirements</h2>
              <div className="space-y-4">
                {eligibilityRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 text-primary rounded-full flex items-center justify-center text-base font-bold flex-shrink-0 mt-0.5">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{requirement}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 font-outfit">Terms of the Working Capital Loan</h2>
              <div className="space-y-4">
                {loanTerms.map((term, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 text-primary rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{term}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-6 font-outfit">
              If you meet these criteria and are ready to take your business to the next level, consider signing up
              for the CirclesFundme Weekly Contribution Scheme!
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">Get Started</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
