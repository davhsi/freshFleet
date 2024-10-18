import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-6 text-lg">
          At FreshFleet, we take your privacy very seriously. This Privacy Policy describes how we collect, use, and protect your personal data when you use our website and services. By accessing FreshFleet, you agree to the terms outlined below.
        </p>

        <h2 className="text-3xl font-semibold mt-8">1. Information We Collect</h2>
        <p className="mb-6 text-lg">
          FreshFleet collects personal information from you when you interact with our services. This may include but is not limited to:
        </p>
        <ul className="list-disc ml-8 mb-6 text-lg">
          <li>Your name, email address, phone number, and shipping address when you create an account or place an order.</li>
          <li>Transaction details such as products purchased, date and time of purchase, and payment methods.</li>
          <li>Information collected automatically via cookies and other tracking technologies, including IP addresses, browser types, and browsing behaviors.</li>
          <li>Feedback and reviews you provide about our products or services.</li>
        </ul>

        <h2 className="text-3xl font-semibold mt-8">2. How We Use Your Information</h2>
        <p className="mb-6 text-lg">
          The information we collect from you is used to:
        </p>
        <ul className="list-disc ml-8 mb-6 text-lg">
          <li>Process and fulfill your orders, including sending you notifications and updates about your order status.</li>
          <li>Improve customer service by responding to your requests more efficiently.</li>
          <li>Send periodic emails with updates, promotions, or news related to FreshFleet (if you've opted in).</li>
          <li>Analyze site traffic and user behavior to improve the user experience and optimize our website.</li>
          <li>Ensure the security of our website and your account.</li>
        </ul>

        <h2 className="text-3xl font-semibold mt-8">3. Information Sharing</h2>
        <p className="mb-6 text-lg">
          FreshFleet does not sell or trade your personal data. However, we may share your data with:
        </p>
        <ul className="list-disc ml-8 mb-6 text-lg">
          <li>Third-party service providers, such as payment processors and delivery partners, to complete transactions and deliver orders.</li>
          <li>Legal authorities, if required by law or to protect the rights, property, or safety of FreshFleet, our users, or the public.</li>
          <li>Marketing partners, but only with your consent, to offer promotions or content tailored to your preferences.</li>
        </ul>

        <h2 className="text-3xl font-semibold mt-8">4. Data Security</h2>
        <p className="mb-6 text-lg">
          FreshFleet uses a variety of security measures to protect your personal information. This includes encrypted communication, secure data storage, and strict access controls to safeguard your data against unauthorized access, loss, or misuse.
        </p>
        <p className="mb-6 text-lg">
          While we take these precautions, please be aware that no online system is completely secure. We cannot guarantee the absolute security of your information.
        </p>

        <h2 className="text-3xl font-semibold mt-8">5. Cookies and Tracking Technologies</h2>
        <p className="mb-6 text-lg">
          Our website uses cookies and similar tracking technologies to enhance your experience, gather analytics, and improve the functionality of our services. Cookies help us remember your preferences, tailor content, and monitor site performance.
        </p>
        <p className="mb-6 text-lg">
          You can disable cookies in your browser settings, but this may limit some features of the website.
        </p>

        <h2 className="text-3xl font-semibold mt-8">6. Third-Party Links</h2>
        <p className="mb-6 text-lg">
          FreshFleet may include links to third-party websites, plugins, and services that are not controlled by us. Clicking on these links may allow third parties to collect data about you. Please note that we are not responsible for the privacy practices of such third parties.
        </p>

        <h2 className="text-3xl font-semibold mt-8">7. Children's Privacy</h2>
        <p className="mb-6 text-lg">
          FreshFleet does not knowingly collect or solicit personal information from children under the age of 13. If you believe we have inadvertently collected information from a child under 13, please contact us immediately, and we will take steps to remove the data.
        </p>

        <h2 className="text-3xl font-semibold mt-8">8. Your Data Rights</h2>
        <p className="mb-6 text-lg">
          Depending on your location, you may have the right to:
        </p>
        <ul className="list-disc ml-8 mb-6 text-lg">
          <li>Request access to the personal data we hold about you.</li>
          <li>Request that we correct any inaccuracies in your personal information.</li>
          <li>Request the deletion of your personal information, subject to certain legal obligations.</li>
          <li>Opt out of marketing communications at any time.</li>
        </ul>
        <p className="mb-6 text-lg">
          To exercise these rights, please contact us at <a href="mailto:shop.freshfleet@gmail.com" className="text-green-600 hover:underline">shop.freshfleet@gmail.com</a>.
        </p>

        <h2 className="text-3xl font-semibold mt-8">9. Changes to This Policy</h2>
        <p className="mb-6 text-lg">
          FreshFleet reserves the right to update this Privacy Policy at any time. Any changes will be posted on this page, and we encourage you to review it periodically to stay informed about how we protect your information.
        </p>

        <h2 className="text-3xl font-semibold mt-8">10. Contact Us</h2>
        <p className="mb-6 text-lg">
          If you have any questions or concerns about this Privacy Policy, feel free to reach out to us at:
        </p>
        <ul className="list-disc ml-8 text-lg">
          <li>Email: <a href="mailto:shop.freshfleet@gmail.com" className="text-green-600 hover:underline">shop.freshfleet@gmail.com</a></li>
          <li>Phone: <a href="tel:9489483316" className="text-green-600 hover:underline">9489483316</a></li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
