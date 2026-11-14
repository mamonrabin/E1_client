
import PageSection from "@/src/utilits/PageSection";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Return & Exchange Policy | SOZA",
  description:
    "Learn about SOZA's return, exchange, damaged product, and refund policies.",
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

const ReturnPolicyPage = () => {
  return (
    <main>
      <PageSection second="Return Policy" />

      <div className="Container px-4 py-8 sm:px-6 lg:px-16 lg:py-12">
        <article className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="text-[#087096]">Returns</span>
                <span>/</span>
                <span>Policy</span>
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                Active
              </span>
            </div>

            <h1 className="text-2xl font-bold text-[#202020] sm:text-3xl lg:text-4xl">
              Return & Exchange Policy
            </h1>

            <p className="mt-3 text-sm text-gray-400">
              Updated November 13, 2026
            </p>
          </div>

          {/* Introduction */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold leading-snug text-[#202020] sm:text-3xl">
              Your Satisfaction Is Important to Us
            </h2>

            <p className="text-sm leading-7 text-gray-600 sm:text-base">
              At SOZA, we want you to feel confident about every purchase.
              We carefully prepare and check our products before dispatch.
              However, if you receive an incorrect, damaged, or defective
              item, we are here to help.
            </p>

            <p className="text-sm leading-7 text-gray-600 sm:text-base">
              This policy explains the conditions and process for requesting
              a return, exchange, or refund for products purchased through
              our website.
            </p>
          </div>

          <hr className="my-8 border-gray-200" />

          <div className="space-y-8">
            <PolicySection number="01" title="Return & Exchange Eligibility">
              <p>
                Customers may request a return or exchange if an order meets
                the conditions of this policy.
              </p>

              <p>Eligible reasons may include:</p>

              <PolicyList
                items={[
                  "Receiving a product different from the item ordered.",
                  "Receiving a damaged or defective product.",
                  "Receiving an incorrect size or color due to a fulfillment error.",
                  "Other issues approved by the SOZA support team.",
                ]}
              />

              <p>
                All requests are subject to review and approval by our
                customer support team.
              </p>
            </PolicySection>

            <PolicySection number="02" title="Conditions for Returns">
              <p>
                To qualify for a return or exchange, products should meet
                the following conditions:
              </p>

              <PolicyList
                items={[
                  "The product should be unused and unworn.",
                  "The original tags and labels should remain attached where applicable.",
                  "The product should be returned with its original packaging and accessories, where possible.",
                  "The item should not have stains, damage, alterations, or signs of misuse.",
                  "Proof of purchase or order details must be provided.",
                ]}
              />

              <p>
                Products that do not meet the applicable conditions may
                not be accepted for return or exchange.
              </p>
            </PolicySection>

            <PolicySection number="03" title="Items That May Not Be Returned">
              <p>
                For hygiene, safety, or product-condition reasons, certain
                products may not be eligible for return or exchange unless
                they are damaged, defective, or incorrectly supplied.
              </p>

              <p>These may include:</p>

              <PolicyList
                items={[
                  "Products that have been worn, washed, or used.",
                  "Products damaged after delivery due to improper handling.",
                  "Items with removed tags or altered condition.",
                  "Products returned without prior approval.",
                  "Items specifically marked as non-returnable on their product page, subject to applicable consumer rights.",
                ]}
              />
            </PolicySection>

            <PolicySection number="04" title="Return & Exchange Request Process">
              <p>
                If you experience an issue with your order, please contact
                our support team before sending any product back.
              </p>

              <p>Follow these steps:</p>

              <PolicyList
                items={[
                  "Contact SOZA through our Contact Us page, phone, or email.",
                  "Provide your order number and contact information.",
                  "Explain the reason for your return or exchange request.",
                  "Share clear photos or videos if the product is damaged or incorrect.",
                  "Wait for our team to review your request and provide instructions.",
                  "Follow the approved return or exchange procedure.",
                ]}
              />

              <p>
                Please do not send products back without first receiving
                instructions from our team.
              </p>
            </PolicySection>

            <PolicySection number="05" title="Damaged, Defective or Incorrect Products">
              <p>
                If you receive a damaged, defective, or incorrect product,
                please notify us as soon as possible after delivery.
              </p>

              <p>
                To help us resolve the issue, please provide:
              </p>

              <PolicyList
                items={[
                  "Your order number.",
                  "A description of the issue.",
                  "Clear photographs or videos showing the product and the problem.",
                  "Your preferred resolution, such as an exchange or refund where applicable.",
                ]}
              />

              <p>
                After reviewing the request, our team will communicate
                the available resolution.
              </p>
            </PolicySection>

            <PolicySection number="06" title="Size & Color Exchange">
              <p>
                We understand that choosing the right size or color online
                can sometimes be difficult.
              </p>

              <p>
                Size or color exchange requests may be considered subject
                to the following:
              </p>

              <PolicyList
                items={[
                  "The requested replacement must be available in stock.",
                  "The original product must meet the return condition requirements.",
                  "The exchange request must be approved by our team.",
                  "Any applicable delivery or exchange charges will be communicated before the exchange is arranged.",
                ]}
              />

              <p>
                If the requested size or color is unavailable, our team
                will discuss the available alternatives.
              </p>
            </PolicySection>

            <PolicySection number="07" title="Refund Policy">
              <p>
                Refunds may be considered when a return is approved and
                an exchange or replacement is not suitable or available.
              </p>

              <p>Depending on the payment method:</p>

              <PolicyList
                items={[
                  "Prepaid orders may be refunded through the original payment method where supported.",
                  "For cash-on-delivery orders, our team will contact the customer to arrange an appropriate refund method.",
                  "Refund processing time may depend on the payment provider or financial institution.",
                  "Any applicable deductions or delivery charges will be communicated before the refund is processed.",
                ]}
              />

              <p>
                Refund eligibility and the final amount will be confirmed
                by SOZA after reviewing the returned product and order.
              </p>
            </PolicySection>

            <PolicySection number="08" title="Return & Exchange Delivery Charges">
              <p>
                Responsibility for return or exchange delivery charges
                depends on the reason for the request.
              </p>

              <PolicyList
                items={[
                  "If the issue is caused by an incorrect, damaged, or defective product supplied by SOZA, we will review the case and communicate the applicable delivery arrangements.",
                  "For customer-requested size or color changes, delivery charges may apply.",
                  "Any applicable charges will be communicated before the return or exchange is arranged.",
                ]}
              />
            </PolicySection>

            <PolicySection number="09" title="Order Cancellation">
              <p>
                Customers who wish to cancel an order should contact our
                support team as soon as possible.
              </p>

              <PolicyList
                items={[
                  "Cancellation requests may be accepted before dispatch.",
                  "Orders that have already been shipped may not be eligible for cancellation.",
                  "Approved cancellations of prepaid orders will be handled according to the applicable refund process.",
                ]}
              />

              <p>
                For more information, please read our{" "}
                <Link
                  href="/policies/order-policy"
                  className="font-semibold text-[#087096] underline underline-offset-4 hover:text-[#065873]"
                >
                  Order Policy
                </Link>
                .
              </p>
            </PolicySection>

            <PolicySection number="10" title="Non-Returnable Situations">
              <p>
                SOZA may decline a return or exchange request if:
              </p>

              <PolicyList
                items={[
                  "The product has been used, washed, or altered.",
                  "The product has been damaged after delivery due to customer misuse.",
                  "The request does not meet the applicable return conditions.",
                  "The product was purchased from an unauthorized seller.",
                  "The customer cannot provide sufficient order information to verify the purchase.",
                ]}
              />
            </PolicySection>

            <PolicySection number="11" title="Policy Updates">
              <p>
                SOZA reserves the right to revise or update this Return
                & Exchange Policy when necessary.
              </p>

              <p>
                Any changes will be published on this page with an updated
                revision date. Customers are encouraged to review the
                policy before placing an order.
              </p>
            </PolicySection>

            <PolicySection number="12" title="Contact Us">
              <p>
                If you need help with a return, exchange, or refund request,
                please contact our support team.
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
                  <Link href="/" className="text-[#087096] hover:underline">
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
              Thank you for shopping with SOZA. We appreciate your trust
              and are always happy to help make your experience better.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
};

export default ReturnPolicyPage;
