"use client";
import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client'; // Import your Sanity client

// Define the TypeScript type for brand data
interface Brand {
  _id: string;
  name: string;
}

const Brandsnames: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]); // State to hold brand data

  // Fetch the list of brands from Sanity
  const fetchBrands = async () => {
    const query = `*[_type == "brand"] { _id, name }`; // Sanity query to fetch brand names
    try {
      const result = await client.fetch(query);
      setBrands(result);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    fetchBrands(); // Call the fetchBrands function when the component mounts
  }, []);

  return (
    <div className="bg-gray-800 w-full py-2">
      {/* Flex container for brand names */}
      <div className="flex justify-between items-center w-full text-white text-center px-4 space-x-4">
        {brands.map((brand) => (
          <div
            key={brand._id} // Use _id as the key
            className="flex-1 text-sm md:text-lg lg:text-xl font-semibold py-2"
          >
            {brand.name} {/* Display the brand name */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brandsnames;
