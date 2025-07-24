// components/FeatureCard.tsx
import React from 'react';
import { FeatureCardProps } from '@/types/types';

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, colorIcon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300 w-full max-w-[280px] xl:max-w-full xl:w-[380px]">
      <div className={`mb-4 rounded-full p-3 ${colorIcon}`}>{icon}</div> {/* แสดง Icon ที่รับเข้ามา */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 p-2">{description}</p>
    </div>
  );
};

export default FeatureCard;