"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

// Define types for TypeScript
interface CustomerComment {
  name: string;
  comment: string;
  date: string;
}

const CustomerComments: React.FC = () => {
  const [comments, setComments] = useState<CustomerComment[]>([]);

  // Fetch comments from Sanity
  const fetchComments = async () => {
    const query = `*[_type == "customerComment"] | order(date desc)[0..3] { 
      name, 
      comment, 
      date
    }`;

    try {
      const result = await client.fetch(query);
      setComments(result);
    } catch (error) {
      console.error("Error fetching customer comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (!comments.length) {
    return <div>Loading comments...</div>;
  }

  return (
    <div className="bg-gray-100 w-full mx-auto p-4 mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">What Our Happy Customers Say</h2>

      {/* Grid layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {comments.map((comment, index) => (
          <div 
            key={index} 
            className="flex flex-col items-start justify-start bg-white shadow-md p-6 space-y-4">
            {/* Comment details */}
            <div className="text-xl font-semibold">{comment.name}</div>
            <div className="text-gray-700">{comment.comment}</div>
            <div className="text-sm text-gray-500">Date: {new Date(comment.date).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerComments;
