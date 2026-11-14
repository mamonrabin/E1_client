
import PageSection from "@/src/utilits/PageSection";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Order Policy | SOZA",
  description:
    "Read SOZA's order policy to learn about ordering, confirmation, payment, shipping, delivery, and cancellations.",
};

const PolicySection = ({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="space-y-3">
    <h2 className="text-lg font-semibold text-[#202020] sm:text-xl">
      {number}. {title}
    </h2>
    <div className="space-y-3 text-sm leading-7 text-gray-600 sm:text-base">
      {children}
    </div>
  </section>
);

const PolicyList = ({ items }: { items: string[] }) => (
  <ul className="list-disc space-y-2 pl-6 marker:text-[#087096]">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

const OrderPolicyPage = () => {
  return (
    <main>
      <PageSection second="Order Policy" />

      <div className="Container px-4 py-8 sm:px-6 lg:px-16 lg:py-12">
        <article className="mx-auto max-w-5xl">
          {/* Page Header */}
          <div className="mb-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="text-[#087096]">Order</span>
                <span>/</span>
                <span>Policy</span>
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                Active
              </span>
            </div>

            <h1 className="text-2xl font-bold text-[#202020] sm:text-3xl lg:text-4xl">
              Order Policy
            </h1>

            <p className="mt-3 text-sm text-gray-400">
              Updated November 13, 2026
            </p>
          </div>

          {/* Introduction */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold leading-snug text-[#202020] sm:text-3xl">
              Every Order Matters. Every Customer Counts.
            </h2>

            <p className="text-sm leading-7 text-gray-600 sm:text-base">
              At SOZA, we aim to make your shopping experience simple,
              convenient, and reliable. Our Order Policy explains how orders
              are placed, confirmed, processed, shipped, delivered, and
              managed.
            </p>

            <p className="text-sm leading-7 text-gray-600 sm:text-base">
              By placing an order through our website, you agree to the
              following terms and conditions.
            </p>
          </div>

          <hr className="my-8 border-gray-200" />

          <div className="space-y-8">
            <PolicySection number="01" title="Placing an Order">
              <p>Customers can place orders directly through the SOZA website.</p>

              <p>To place an order:</p>

              <PolicyList
                items={[
                  "Browse our collections and select your desired products.",
                  "Choose your preferred size, color, and quantity where available.",
                  "Add your selected products to the shopping cart.",
                  "Proceed to checkout and provide your delivery information.",
                  "Select an available payment method.",
                  "Review your order details and submit your order.",
                ]}
              />

              <p>
                Please check all information carefully before confirming
                your purchase.
              </p>
            </PolicySection>

            <PolicySection number="02" title="Customer Information">
              <p>
                Customers must provide accurate and complete information
                when placing an order.
              </p>

              <p>Required information may include:</p>

              <PolicyList
                items={[
                  "Full name.",
                  "Active phone number.",
                  "Email address, where applicable.",
                  "Complete delivery address.",
                  "District, city, and area information.",
                ]}
              />

              <p>
                SOZA is not responsible for delivery issues caused by
                incorrect or incomplete information provided by customers.
              </p>
            </PolicySection>

            <PolicySection number="03" title="Order Confirmation">
              <p>
                After placing an order, customers may receive confirmation
                through the website, SMS, phone call, or email, depending on
                available communication services.
              </p>

              <PolicyList
                items={[
                  "All orders are subject to verification and product availability.",
                  "Our team may contact customers to confirm order details.",
                  "An order is considered confirmed when accepted by SOZA.",
                  "We reserve the right to hold or cancel orders that cannot be verified or fulfilled.",
                ]}
              />
            </PolicySection>

            <PolicySection number="04" title="Order Processing">
              <p>
                Once an order is confirmed, our team begins preparing it for
                shipment.
              </p>

              <p>The processing procedure may include:</p>

              <PolicyList
                items={[
                  "Verifying order information.",
                  "Checking product, color, and size availability.",
                  "Inspecting product quality.",
                  "Preparing and packaging the products.",
                  "Arranging shipment with our delivery partners.",
                ]}
              />

              <p>
                Processing times may vary depending on product availability,
                order volume, and operational conditions.
              </p>
            </PolicySection>

            <PolicySection number="05" title="Payment Methods">
              <p>
                SOZA supports the payment methods displayed during checkout.
                Depending on availability, these may include:
              </p>

              <PolicyList
                items={[
                  "Cash on Delivery (COD).",
                  "Mobile Financial Services, where available.",
                  "Online debit and credit card payments, where available.",
                  "Other payment methods displayed during checkout.",
                ]}
              />

              <p>
                Customers must complete any required payment verification
                before an order can be processed or dispatched.
              </p>
            </PolicySection>

            <PolicySection number="06" title="Pricing & Order Charges">
              <p>
                All product prices are displayed on the SOZA website.
                Additional charges may include:
              </p>

              <PolicyList
                items={[
                  "Delivery charges.",
                  "Applicable service fees, if displayed.",
                  "Other charges clearly communicated during checkout.",
                ]}
              />

              <p>
                The final payable amount will be shown before order
                submission. SOZA reserves the right to correct pricing or
                product information errors and contact customers if an
                order is affected.
              </p>
            </PolicySection>

            <PolicySection number="07" title="Shipping & Delivery">
              <p>
                We work with delivery partners to ensure your orders reach
                you safely.
              </p>

              <p>
                Delivery timelines and charges depend on your delivery
                location and the selected delivery service.
              </p>

              <PolicyList
                items={[
                  "Estimated delivery information will be communicated during checkout or order confirmation.",
                  "Delivery times may vary depending on courier availability and location.",
                  "Public holidays, weather, traffic, and other unforeseen circumstances may cause delays.",
                  "Delivery charges will be displayed during checkout or communicated before order confirmation.",
                ]}
              />
            </PolicySection>

            <PolicySection number="08" title="Delivery Address & Contact">
              <p>
                Customers are responsible for providing accurate delivery
                information.
              </p>

              <p>Please ensure:</p>

              <PolicyList
                items={[
                  "Your phone number is active and reachable.",
                  "Your delivery address is complete.",
                  "Your area, district, and city information is correct.",
                  "Someone is available to receive the order.",
                ]}
              />

              <p>
                If delivery information needs to be updated, contact our
                support team as soon as possible. Changes may not be possible
                once an order has been dispatched.
              </p>
            </PolicySection>

            <PolicySection number="09" title="Order Tracking & Updates">
              <p>
                Customers may receive updates about their order status
                through available website features, SMS, phone calls, or
                email.
              </p>

              <p>Order statuses may include:</p>

              <PolicyList
                items={[
                  "Pending.",
                  "Confirmed.",
                  "Processing.",
                  "Shipped.",
                  "Out for Delivery.",
                  "Delivered.",
                  "Cancelled.",
                ]}
              />

              <p>
                Tracking availability depends on the order management
                system and delivery partner.
              </p>
            </PolicySection>

            <PolicySection number="10" title="Order Cancellation">
              <p>
                Customers may request order cancellation before the order
                is dispatched.
              </p>

              <PolicyList
                items={[
                  "Cancellation requests should be submitted through our customer support team.",
                  "Orders that have already been shipped may not be eligible for cancellation.",
                  "Prepaid order refunds, where applicable, will follow our refund policy.",
                  "SOZA reserves the right to cancel orders affected by stock shortages, pricing errors, verification issues, or suspected fraudulent activity.",
                ]}
              />
            </PolicySection>

            <PolicySection number="11" title="Failed Delivery & Unsuccessful Orders">
              <p>A delivery may be unsuccessful due to:</p>

              <PolicyList
                items={[
                  "Incorrect or incomplete delivery addresses.",
                  "Unreachable customer phone numbers.",
                  "Customer unavailability at the delivery location.",
                  "Customer refusal to accept the order.",
                  "Courier or transportation issues.",
                ]}
              />

              <p>
                Our team or delivery partner may contact the customer to
                arrange another delivery attempt where available. Additional
                delivery charges may apply depending on the circumstances.
              </p>
            </PolicySection>

            <PolicySection number="12" title="Product Inspection Upon Delivery">
              <p>
                Customers are encouraged to check their orders upon receiving
                them.
              </p>

              <p>Please verify:</p>

              <PolicyList
                items={[
                  "Product name and quantity.",
                  "Selected size and color.",
                  "Product condition.",
                  "Any visible damage or incorrect items.",
                ]}
              />

              <p>
                If you receive a damaged, defective, or incorrect product,
                please contact our support team within the applicable return
                and exchange period.
              </p>

              <p>
                Please refer to our{" "}
                <Link
                  href="/policies/return-policy"
                  className="font-semibold text-[#087096] underline underline-offset-4 hover:text-[#065873]"
                >
                  Return & Exchange Policy
                </Link>{" "}
                for complete details.
              </p>
            </PolicySection>

            <PolicySection number="13" title="Changes to Orders & Policy Updates">
              <p>
                If you need to change your order, such as the size, color,
                quantity, or delivery address, please contact our support
                team as soon as possible.
              </p>

              <PolicyList
                items={[
                  "Changes are subject to product availability.",
                  "Modifications may not be possible after dispatch.",
                  "Additional charges may apply if the order value or delivery requirements change.",
                ]}
              />

              <p>
                SOZA reserves the right to update this Order Policy when
                necessary. Any changes will be published on this page with
                an updated revision date.
              </p>
            </PolicySection>

            <PolicySection number="14" title="Contact Us">
              <p>
                For questions, order updates, cancellation requests, or
                delivery assistance, please contact our customer support
                team.
              </p>

              <div className="space-y-2 rounded-lg bg-[#F7F7F5] p-5">
                <p>
                  <strong className="text-[#202020]">Brand:</strong> SOZA
                </p>
                <p>
                  <strong className="text-[#202020]">Email:</strong>{" "}
                  <a
                    href="mailto:almamon757@gmail.com"
                    className="text-[#087096] hover:underline"
                  >
                    almamon757@gmail.com
                  </a>
                </p>
                <p>
                  <strong className="text-[#202020]">Phone:</strong>{" "}
                  <a
                    href="tel:+8801746770324"
                    className="text-[#087096] hover:underline"
                  >
                    +8801746770324
                  </a>
                </p>
                <p>
                  <strong className="text-[#202020]">Location:</strong>{" "}
                  Mirpur-1, Dhaka, Bangladesh
                </p>
                <p>
                  <strong className="text-[#202020]">Website:</strong>{" "}
                  <Link
                    href="/"
                    className="text-[#087096] hover:underline"
                  >
                    SOZA
                  </Link>
                </p>
              </div>
            </PolicySection>
          </div>

          {/* Closing */}
          <hr className="my-8 border-gray-200" />

          <div className="space-y-3 text-center">
            <h2 className="text-xl font-bold text-[#087096] sm:text-2xl">
              SOZA — Wear Your Style. Feel Confident.
            </h2>

            <p className="text-sm leading-7 text-gray-500">
              Thank you for choosing SOZA. We appreciate your trust and look
              forward to providing you with a great shopping experience.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
};

export default OrderPolicyPage;
