import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">Refund Policy</h1>
        <p className="mb-4">
          Thank you for shopping with FreshFleet. If you are not entirely satisfied with your purchase, we're here to help. Our goal is to ensure that every customer receives the freshest products and has a smooth shopping experience. Please review the following policy regarding refunds.
        </p>

        <h2 className="text-2xl font-semibold mt-4">1. Refunds</h2>
        <p className="mb-4">
          Refunds will only be processed if the item is returned in its original condition. FreshFleet reserves the right to inspect the product before granting a refund. Items that show signs of usage or damage may not be eligible for a refund.
        </p>

        <h2 className="text-2xl font-semibold mt-4">2. Eligibility for Refunds</h2>
        <p className="mb-4">
          To be eligible for a refund, you must meet the following criteria:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>The product must have been purchased within the last 7 days.</li>
          <li>The product must be unused, unaltered, and in the same condition you received it.</li>
          <li>The product must be in the original packaging.</li>
          <li>Proof of purchase or order receipt is required.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">3. Non-Refundable Items</h2>
        <p className="mb-4">
          Certain items are non-refundable, including:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Perishable goods such as fresh fruits, vegetables, dairy products, and meats.</li>
          <li>Items on sale or purchased with a discount coupon or special offer.</li>
          <li>Gift cards or vouchers.</li>
          <li>Any item that has been opened or partially consumed.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">4. Refund Process</h2>
        <p className="mb-4">
          To request a refund, please follow these steps:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Contact us via email at <a href="mailto:shop.freshfleet@gmail.com" className="text-green-600 hover:underline">shop.freshfleet@gmail.com</a> or call us at <a href="tel:9489483316" className="text-green-600 hover:underline">9489483316</a>.</li>
          <li>Provide details of your order and the reason for the refund request.</li>
          <li>Ship the product back to our designated return center (shipping costs may apply unless the product was damaged or defective).</li>
          <li>Once we receive and inspect the product, we will notify you of the refund status.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">5. Refund Timeline</h2>
        <p className="mb-4">
          Refunds will be processed within 7-10 business days after the item is received and inspected. Depending on your payment method, the refund may take additional time to reflect in your account. Refunds will be credited to the original payment method used during the purchase.
        </p>

        <h2 className="text-2xl font-semibold mt-4">6. Exchanges</h2>
        <p className="mb-4">
          If you received a damaged or defective product, we offer an exchange at no extra cost. Please notify us within 48 hours of receiving the product for exchange eligibility. Contact our support team for more information.
        </p>

        <h2 className="text-2xl font-semibold mt-4">7. Late or Missing Refunds</h2>
        <p className="mb-4">
          If you haven’t received a refund within the stated timeline, first check your bank account again. Then, contact your credit card company, as it may take some time before the refund is officially posted. If you have done all of this and still have not received your refund, please contact us at <a href="mailto:shop.freshfleet@gmail.com" className="text-green-600 hover:underline">shop.freshfleet@gmail.com</a>.
        </p>

        <h2 className="text-2xl font-semibold mt-4">8. Shipping Returns</h2>
        <p className="mb-4">
          You will be responsible for paying for your own shipping costs when returning items unless the product is defective or damaged. Shipping costs are non-refundable.
        </p>

        <h2 className="text-2xl font-semibold mt-4">9. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about our Refund Policy, please contact us:
        </p>
        <ul className="list-disc ml-6">
          <li>Email: <a href="mailto:shop.freshfleet@gmail.com" className="text-green-600 hover:underline">shop.freshfleet@gmail.com</a></li>
          <li>Phone: <a href="tel:9489483316" className="text-green-600 hover:underline">9489483316</a></li>
        </ul>
      </div>
    </div>
  );
};

export default RefundPolicy;
