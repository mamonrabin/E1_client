
import PageSection from "@/src/utilits/PageSection";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Terms & Conditions | SOZA",
  description:
    "Read SOZA's terms and conditions for using our website, placing orders, payments, shipping, and customer responsibilities.",
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

const TermsConditionsPage = () => {
  return (
    <main>
      <PageSection second="Terms & Conditions" />

      <div className="Container px-4 py-8 sm:px-6 lg:px-16 lg:py-12">
        <article className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="text-[#087096]">Legal</span>
                <span>/</span>
                <span>Terms & Conditions</span>
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                Active
              </span>
            </div>

            <h1 className="text-2xl font-bold text-[#202020] sm:text-3xl lg:text-4xl">
              Terms & Conditions
            </h1>

            <p className="mt-3 text-sm text-gray-400">
              Updated November 13, 2026
            </p>
          </div>

          {/* Introduction */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold leading-snug text-[#202020] sm:text-3xl">
              Welcome to SOZA
            </h2>

            <p className="text-sm leading-7 text-gray-600 sm:text-base">
              Welcome to SOZA. These Terms & Conditions govern your access
              to and use of our website, products, and shopping services.
              By visiting our website or placing an order, you agree to
              follow these terms.
            </p>

            <p className="text-sm leading-7 text-gray-600 sm:text-base">
              Please read these terms carefully before using our website.
              If you do not agree with any part of these terms, please
              discontinue using our services.
            </p>
          </div>

          <hr className="my-8 border-gray-200" />

          <div className="space-y-8">
            <PolicySection number="01" title="Website Usage">
              <p>
                You may use the SOZA website for personal shopping and
                other lawful purposes.
              </p>

              <p>When using our website, you agree not to:</p>

              <PolicyList
                items={[
                  "Use the website for unlawful, fraudulent, or misleading activities.",
                  "Attempt to access restricted areas or interfere with website security.",
                  "Upload malicious software, harmful code, or unauthorized content.",
                  "Copy, reproduce, or distribute website content without permission.",
                  "Use automated systems to collect website data without authorization.",
                  "Interfere with the normal operation or availability of our website.",
                ]}
              />
            </PolicySection>

            <PolicySection number="02" title="Products & Product Information">
              <p>
                SOZA aims to provide accurate product descriptions,
                photographs, prices, sizes, colors, and other product
                information.
              </p>

              <p>Please note:</p>

              <PolicyList
                items={[
                  "Actual product colors may vary slightly due to screen settings and display differences.",
                  "Product measurements and size information are provided as guidance and may have minor variations.",
                  "Product availability may change without prior notice.",
                  "Product images are intended to represent the actual items as accurately as possible.",
                  "We reserve the right to correct inaccurate product information when necessary.",
                ]}
              />
            </PolicySection>

            <PolicySection number="03" title="Pricing & Product Availability">
              <p>
                Product prices are displayed on the SOZA website and may
                change from time to time.
              </p>

              <PolicyList
                items={[
                  "Prices applicable to an order are those shown during checkout, subject to correction of genuine errors.",
                  "Delivery charges and other applicable fees will be communicated before order submission.",
                  "We do not guarantee that every product will remain available at all times.",
                  "If a product becomes unavailable after an order is placed, our team may contact you regarding the available options.",
                  "We reserve the right to correct pricing, description, or stock errors.",
                ]}
              />
            </PolicySection>

            <PolicySection number="04" title="Customer Accounts & Information">
              <p>
                Certain website features may require you to provide
                personal information or create an account.
              </p>

              <p>You agree to:</p>

              <PolicyList
                items={[
                  "Provide accurate and complete information.",
                  "Keep your account credentials confidential.",
                  "Notify us if you suspect unauthorized access to your account.",
                  "Keep your contact and delivery information updated.",
                  "Take responsibility for activities carried out through your account, subject to applicable law.",
                ]}
              />

              <p>
                We handle personal information according to our{" "}
                <Link
                  href="/policies/privacy-policy"
                  className="font-semibold text-[#087096] underline underline-offset-4 hover:text-[#065873]"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </PolicySection>

            <PolicySection number="05" title="Orders & Order Confirmation">
              <p>
                Placing an order through our website represents a request
                to purchase the selected products.
              </p>

              <PolicyList
                items={[
                  "Customers must review product details and checkout information before submitting an order.",
                  "Orders may be subject to verification and confirmation by our team.",
                  "We may contact customers to verify delivery information or order details.",
                  "An order is subject to acceptance and product availability.",
                  "We reserve the right to reject or cancel orders in cases of suspected fraud, incorrect information, stock issues, or genuine pricing errors.",
                ]}
              />

              <p>
                Please read our{" "}
                <Link
                  href="/policies/order-policy"
                  className="font-semibold text-[#087096] underline underline-offset-4 hover:text-[#065873]"
                >
                  Order Policy
                </Link>{" "}
                for additional information.
              </p>
            </PolicySection>

            <PolicySection number="06" title="Payment Terms">
              <p>
                Customers must use the payment methods made available
                during checkout.
              </p>

              <PolicyList
                items={[
                  "Available payment methods will be displayed during checkout.",
                  "Customers must provide accurate payment information where required.",
                  "For cash-on-delivery orders, payment is due upon delivery.",
                  "Prepaid orders must complete the required payment process before fulfillment.",
                  "Payment verification may be required before an order is processed.",
                ]}
              />

              <p>
                Third-party payment providers may have their own terms
                and conditions.
              </p>
            </PolicySection>

            <PolicySection number="07" title="Shipping & Delivery">
              <p>
                SOZA works with delivery partners to deliver purchased
                products to the address provided by customers.
              </p>

              <p>Delivery conditions include:</p>

              <PolicyList
                items={[
                  "Customers must provide a complete and accurate delivery address.",
                  "Delivery charges may vary depending on the delivery location.",
                  "Estimated delivery times may vary based on location and courier availability.",
                  "Delays may occur due to weather, public holidays, transportation issues, or other circumstances beyond our control.",
                  "Customers should remain reachable during the delivery process.",
                ]}
              />

              <p>
                Delivery estimates are not guaranteed unless explicitly
                confirmed by SOZA.
              </p>
            </PolicySection>

            <PolicySection number="08" title="Cancellation, Returns & Refunds">
              <p>
                Order cancellation, product returns, exchanges, and refunds
                are handled according to the applicable SOZA policies.
              </p>

              <PolicyList
                items={[
                  "Cancellation requests should be submitted as early as possible.",
                  "Orders already dispatched may not be eligible for cancellation.",
                  "Returned products must meet the applicable return conditions.",
                  "Refund eligibility depends on the reason for the request and the return review.",
                  "Applicable delivery charges and refund arrangements will be communicated by our support team.",
                ]}
              />

              <p>
                Please review our{" "}
                <Link
                  href="/policies/return-policy"
                  className="font-semibold text-[#087096] underline underline-offset-4 hover:text-[#065873]"
                >
                  Return & Exchange Policy
                </Link>{" "}
                for full details.
              </p>
            </PolicySection>

            <PolicySection number="09" title="Intellectual Property">
              <p>
                All content available on the SOZA website, including
                logos, brand elements, photographs, graphics, text,
                designs, and website materials, is owned by or used
                with permission by SOZA, unless otherwise stated.
              </p>

              <p>
                You may not reproduce, modify, distribute, publish, or
                commercially use our content without prior written
                permission.
              </p>
            </PolicySection>

            <PolicySection number="10" title="Promotions & Discounts">
              <p>
                From time to time, SOZA may offer promotional campaigns,
                discount codes, special offers, or other shopping benefits.
              </p>

              <PolicyList
                items={[
                  "Promotional offers may have specific terms, conditions, and validity periods.",
                  "Some discounts may apply only to selected products.",
                  "Offers may not be combined unless explicitly stated.",
                  "Promotional codes must be used according to their stated conditions.",
                  "We reserve the right to correct or withdraw an offer in case of errors or misuse, subject to applicable law.",
                ]}
              />
            </PolicySection>

            <PolicySection number="11" title="Limitation of Liability">
              <p>
                To the extent permitted by applicable law, SOZA shall not
                be responsible for losses arising from circumstances beyond
                our reasonable control, including:
              </p>

              <PolicyList
                items={[
                  "Temporary website interruptions or technical issues.",
                  "Delivery delays caused by third-party courier services.",
                  "Incorrect information submitted by customers.",
                  "Unauthorized access caused by compromised customer credentials.",
                  "Events outside our reasonable control that affect service availability.",
                ]}
              />

              <p>
                Nothing in these terms excludes or limits rights or
                responsibilities that cannot legally be excluded under
                applicable law.
              </p>
            </PolicySection>

            <PolicySection number="12" title="Third-Party Services & Links">
              <p>
                Our website may include links to third-party websites,
                payment services, or delivery providers.
              </p>

              <p>
                These services operate independently and may be governed
                by their own terms and policies. SOZA does not control
                the content or practices of external services.
              </p>
            </PolicySection>

            <PolicySection number="13" title="Suspension or Restriction of Access">
              <p>
                We reserve the right to restrict or suspend access to
                our website where necessary to protect our customers,
                business operations, or website security.
              </p>

              <p>
                This may apply in cases of suspected fraudulent activity,
                misuse of our services, security violations, or other
                activities that violate these terms or applicable law.
              </p>
            </PolicySection>

            <PolicySection number="14" title="Changes to These Terms">
              <p>
                SOZA may update these Terms & Conditions from time to time
                to reflect changes in our products, services, business
                operations, or applicable requirements.
              </p>

              <p>
                Updated terms will be published on this page with a revised
                update date. Continued use of our website after changes
                take effect is subject to the updated terms, to the extent
                permitted by applicable law.
              </p>
            </PolicySection>

            <PolicySection number="15" title="Governing Law">
              <p>
                These Terms & Conditions are intended to be interpreted
                in accordance with the applicable laws of Bangladesh,
                subject to any mandatory consumer rights and protections.
              </p>

              <p>
                Any disputes will be handled by the appropriate authorities
                or courts with jurisdiction under applicable law.
              </p>
            </PolicySection>

            <PolicySection number="16" title="Contact Us">
              <p>
                If you have questions about these Terms & Conditions,
                our products, or our services, please contact us.
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
              Thank you for choosing SOZA. We appreciate your trust
              and look forward to serving you.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
};

export default TermsConditionsPage;
