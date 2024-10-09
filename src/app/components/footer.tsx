"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

// Define types for TypeScript
interface QuickLink {
  title: string;
  url: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

interface FooterData {
  quickLinks: QuickLink[];
  contactInfo: ContactInfo;
}

const Footer: React.FC = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  // Fetch footer data from Sanity
  const fetchFooterData = async () => {
    const query = `*[_type == "footer"][0]{
      quickLinks[]{title, url},
      contactInfo{phone, email, address}
    }`;

    try {
      const result = await client.fetch(query);
      setFooterData(result);
    } catch (error) {
      console.error("Error fetching footer data:", error);
    }
  };

  useEffect(() => {
    fetchFooterData();
  }, []);

  if (!footerData) {
    return <div>Loading footer data...</div>;
  }

  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* Quick Links Section */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Quick Links</h3>
          <ul>
            {footerData.quickLinks.map((link, index) => (
              <li key={index} className="mb-2">
                <a href={link.url} className="hover:text-gray-400" target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information Section */}
        <div>
          <h3 className="font-bold mb-4 text-lg">Contact Information</h3>
          <p className="mb-2">Phone: {footerData.contactInfo.phone}</p>
          <p className="mb-2">Email: {footerData.contactInfo.email}</p>
          <p className="mb-2">Address: {footerData.contactInfo.address}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
