
import React from "react";
import img from "@/src/assets/images/about.webp";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Metadata } from "next";
import PageSection from "@/src/utilits/PageSection";

export const metadata: Metadata = {
  title: "soza | about",
  description: "Best E-commerce platform for your business",
};

const page = () => {
  return (
    <div>
      <PageSection second="About Us" />
      <div className="Container xl:px-45 lg:px-20 py-8 mt-4">
        <div className="grid lg:grid-cols-2 gap-2">
          <div>
            <h2 className="text-2xl font-medium capitalize">About our shop</h2>

            <div className="flex flex-col gap-6 mt-6">
              <p className="text-[#262626]/80">
                A great About Us page helps builds trust between you and your
                customers. The more content you provide about you and your
                business, the more confident people will be when purchasing from
                your store.
              </p>
              <p className="text-[#262626]/80">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus, nulla. Exercitationem, saepe, corrupti hic culpa
                neque vitae aut nostrum in a perspiciatis rerum qui nam
                consectetur quia.
              </p>

              <p className="text-[#262626]/80">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus, nulla. Exercitationem, saepe, corrupti hic culpa
                neque vitae aut nostrum in a perspiciatis rerum qui nam
                consectetur quia.
              </p>

              <p className="text-[#262626]/80">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident dolorem doloremque quae.
              </p>

              <div>
                <p className="font-medium">Social Link : </p>

                <div className="flex items-center gap-2 mt-2">
                  <p className="p-1.5 border rounded text-primary/60 hover:text-primary duration-300 cursor-pointer">
                    <Facebook size={16} />
                  </p>
                  <p className="p-1.5 border rounded text-primary/60 hover:text-primary duration-300 cursor-pointer">
                    <Instagram size={16} />
                  </p>
                  <p className="p-1.5 border rounded text-primary/60 hover:text-primary duration-300 cursor-pointer">
                    <Twitter size={16} />
                  </p>
                  <p className="p-1.5 border rounded text-primary/60 hover:text-primary duration-300 cursor-pointer">
                    <Youtube size={16} />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <Image src={img} alt="about" width={800} height={800} />
          </div>
        </div>

        <div className="flex flex-col lg:mt-12 mt-4 gap-2">
          <p className="border border-prinary/10 p-4 rounded text-primary/80 text-sm">
            <span className="font-medium text-base text-black">Missoin : </span>{" "}
            ipsum dolor sit amet consectetur adipisicing elit. Beatae, quasi
            sequi dignissimos distinctio error, qui officia soluta deleniti
            placeat molestias aperiam, nihil suscipit voluptates quia non
            obcaecati! In sed ullam, eveniet tempora minima molestiae reiciendis
            vitae quae ex aut quibusdam, suscipit est sint sequi nulla. Nihil,
            maiores atque, ad adipisci ipsam porro enim eius quam dicta tempore
            accusantium sapiente impedit?
          </p>
          <p className="border border-prinary/10 p-4 rounded text-primary/80 text-sm">
            <span className="font-medium text-base text-black">Vissoin : </span>{" "}
            ipsum dolor sit amet consectetur adipisicing elit. Beatae, quasi
            sequi dignissimos distinctio error, qui officia soluta deleniti
            placeat molestias aperiam, nihil suscipit voluptates quia non
            obcaecati! In sed ullam, eveniet tempora minima molestiae reiciendis
            vitae quae ex aut quibusdam, suscipit est sint sequi nulla. Nihil,
            maiores atque, ad adipisci ipsam porro enim eius quam dicta tempore
            accusantium sapiente impedit?
          </p>
          <p className="border border-prinary/10 p-4 rounded text-primary/80 text-sm">
            <span className="font-medium text-base text-black">Value : </span>{" "}
            ipsum dolor sit amet consectetur adipisicing elit. Beatae, quasi
            sequi dignissimos distinctio error, qui officia soluta deleniti
            placeat molestias aperiam, nihil suscipit voluptates quia non
            obcaecati! In sed ullam, eveniet tempora minima molestiae reiciendis
            vitae quae ex aut quibusdam, suscipit est sint sequi nulla. Nihil,
            maiores atque, ad adipisci ipsam porro enim eius quam dicta tempore
            accusantium sapiente impedit?
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
