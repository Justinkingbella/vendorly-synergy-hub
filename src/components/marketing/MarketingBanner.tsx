
import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MarketingBannerProps {
  title: string;
  content: string;
  backgroundColor: string;
  textColor: string;
  buttonText: string;
  buttonLink: string;
  buttonColor: string;
  onClose?: () => void;
}

const MarketingBanner: React.FC<MarketingBannerProps> = ({
  title,
  content,
  backgroundColor,
  textColor,
  buttonText,
  buttonLink,
  buttonColor,
  onClose
}) => {
  return (
    <div 
      className="w-full py-3 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between"
      style={{ 
        backgroundColor,
        color: textColor
      }}
    >
      <div className="flex flex-col sm:flex-row items-center">
        {title && <h4 className="font-medium mr-3 text-center sm:text-left">{title}</h4>}
        <p className="text-sm mt-1 sm:mt-0 text-center sm:text-left">{content}</p>
      </div>
      
      <div className="flex items-center mt-2 sm:mt-0">
        {buttonText && (
          <Button 
            asChild
            className="text-white mr-2"
            style={{ backgroundColor: buttonColor }}
          >
            <Link to={buttonLink}>{buttonText}</Link>
          </Button>
        )}
        
        {onClose && (
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/10 transition-colors"
            aria-label="Close banner"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MarketingBanner;
