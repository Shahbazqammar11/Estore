"use client";
import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

// Define types for TypeScript
interface DressStyle {
  styleName: string;
  image: {
    asset: {
      _ref: string;
    };
  };
}

const BrowseByDressStyle: React.FC = () => {
  const [styles, setStyles] = useState<DressStyle[]>([]);

  // Fetch data from Sanity
  const fetchDressStyles = async () => {
    const query = `*[_type == "dressStyle"] { 
      styleName, 
      image {
        asset {
          _ref
        }
      }
    }`;

    try {
      const result = await client.fetch(query);
      setStyles(result);
    } catch (error) {
      console.error("Error fetching dress styles:", error);
    }
  };

  useEffect(() => {
    fetchDressStyles();
  }, []);

  if (!styles.length) {
    return <div>Loading dress styles...</div>;
  }

  return (
    <div>
         <h2 className=" text-center text-3xl font-bold mb-6">Browse By Dress Style</h2>
   
    <div className=" bg-blue-400 grid grid-cols-2 gap-4 p-4">
        
      {styles.slice(0, 4).map((style, index) => (
        <div key={index} className="flex flex-col items-center justify-center bg-white shadow-lg p-4">
          {/* Parent div */}
          <div className="flex flex-col items-center space-y-4">
            {/* Image div */}
            <div className="w-full h-48">
              <img 
                src={urlFor(style.image).url()} 
                alt={style.styleName} 
                className="w-full h-full object-cover" 
              />
            </div>
            {/* Style name div */}
            <div className="text-center">
              <h2 className="text-lg font-bold">{style.styleName}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default BrowseByDressStyle;
