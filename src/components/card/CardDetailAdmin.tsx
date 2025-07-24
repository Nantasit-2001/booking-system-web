import React from 'react';
import { CardMetric } from '@/types/types';

interface CardDetailProps {
  metric: CardMetric;
}

const CardDetail: React.FC<CardDetailProps> = ({ metric }) => {
  return (
    <div className={`w-full flex items-center px-5 py-6 rounded-lg shadow-sm bg-white text-${metric.textColor}`}>
      <div className={`p-3.5 px-5 rounded-md text-center ${metric.textColor} bg-opacity-20  ${metric.bgColor}`}>
        {metric.icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{metric.title}</p>
        <p className="text-2xl font-bold">{metric.value}</p>
      </div>
    </div>
  );
};

export default CardDetail;