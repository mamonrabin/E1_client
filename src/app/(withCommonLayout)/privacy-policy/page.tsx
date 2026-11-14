
import PageSection from "@/src/utilits/PageSection";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Privacy Policy | SOZA",
  description:
    "Learn how SOZA collects, uses, stores, and protects your personal information when you shop with us.",
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

const PrivacyPolicyPage = () => {
  return (
    <main>
      <PageSection second="Privacy Policy" />

      <div className="Container px-4 py-8 sm:px-6 lg:px-16 lg:py-12">
        <article className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="text-[#087096]">Privacy</span>
                <span>/</span>
                <span>Policy</span>
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                Active
              </span>
            </div>

            <h1 className="text-2xl font-bold text-[#202020] sm:text-3xl lg:text-4xl">
              Privacy Policy
            </h1>

            <p className="mt-3 text-sm text-gray-400">
              Updated November 13, 2026
            </p>
          </div>

          {/* Introduction */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold leading-snug text-[#202020] sm:text-3xl">
              Your Privacy Matters to Us
            </h2>

            <p className="text-sm leading-7 text-gray-600 sm:text-base">
              At SOZA, we respect your privacy and are committed to protecting
              the personal information you share with us. We understand the
              importance of keeping your information secure and using it
              responsibly.
            </p>

            <p className="text-sm leading-7 text-gray-600 sm:text-base">
              This Privacy Policy explains what information we collect, how
              we use it, when we may share it, and the choices available to
              you when using our website and services.
            </p>

            <p className="text-sm leading-7 text-gray-600 sm:text-base">
              By accessing our website or placing an order, you acknowledge
              that you have read this Privacy Policy.
            </p>
          </div>

          <hr className="my-8 border-gray-200" />

          <div className="space-y-8">
            <PolicySection number="01" title="Information We Collect">
              <p>
                When you browse our website, create an account, contact us,
                or place an order, we may collect information necessary to
                provide our services.
              </p>

              <p>This information may include:</p>

              <PolicyList
                items={[
                  "Personal details such as your full name.",
                  "Contact information, including phone number and email address.",
                  "Delivery information, including address, city, district, and postal code where applicable.",
                  "Order details, including purchased products, sizes, colors, quantities, and order history.",
                  "Communication details when you contact our customer support team.",
                  "Account information if you register on our website.",
                ]}
              />
            </PolicySection>

            <PolicySection number="02" title="Automatically Collected Information">
              <p>
                When you visit SOZA, certain technical information may be
                collected automatically through standard website technologies.
              </p>

              <p>This may include:</p>

              <PolicyList
                items={[
                  "IP address and general device information.",
                  "Browser type and operating system.",
                  "Pages visited and interactions with our website.",
                  "Date, time, and duration of website visits.",
                  "Referral pages and general website usage information.",
                ]}
              />

              <p>
                This information helps us understand how visitors use our
                website and improve its performance and functionality.
              </p>
            </PolicySection>

            <PolicySection number="03" title="How We Use Your Information">
              <p>
                We use collected information to operate our online store,
                manage orders, communicate with customers, and improve our
                services.
              </p>

              <p>Your information may be used to:</p>

              <PolicyList
                items={[
                  "Create and manage customer accounts.",
                  "Process and confirm customer orders.",
                  "Arrange product packaging and delivery.",
                  "Contact you about orders, payments, and delivery updates.",
                  "Respond to questions, complaints, and support requests.",
                  "Improve our products, website, and shopping experience.",
                  "Maintain records for business operations and legal requirements.",
                  "Send promotional messages where you have agreed to receive them.",
                ]}
              />
            </PolicySection>

            <PolicySection number="04" title="Cookies & Website Technologies">
              <p>
                Our website may use cookies and similar technologies to
                improve your browsing experience and understand how visitors
                interact with our services.
              </p>

              <p>Cookies may help us:</p>

              <PolicyList
                items={[
                  "Remember certain browsing preferences.",
                  "Maintain shopping cart functionality.",
                  "Understand website traffic and usage patterns.",
                  "Improve website performance and user experience.",
                ]}
              />

              <p>
                You can manage or disable cookies through your browser
                settings. However, some website features may not work
                correctly if certain cookies are disabled.
              </p>
            </PolicySection>

            <PolicySection number="05" title="Sharing Your Information">
              <p>
                We respect your personal information and do not sell your
                personal data to third parties.
              </p>

              <p>
                We may share relevant information with trusted service
                providers when necessary to operate our business, including:
              </p>

              <PolicyList
                items={[
                  "Delivery and courier companies to deliver your orders.",
                  "Payment service providers to process transactions where applicable.",
                  "Website hosting and technical service providers.",
                  "Customer support and operational service providers.",
                  "Legal or regulatory authorities when disclosure is required by applicable law.",
                ]}
              />

              <p>
                These parties should only receive information necessary
                for the services they provide or the legal obligations
                they must fulfill.
              </p>
            </PolicySection>

            <PolicySection number="06" title="Payment Information">
              <p>
                Payment options available on SOZA are displayed during
                checkout. When you make a payment through a third-party
                payment provider, your payment information may be handled
                by that provider according to its own privacy and security
                practices.
              </p>

              <p>
                We use payment-related information as necessary to verify
                and manage customer orders. We do not claim to store complete
                payment card details on our own systems.
              </p>
            </PolicySection>

            <PolicySection number="07" title="Data Security">
              <p>
                We take reasonable measures to protect customer information
                against unauthorized access, loss, misuse, alteration, or
                disclosure.
              </p>

              <p>Our security practices may include:</p>

              <PolicyList
                items={[
                  "Limiting access to personal information to authorized personnel.",
                  "Using appropriate technical and administrative safeguards.",
                  "Working with service providers that support secure business operations.",
                  "Reviewing and improving our data protection practices.",
                ]}
              />

              <p>
                However, no online transmission or electronic storage method
                can be guaranteed to be completely secure.
              </p>
            </PolicySection>

            <PolicySection number="08" title="Data Retention">
              <p>
                We retain personal information for as long as reasonably
                necessary to fulfill the purposes described in this policy,
                including order management, customer support, business
                records, and applicable legal requirements.
              </p>

              <p>
                When information is no longer required, we may delete it
                or securely dispose of it, subject to applicable retention
                obligations.
              </p>
            </PolicySection>

            <PolicySection number="09" title="Your Privacy Choices & Rights">
              <p>
                You may contact us to ask about the personal information
                associated with your account or orders.
              </p>

              <p>Depending on applicable law, you may request to:</p>

              <PolicyList
                items={[
                  "Access personal information we hold about you.",
                  "Correct inaccurate or incomplete information.",
                  "Request deletion of personal information where applicable.",
                  "Opt out of promotional or marketing communications.",
                  "Ask questions about how your information is used.",
                ]}
              />

              <p>
                We may need to retain certain information to fulfill legal,
                security, or business recordkeeping requirements.
              </p>
            </PolicySection>

            <PolicySection number="10" title="Third-Party Websites">
              <p>
                Our website may contain links to external websites or
                services. These websites operate independently and may
                have their own privacy policies and practices.
              </p>

              <p>
                SOZA is not responsible for the privacy, security, or
                content practices of external websites. We encourage you
                to review their privacy policies before sharing personal
                information with them.
              </p>
            </PolicySection>

            <PolicySection number="11" title="Children's Privacy">
              <p>
                Our website is intended for general shopping use and is
                not specifically directed at children. We do not knowingly
                collect personal information from children in circumstances
                where parental consent is required by applicable law.
              </p>

              <p>
                If you believe a child has provided personal information
                to us inappropriately, please contact our support team.
              </p>
            </PolicySection>

            <PolicySection number="12" title="Changes to This Privacy Policy">
              <p>
                We may update this Privacy Policy from time to time to
                reflect changes in our business operations, website
                functionality, or applicable requirements.
              </p>

              <p>
                Any updates will be published on this page along with
                a revised update date. We encourage you to review this
                page periodically.
              </p>
            </PolicySection>

            <PolicySection number="13" title="Contact Us">
              <p>
                If you have questions, concerns, or requests regarding
                this Privacy Policy or your personal information, please
                contact us:
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
              Thank you for trusting SOZA. We value your privacy and
              appreciate your continued support.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
