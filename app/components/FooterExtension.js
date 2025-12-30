"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { 
  FaCcVisa, 
  FaCcMastercard, 
  FaCcApplePay, 
  FaCcPaypal, 
  FaStripe,
  FaDhl,
  FaShieldAlt,
  FaLock
} from 'react-icons/fa';
import { SiKlarna } from 'react-icons/si';

const FooterExtension = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="footer-extension bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Service */}
          <div className="footer-extension-column">
            <button
              onClick={() => toggleSection('service')}
              className="footer-extension-header md:cursor-default w-full flex items-center justify-between md:block text-left"
            >
              <h3 className="font-light text-xl text-gray-900">Service</h3>
              <span className="md:hidden">
                {openSection === 'service' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            <div className={`footer-extension-content ${openSection === 'service' ? 'open' : ''}`}>
              <ul className="space-y-2 text-sm text-gray-600 mt-4">
                <li>
                  <Link href="/returns" className="hover:text-gray-900 transition">
                    Retourenlabel
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Sichere Zahlung */}
          <div className="footer-extension-column">
            <button
              onClick={() => toggleSection('payment')}
              className="footer-extension-header md:cursor-default w-full flex items-center justify-between md:block text-left"
            >
              <h3 className="font-light text-xl text-gray-900">Sichere Zahlung</h3>
              <span className="md:hidden">
                {openSection === 'payment' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            <div className={`footer-extension-content ${openSection === 'payment' ? 'open' : ''}`}>
              <div className="flex flex-wrap gap-3 mt-4 items-center">
                <FaCcVisa 
                  size={40} 
                  className="text-[#1A1F71] opacity-80 hover:opacity-100 transition" 
                  title="Visa"
                />
                <FaCcMastercard 
                  size={40} 
                  className="text-[#EB001B] opacity-80 hover:opacity-100 transition" 
                  title="Mastercard"
                />
                <FaCcApplePay 
                  size={40} 
                  className="text-gray-800 opacity-80 hover:opacity-100 transition" 
                  title="Apple Pay"
                />
                <FaCcPaypal 
                  size={40} 
                  className="text-[#003087] opacity-80 hover:opacity-100 transition" 
                  title="PayPal"
                />
                <SiKlarna 
                  size={32} 
                  className="text-[#FFB3C7] opacity-80 hover:opacity-100 transition" 
                  title="Klarna"
                />
                <FaStripe 
                  size={40} 
                  className="text-[#635BFF] opacity-80 hover:opacity-100 transition" 
                  title="Stripe"
                />
              </div>
            </div>
          </div>

          {/* Column 3: Zuverlässiger Versand */}
          <div className="footer-extension-column">
            <button
              onClick={() => toggleSection('shipping')}
              className="footer-extension-header md:cursor-default w-full flex items-center justify-between md:block text-left"
            >
              <h3 className="font-light text-xl text-gray-900">Zuverlässiger Versand</h3>
              <span className="md:hidden">
                {openSection === 'shipping' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            <div className={`footer-extension-content ${openSection === 'shipping' ? 'open' : ''}`}>
              <div className="flex flex-wrap gap-4 mt-4 items-center">
                <FaDhl 
                  size={50} 
                  className="text-[#FFCC00] opacity-80 hover:opacity-100 transition" 
                  title="DHL"
                />
                <div className="px-3 py-2 bg-[#003E80] text-white text-sm font-bold rounded opacity-80 hover:opacity-100 transition">
                  GLS
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Kundenservice */}
          <div className="footer-extension-column">
            <button
              onClick={() => toggleSection('customer')}
              className="footer-extension-header md:cursor-default w-full flex items-center justify-between md:block text-left"
            >
              <h3 className="font-light text-xl text-gray-900">Kundenservice</h3>
              <span className="md:hidden">
                {openSection === 'customer' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            <div className={`footer-extension-content ${openSection === 'customer' ? 'open' : ''}`}>
              <div className="mt-4 space-y-3">
                {/* Kontakt */}
                <div className="text-sm">
                  <p className="text-gray-600 mb-1">Kontakt</p>
                  <a 
                    href="tel:+4915225179626" 
                    className="text-gray-900 font-medium hover:text-gray-600 transition"
                  >
                    +49 152 251 79 626
                  </a>
                </div>
                
                {/* Links */}
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <a href="mailto:info@manfredzak.com" className="hover:text-gray-900 transition">
                      info@manfredzak.com
                    </a>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-gray-900 transition">
                      Häufige Fragen
                    </Link>
                  </li>
                </ul>

                {/* Trust Badges */}
                <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200 items-center">
                  <div className="flex items-center gap-1 text-green-600" title="Sicher einkaufen">
                    <FaShieldAlt size={24} />
                    <span className="text-xs font-medium">Sicher</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600" title="SSL verschlüsselt">
                    <FaLock size={20} />
                    <span className="text-xs font-medium">SSL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FooterExtension;