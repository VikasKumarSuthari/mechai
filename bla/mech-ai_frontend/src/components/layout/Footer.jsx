import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = {
    product: [
      { name: 'Features', path: '/features' },
      { name: 'How it Works', path: '/works' },
      { name: 'Mobile App', path: '/mobile' },
      { name: 'FAQ', path: '/faq' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Testimonials', path: '/testimonials' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
  };

  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <img 
                src="./src/assets/LogoT.png" 
                alt="MechAI Logo" 
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">MechAI</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Empowering businesses with intelligent automation solutions for the future.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} MechAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;