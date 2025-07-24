import TopContent from "@/components/page/landing/TopContent";
import Navbar from "@/components/Navbar";
import WhyChooseHotel from "@/components/page/landing/WhyChooseHotel";
import RoomTypes from "@/components/page/landing/RoomTypes";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <TopContent />
      <WhyChooseHotel />
      <RoomTypes />   
      <Footer />
    </>
  );
}