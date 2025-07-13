import Header from "@/components/website-ui/header";
import Footer from "@/components/website-ui/footer";
import Breadcrumb from "@/components/website-ui/breadcrumb";
import TestimonialsSection from "@/components/website-ui/testimonials-section";
import Image from "next/image";

export default function AboutPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
  ];

  const stats = [
    { value: "99%", label: "We Approve Loans" },
    { value: "89%", label: "Customers Satisfaction" },
    { value: "1,567", label: "Loans Since Inception" },
    { value: "1,534", label: "Happy Customers" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb items={breadcrumbItems} />

      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Helping Your Money To Go Further
              </h1>

              <div className="space-y-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-lg">
                    Are you a business owner in need of a working capital loan
                    to expand your operations?
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-lg">
                    Do you have a consistent daily or weekly sales revenue
                    stream?
                  </p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg">
                If so, the CirclesFundme Weekly Contribution Scheme may be
                perfect for you. This scheme is designed specifically for MSME
                operators like you who have regular revenues.
              </p>

              <p className="text-gray-600 leading-relaxed text-lg">
                By signing up for the CirclesFundme Weekly Contribution Scheme,
                you can access a loan amount of up to 52 times your weekly
                contributions as working capital.
              </p>
            </div>

            <Image
              src="/assets/images/smiling-man.png"
              alt="Happy customer giving thumbs up"
              width={400}
              height={400}
              className="rounded-lg w-full h-auto"
            />
          </div>

          <div className="bg-primary rounded-lg p-12 mb-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center text-white">
                  <div className="text-3xl lg:text-4xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm lg:text-base opacity-90">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
}
