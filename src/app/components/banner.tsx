"use client";
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import React, { useEffect, useState } from 'react';


// Define the types for TypeScript
interface Banner {
  title: string;
  description: string;
  image: {
    asset: {
      _ref: string;
    };
  };
}

const Homebanner: React.FC = () => {
  const [bannerData, setBannerData] = useState<Banner | null>(null);

  // Fetch banner data from Sanity
  const fetchBanner = async () => {
    const query = `*[_type == "banner"][0] { 
      title, 
      description, 
      image {
        asset {
          _ref
        }
      }
    }`;

    try {
      const result = await client.fetch(query);
      setBannerData(result);
    } catch (error) {
      console.error("Error fetching banner data:", error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  if (!bannerData) {
    return <div> Banner Data fetching...</div>;
  }

  return (
    <div className="bg-zinc-100 flex flex-col sm:flex-col md:flex-row h-full w-full items-center justify-between p-4">
      {/* Left Side: Title and Description */}
      <div className="w-full md:w-1/2 flex flex-col items-start space-y-4 text-center md:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
          {bannerData.title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-2">
          {bannerData.description}
        </p>
       
      </div>

      {/* Right Side: Banner Image */}
      <div className="w-full md:w-1/2 mt-4 md:mt-0">
        <img
          className="w-full h-auto object-cover max-h-56 sm:max-h-64 md:max-h-72 lg:max-h-96 xl:max-h-[500px]"
          src={urlFor(bannerData.image).url()} 
          alt="Banner"
        />
      </div>
    </div>
  );
};

export default Homebanner;
