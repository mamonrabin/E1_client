import CopyRight from "@/src/components/footer/CopyRight";
import Footer from "@/src/components/footer/Footer";
import TopFooter from "@/src/components/footer/TopFooter";
import Navbar from "@/src/components/header/Navbar";
import MessengerBtn from "@/src/shared/MessengerBtn";
import ScrollToBottomToTop from "@/src/shared/ScrollToBottomToTop";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <MessengerBtn />
      <ScrollToBottomToTop />
      <Navbar/>
      {children}
     <TopFooter />
      <Footer />
      <CopyRight />
    </div>
  );
}
