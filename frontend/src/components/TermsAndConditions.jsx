import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
        <p className="mb-4">
          Welcome to FreshFleet! These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-2xl font-semibold mt-4">1. Introduction</h2>
        <p className="mb-4">
          By accessing or using FreshFleet, you accept and agree to be bound by these Terms and Conditions. If you do not agree with any part of the terms, you may not use our services.
        </p>

        <h2 className="text-2xl font-semibold mt-4">2. Intellectual Property Rights</h2>
        <p className="mb-4">
          Unless otherwise stated, FreshFleet and/or its licensors own the intellectual property rights for all material on this website. You may view, download (for caching purposes only), and print pages or other content for your personal use, subject to the restrictions outlined in these terms.
        </p>

        <h2 className="text-2xl font-semibold mt-4">3. User Conduct</h2>
        <p className="mb-4">
          You agree to use FreshFleet only for lawful purposes. You must not use the website in any way that causes damage to the site or impairs its availability or accessibility. Harassment, defamation, or any activity that violates local, national, or international law is strictly prohibited.
        </p>

        <h2 className="text-2xl font-semibold mt-4">4. Orders and Payments</h2>
        <p className="mb-4">
          By placing an order on FreshFleet, you confirm that the information you provide is accurate and complete. Prices for products are subject to change at any time, and we reserve the right to modify or discontinue any product without notice. Payment must be received before we dispatch your order.
        </p>

        <h2 className="text-2xl font-semibold mt-4">5. Cancellations and Refunds</h2>
        <p className="mb-4">
          You may cancel your order within 24 hours of placing it. After this time, orders cannot be canceled or modified. For details regarding refunds, please refer to our <a href="/refund-policy" className="text-green-600 hover:underline">Refund Policy</a>.
        </p>

        <h2 className="text-2xl font-semibold mt-4">6. Limitation of Liability</h2>
        <p className="mb-4">
          FreshFleet will not be liable for any direct, indirect, or consequential damages arising out of the use or inability to use our services. Our liability is limited to the maximum extent permitted by applicable law.
        </p>

        <h2 className="text-2xl font-semibold mt-4">7. Privacy Policy</h2>
        <p className="mb-4">
          Your privacy is important to us. Please review our <a href="/privacy-policy" className="text-green-600 hover:underline">Privacy Policy</a> to understand how we collect, use, and protect your personal information.
        </p>

        <h2 className="text-2xl font-semibold mt-4">8. Termination</h2>
        <p className="mb-4">
          We may terminate or suspend your access to FreshFleet at any time, without prior notice or liability, for any reason whatsoever, including but not limited to a breach of these Terms and Conditions.
        </p>

        <h2 className="text-2xl font-semibold mt-4">9. Changes to the Terms</h2>
        <p className="mb-4">
          FreshFleet reserves the right to revise these terms and conditions at any time. By using this website, you agree to be bound by the most current version of these Terms and Conditions.
        </p>

        <h2 className="text-2xl font-semibold mt-4">10. Governing Law</h2>
        <p className="mb-4">
          These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </p>

        <h2 className="text-2xl font-semibold mt-4">11. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns regarding these Terms and Conditions, please feel free to contact us at:
        </p>
        <ul className="list-disc ml-6">
          <li>Email: <a href="mailto:shop.freshfleet@gmail.com" className="text-green-600 hover:underline">shop.freshfleet@gmail.com</a></li>
          <li>Phone: <a href="tel:9489483316" className="text-green-600 hover:underline">9489483316</a></li>
        </ul>
      </div>
    </div>
  );
};

export default TermsAndConditions;
