import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, DollarSign, TrendingUp, Shield } from "lucide-react"

interface Service {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
}

interface ServicesSectionProps {
  title?: string
  subtitle?: string
  services?: Service[]
}

export default function ServicesSection({
  title = "Our Services",
  subtitle = "Comprehensive financial solutions tailored to your needs",
  services,
}: ServicesSectionProps) {
  const defaultServices: Service[] = [
    {
      icon: <DollarSign className="h-8 w-8 text-emerald-600" />,
      title: "Personal Finance",
      description: "Manage your personal finances with our expert guidance and tools.",
      features: ["Budget Planning", "Investment Advice", "Debt Management", "Savings Goals"],
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-emerald-600" />,
      title: "Investment Planning",
      description: "Grow your wealth with strategic investment planning and portfolio management.",
      features: ["Portfolio Analysis", "Risk Assessment", "Market Research", "Performance Tracking"],
    },
    {
      icon: <Shield className="h-8 w-8 text-emerald-600" />,
      title: "Insurance Services",
      description: "Protect your assets and loved ones with comprehensive insurance solutions.",
      features: ["Life Insurance", "Health Coverage", "Property Protection", "Business Insurance"],
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-emerald-600" />,
      title: "Financial Consulting",
      description: "Get expert advice on complex financial decisions and strategies.",
      features: ["Tax Planning", "Retirement Planning", "Estate Planning", "Business Finance"],
    },
  ]

  const servicesToRender = services || defaultServices

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesToRender.map((service, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <CardTitle className="text-xl font-semibold text-gray-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-gray-600 mb-4 text-center">{service.description}</CardDescription>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-emerald-600 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
