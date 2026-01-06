import Link from "next/link";
import { Facebook, Twitter, Instagram, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Image
                src="/assets/images/logo-white.png"
                alt="logo"
                width={200}
                height={80}
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm font-outfit">
              CirclesFundMe is a fully licensed, innovative, registered
              cooperative society providing the best financial services.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white font-outfit">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Daily Contribution", href: "/schemes/daily" },
                { label: "Weekly Contribution", href: "/schemes/weekly" },
                { label: "Monthly Contribution", href: "/schemes/monthly" },
                { label: "Auto Finance Contribution", href: "/schemes/auto-finance" },
                { label: "Tricycle Finance Contribution", href: "/schemes/tricycle-finance" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-primary transition-colors font-outfit"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white font-outfit">
              Socials
            </h3>
            <ul className="space-y-2 text-sm">
              {["Facebook", "Twitter", "WhatsApp", "Instagram"].map((social) => (
                <li key={social}>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-primary transition-colors font-outfit"
                  >
                    {social}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white font-outfit">
              Contact
            </h3>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-white flex-shrink-0" />
                <span className="font-outfit">+234 703 331 9394</span>
              </div>

              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-white flex-shrink-0" />
                <span className="font-outfit">+234 805 535 7592</span>
              </div>

              <div className="flex items-start text-gray-300 font-outfit">
                <MapPin className="h-4 w-4 mr-3 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <p>Address</p>
                  <p>Road 116, House 8, Gwarimpa, Abuja, Nigeria</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-white mb-3 font-outfit">
                Licensed by
              </p>

              <div className="flex items-center gap-4">
                <Image
                  src="/assets/logo/ndpr.png"
                  alt="NDPR"
                  width={60}
                  height={50}
                  className="object-contain"
                />
                <Image
                  src="/assets/logo/fccpc.png"
                  alt="FCCPC"
                  width={60}
                  height={50}
                  className="object-contain"
                />
                <Image
                  src="/assets/logo/duns.png"
                  alt="DUNS"
                  width={60}
                  height={50}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0 font-outfit">
              © {currentYear} CirclesFundMe. All rights reserved.
            </div>

            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
