import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface BreadcrumbProps {
  items: Array<{
    label: string
    href: string
  }>
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="border-b font-outfit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm">
          <ChevronLeft className="w-4 h-4 text-gray-400" />
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <span className="text-gray-400 mx-2 font-outfit">/</span>}
              <Link
                href={item.href}
                className={`${
                  index === items.length - 1 ? "text-primary font-medium" : "text-gray-600 hover:text-primary"
                } transition-colors font-outfit`}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
