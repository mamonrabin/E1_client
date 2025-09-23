

import { FaPhone } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";

import { Metadata } from "next";
import PageSection from "@/src/utilits/PageSection";
import ContactForm from "@/src/form/ContactForm";


export const metadata: Metadata = {
  title: "sora | contact",
  description: "Best E-commerce platform for your business",
};

const page = () => {
  return (
    <div>
      <PageSection second="Contact" />
      <div className="Container mt-12">
        <div className="grid xl:grid-cols-2 lg:grid-cols-2 lg:gap-0 gap-12">
          <div className="">
            <div>
              <h2 className="text-lg font-medium">Send Us a Message</h2>
              <p className="mt-2 text-[#262626]/60">
                Enter your name, valid email address, and number to contact us
              </p>
            </div>

            <ContactForm />
          </div>
          <div className=" relative lg:px-12">
            <div>
              <h2 className="text-xl font-medium">Get in Touch</h2>
              <div className="border-b-4 border-primary w-[30px] mt-1"></div>
            </div>
            <div className="mt-8 z-10 relative">
              <p>Numbers:</p>
              <div className="flex items-center gap-2 mt-2">
                <p className="w-[22px] h-[22px] bg-primary flex items-center justify-center text-[#fff] text-[12px] rounded">
                  <FaPhone />
                </p>
                <p className="text-[#262626]/60 group-hover:text-[#262626]">
                  General Inquiries: +8801746770324
                </p>
              </div>
            </div>

            <div className="mt-8 z-10 relative">
              <p>Email:</p>
              <div className="flex items-center gap-2 mt-2">
                <p className="w-[22px] h-[22px] bg-primary flex items-center justify-center text-[#fff] text-[12px] rounded">
                  <FaInfo />
                </p>
                <p className="text-[#262626]/60 group-hover:text-[#262626]">
                  almamon757@gmail.com
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <p className="w-[22px] h-[22px] bg-primary flex items-center justify-center text-[#fff] text-[12px] rounded">
                  <BiSupport />
                </p>
                <p className="text-[#262626]/60 group-hover:text-[#262626]">
                  almamon757@gmail.com
                </p>
              </div>
            </div>

            <div className="mt-8 z-10 relative">
              <p>Shopping Hours:</p>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-[#262626]/60 group-hover:text-[#262626]">
                  Saturday — Thursday 9am – 5pm
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <p className="text-[#262626]/60 group-hover:text-[#262626]">
                  Friday — Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-8 rounded"
          style={{ width: "100%", height: "400px" }}
        >
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.848280008054!2d90.39124631498154!3d23.75088508458933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8915512f071%3A0x99fa2a85c09ccfe3!2sMirpur%201%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1720789410664!5m2!1sen!2sbd"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default page;
