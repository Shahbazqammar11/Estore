"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
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

const TopSellingPage: React.FC = () => {
  const [newTopSelling, setNewTopSelling] = useState<TopSellingItem[]>([]);

  // Fetch all new arrival items from Sanity
  const fetchAllNewTopSelling = async () => {
    const query = `*[_type == "topSelling"] {
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
      setNewTopSelling(result);
    } catch (error) {
      console.error("Error fetching Top selling:", error);
    }
  };

  useEffect(() => {
    fetchAllNewTopSelling();
  }, []);

  return (
    <div className="my-8">
      <h1 className=" text-center  text-3xl font-bold mb-6">All Top Selling</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {newTopSelling.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded shadow">
            <img
              className="w-full h-40 object-cover mb-4"
              src={urlFor(item.image).url()}
              alt={item.title}
            />
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-2">{item.description}</p>
            <div className="mt-4 text-lg font-bold text-gray-800">
              ${item.price.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingPage;
