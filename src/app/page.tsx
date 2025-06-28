import TopContent from "@/components/landing/TopContent";
import Navbar from "@/components/Navbar";
import WhyChooseHotel from "@/components/landing/WhyChooseHotel";
import RoomTypes from "@/components/landing/RoomTypes";
import Footer from "@/components/footer/InlandingPage";
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