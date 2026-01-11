import Header from "@/components/website-ui/header";
import HeroSection from "@/components/website-ui/hero-section";
import LoanCalculatorSection from "@/components/website-ui/loan-calculator-section";
import WhatWeProvideSection from "@/components/website-ui/what-we-provide-section";
import WhyChooseUsSection from "@/components/website-ui/why-choose-us-section";
import HowItWorksSection from "@/components/website-ui/how-it-works-section";
import TestimonialsSection from "@/components/website-ui/testimonials-section";
import FAQSection from "@/components/website-ui/faq-section";
import CTASection from "@/components/website-ui/cta-section";
import Footer from "@/components/website-ui/footer";
import CompanyLicense from "@/components/website-ui/companylicense";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <LoanCalculatorSection />
      <WhatWeProvideSection />
      <HowItWorksSection />
      <CompanyLicense/>
      <WhyChooseUsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
