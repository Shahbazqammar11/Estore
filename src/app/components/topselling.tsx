"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

// Define the types for TypeScript
interface TopSellingItem {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: {
    asset: {
      _ref: string;
    };
  };
}

const TopSelling: React.FC = () => {
  const [topSelling, setTopsSlling] = useState<TopSellingItem[]>([]);

  // Fetch new arrival data from Sanity
  const fetchTopSelling = async () => {
    const query = `*[_type == "topSelling"] | order(_createdAt desc)[0...4] {
      _id,
      title,
      description,
      price,
      image {
        asset {
          _ref
        }
      }
    }`;

    try {
      const result = await client.fetch(query);
      setTopsSlling(result);
    } catch (error) {
      console.error("Error fetching topselling:", error);
    }
  };

  useEffect(() => {
    fetchTopSelling();
  }, []);

  return (
    <div className="my-8">
      <h2 className=" text-center text-3xl font-bold mb-6">Top Selling</h2>
      
      {/* Grid layout for images */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topSelling.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded shadow">
            {/* Image */}
            <img
              className="w-full h-40 object-cover mb-4"
              src={urlFor(item.image).url()}
              alt={item.title}
            />
            
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{item.description}</p>
            </div>

            {/* Price */}
            <div className="mt-4 text-lg font-bold text-gray-800">
              ${item.price.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <Link href="/topselling" target="_blank" rel="noopener noreferrer">
          <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-700 transition">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TopSelling;
