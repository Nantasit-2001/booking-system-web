// components/Footer.tsx
import Link from 'next/link';
import { NAV_LINKS, CONTACT_INFO, HOTEL_INFO } from '@/lib/constants';
const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-[#221f31] text-white py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Section 1: Hotel Info */}
        <div className="flex flex-col items-center md:items-start border-b pb-2 border-gray-800 md:border-0">
          <Link href="/" className="text-xl xl:text-2xl font-bold text-white flex items-center mb-4">
            <span className="material-icons mr-2 ">🏨</span>
            {HOTEL_INFO.name}
          </Link>
          <p className="text-gray-300 text-sm">
            {HOTEL_INFO.slogan}
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div className='border-b pb-2 border-gray-800 md:border-0'>
          <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Quick Links</h3>
          <ul className="space-y-2 text-center md:text-left">
            {NAV_LINKS.quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Support */}
        <div className='border-b pb-2 border-gray-800 md:border-0'>
          <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Support</h3>
          <ul className="space-y-2 text-center md:text-left">
            {NAV_LINKS.supportLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4: Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Contact Info</h3>
          <ul className="space-y-2 text-center md:text-left ">
            <li>
              <a href={`tel:${CONTACT_INFO.phone}`} className="text-center text-gray-300 hover:text-white transition-colors duration-200 text-[14px]">
                <span className="material-icons mr-2 text-base">📞</span>
                {CONTACT_INFO.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_INFO.email}`} className="text-center text-gray-300 hover:text-white transition-colors duration-200 text-[13.2px] xl:text-base">
                <span className="material-icons mr-2 ">📧</span>
                {CONTACT_INFO.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
        &copy; {HOTEL_INFO.copyrightYear} {HOTEL_INFO.name}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;