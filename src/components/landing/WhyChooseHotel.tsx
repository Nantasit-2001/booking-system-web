import FeatureCard from "../card/FeaturesCard";
import { AlertCircle } from "@deemlol/next-icons";
import { Calendar } from "@deemlol/next-icons";
import { BotSquare } from "@deemlol/next-icons";
const WhyChooseHotel: React.FC = () => {
    return (
       <section id="why-choose" className="mx-auto px-4 pt-18 pb-20 bg-gray-100 w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 ">Why Choose Ease?</h2>
            <p className="text-lg font-semibold text-gray-600 mb-8 text-center max-w-2xl">
                Experience seamless booking with our advanced features
            </p>
        </div>
        <div className="flex flex-col gap-6 px-6 md:gap-8 md:flex-row xl:gap-10">
          <FeatureCard
            icon={<BotSquare size={42} color="#362fd9" />}
            colorIcon="bg-blue-100"
            title="24/7 AI Chatbot"
            description="Get instant answers to your questions anytime, anywhere with our smart chatbot assistant."
          />
          <FeatureCard
            colorIcon="bg-orange-100"
            icon={<Calendar size={42} color="#F57B39" />}
            title="Easy Booking"
            description="Book your perfect room in just a few clicks with our streamlined booking process."
          />
          <FeatureCard
            colorIcon="bg-green-100"
            icon={<AlertCircle size={42} color="#2e712d" />}
            title="Secure Payments"
            description="Pay safely with QR code."
          />
        </div>
      </section>
    );
}
export default WhyChooseHotel;