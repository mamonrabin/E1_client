
import { Metadata } from "next";
import Link from "next/link";
import PageSection from "@/src/utilits/PageSection";
import ContactForm from "@/src/form/ContactForm";
import {
  Phone,
  Mail,
  Headset,
  Clock3,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | SOZA",
  description:
    "Get in touch with SOZA for product inquiries, order assistance, and customer support.",
};

const contactDetails = [
  {
    icon: Phone,
    title: "Phone",
    label: "General inquiries",
    value: "+8801746770324",
    href: "tel:+8801746770324",
  },
  {
    icon: Mail,
    title: "Email",
    label: "General inquiries",
    value: "almamon757@gmail.com",
    href: "mailto:almamon757@gmail.com",
  },
  {
    icon: Headset,
    title: "Customer Support",
    label: "We're happy to help",
    value: "almamon757@gmail.com",
    href: "mailto:almamon757@gmail.com",
  },
];

const ContactPage = () => {
  return (
    <main className="bg-white">
      <PageSection second="Contact" />

      <section className="Container px-4 py-14 sm:px-6 lg:px-12 lg:py-20">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#087096]">
            We&apos;d love to hear from you
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#202020] sm:text-5xl">
            Get in Touch with <span className="text-[#087096]">SOZA</span>
          </h1>

          <p className="mt-5 text-sm leading-7 text-gray-500 sm:text-base">
            Have a question about a product, your order, or anything else?
            Send us a message and our team will be happy to assist you.
          </p>
        </div>

        {/* Contact Section */}
        <div className="grid overflow-hidden rounded-2xl border border-gray-100 shadow-sm lg:grid-cols-2">
          {/* Contact Form */}
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#087096]">
                Send a message
              </span>

              <h2 className="mt-3 text-2xl font-bold text-[#202020]">
                How can we help you?
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                Fill out the form below with your details and message.
                We will get back to you as soon as possible.
              </p>
            </div>

            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="relative overflow-hidden bg-[#F7F7F5] p-6 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[35px] border-[#087096]/5" />

            <div className="relative z-10">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#087096]">
                Contact information
              </span>

              <h2 className="mt-3 text-2xl font-bold text-[#202020]">
                Let&lsquo;s talk
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                Reach out to us through any of the following channels.
                We&lsquo;re always happy to hear from you.
              </p>

              <div className="mt-9 space-y-7">
                {contactDetails.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      className="group flex items-center gap-4"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#087096]/10 text-[#087096] transition-colors duration-300 group-hover:bg-[#087096] group-hover:text-white">
                        <Icon size={21} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#202020]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {item.label}
                        </p>
                        <p className="mt-1 break-all text-sm text-gray-600 transition-colors group-hover:text-[#087096]">
                          {item.value}
                        </p>
                      </div>

                      <ArrowUpRight
                        size={17}
                        className="shrink-0 text-gray-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#087096]"
                      />
                    </a>
                  );
                })}
              </div>

              {/* Shopping Hours */}
              <div className="mt-10 border-t border-gray-200 pt-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#087096]/10 text-[#087096]">
                    <Clock3 size={20} />
                  </div>

                  <h3 className="font-semibold text-[#202020]">
                    Shopping Hours
                  </h3>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between gap-4 text-gray-600">
                    <span>Saturday — Thursday</span>
                    <span className="font-medium text-[#202020]">
                      9 AM – 5 PM
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-gray-600">
                    <span>Friday</span>
                    <span className="font-medium text-[#087096]">
                      Closed
                    </span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mt-8 flex items-center gap-3 border-t border-gray-200 pt-7">
                <MapPin size={20} className="text-[#087096]" />
                <p className="text-sm text-gray-600">
                  Mirpur-1, Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-14">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#087096]">
                Find us
              </span>

              <h2 className="mt-2 text-2xl font-bold text-[#202020] sm:text-3xl">
                Our Location
              </h2>
            </div>

            <p className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={16} className="text-[#087096]" />
              Mirpur-1, Dhaka
            </p>
          </div>

          <div className="h-[300px] overflow-hidden rounded-xl border border-gray-100 sm:h-[400px]">
            <iframe
              title="SOZA location in Mirpur-1 Dhaka"
              width="100%"
              height="100%"
              className="border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.848280008054!2d90.39124631498154!3d23.75088508458933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8915512f071%3A0x99fa2a85c09ccfe3!2sMirpur%201%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1720789410664!5m2!1sen!2sbd"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
