'use client'
import { Phone } from "lucide-react";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { handleCallClick, handleWhatsappClick } from "@/lib/tracking";

const StickyButtons = () => {
    const pathname = usePathname();
    const adminLayout = pathname.startsWith("/admin")
    if (adminLayout) return null;
    return (<>
   <a
  href="https://wa.me/+918826544443"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat on WhatsApp with Shree Shakti Infratech"
  className="block fixed bottom-22 right-5 z-40 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition"
  onClick={() => handleWhatsappClick({ source: "Sticky Button" })}
>
  <FaWhatsapp size={28} />
</a>

<a
  href="tel:+918826544443"
  aria-label="Call Shree Shakti Infratech"
  className="block fixed bottom-7.5 right-5 z-40 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition"
  onClick={() => handleCallClick({ source: "Sticky Button" })}
>
  <Phone size={27} />
</a>
    </>);
};

export default StickyButtons;