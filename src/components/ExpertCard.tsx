import React from 'react';
import { Link } from 'react-router-dom';
// We don't need the config here yet because data comes from props,
// but we add a safety check for the image.

interface ExpertCardProps {
  name: string;
  specialty: string;
  rating: number;
  rateAgroCoin: number;
  languages: string;
  imageUrl: string;
}

const ExpertCard: React.FC<ExpertCardProps> = ({
  name,
  specialty,
  rating,
  rateAgroCoin,
  languages,
  imageUrl,
}) => {
  // FALLBACK: If imageUrl is just a filename, you might need to prefix it 
  // with your API URL in the parent component.
  
  return (
    <div className="flex items-center p-4 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      
      <div className="shrink-0">
        <img 
          src={imageUrl || 'https://via.placeholder.com/150'} // Safety fallback
          alt={name} 
          className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
        />
      </div>

      <div className="ml-4 grow">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-green-700 font-semibold">{specialty}</p>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <span className="text-amber-400">⭐</span> {rating.toFixed(1)} &bull; {languages}
        </div>
      </div>

      <div className="flex flex-col items-end shrink-0 ml-4">
        {/* Using the AgroCoin symbol we defined in your vision */}
        <p className="text-xl font-bold text-amber-500">{rateAgroCoin} AC</p>
        <p className="text-xs text-gray-500 mb-2">per consultation</p>
        
        <Link 
            to="/experts/book" 
            className="px-4 py-2 text-sm bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md text-center"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default ExpertCard;