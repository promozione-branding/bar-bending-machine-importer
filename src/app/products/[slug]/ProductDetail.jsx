"use client";
import Image from "next/image";
import { Heart, ShoppingCart, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import Popup from "@/components/Main/Popup";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";
import CartSidebar from "@/components/Main/CartSidebar";
import { handleWhatsappClick, handleCallClick } from "@/lib/tracking";

export default function ProductDetail({ product, relatedProducts = [] }) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [showPopup, setShowPopup] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const formData = new FormData(e.target);

    try {
      const res = await fetch(
        "https://formsubmit.co/shreeshaktiinfratech@gmail.com",
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        setStatus("✅ Thank you! Your message has been sent.");
        e.target.reset(); // clear form
      } else {
        setStatus("❌ Oops! Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("❌ Failed to send. Please check your connection.");
    }
  };

  const addToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = storedCart.findIndex(
      (item) => item.name === product.name
    );

    let updatedCart;

    if (existingIndex !== -1) {
      updatedCart = storedCart.map((item, index) =>
        index === existingIndex
          ? { ...item, qty: (item.qty || 1) + 1 }
          : item
      );

      toast.success("Quantity updated");
    } else {
      updatedCart = [...storedCart, { ...product, qty: 1 }];

      toast.success("Added to cart");
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const sections = [];
  let currentSection = null;

  // Group content by h2
  product.description.forEach((block) => {
    if (block.type === "h2") {
      if (currentSection) sections.push(currentSection);
      currentSection = { title: block.text, content: [] };
    } else {
      currentSection?.content.push(block);
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const updateCart = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    };

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  if (currentSection) sections.push(currentSection);

  return (<>
    <section className="px-4 md:px-10 py-10 bg-amber-50">
      <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        <div className="space-y-4 md:sticky md:top-24 h-fit">
          <div className="w-full h-[350px] md:h-[450px] bg-white rounded-xl shadow-lg border overflow-hidden flex items-center justify-center">
            {activeImage.isVideo ? (
              <iframe
                width="100%"
                height="100%"
                src={activeImage.src.replace("watch?v=", "embed/")}
                title="Product Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            ) : (
              <Image
                src={activeImage.src}
                alt={product.name}
                width={600}
                height={400}
                className="object-contain w-full h-full"
              />
            )}
          </div>

          <div className="flex gap-3 overflow-x-auto">
            {[product.image, ...(product.images || [])].map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 rounded-lg border overflow-hidden flex-shrink-0
                  ${activeImage.src === img.src
                    ? "ring-2 ring-amber-500"
                    : "hover:ring-1"
                  }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={100}
                  height={100}
                  className="object-contain w-full h-full"
                />
              </button>
            ))}
            {product.videoUrl && (
              <button
                onClick={() => {
                  let videoSrc = product.videoUrl;

                  // Convert to embed format
                  if (videoSrc.includes("youtu.be/")) {
                    videoSrc = `https://www.youtube.com/embed/${videoSrc.split("youtu.be/")[1].split("?")[0]
                      }`;
                  } else if (videoSrc.includes("watch?v=")) {
                    videoSrc = videoSrc
                      .replace("watch?v=", "embed/")
                      .split("&")[0];
                  }

                  setActiveImage({
                    src: videoSrc,
                    alt: `${product.name} Video`,
                    isVideo: true,
                  });
                }}
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg border shadow-sm overflow-hidden flex-shrink-0 ${activeImage.isVideo ? "ring-2 ring-yellow-500" : ""
                  }`}
              >
                <Image
                  src={`https://img.youtube.com/vi/${product.videoUrl.split("youtu.be/")[1]?.split("?")[0] ||
                    product.videoUrl.split("v=")[1]?.split("&")[0]
                    }/hqdefault.jpg`}
                  alt={`${product.name} Video Thumbnail`}
                  width={100}
                  height={100}
                  unoptimized
                  className="object-cover w-full h-full"
                />
                <span className="absolute inset-0 flex items-center justify-center text-white text-xl bg-black/40">
                  ▶
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <h1 className="text-2xl md:text-4xl font-bold text-[#3C2012]">
            {product.name}
          </h1>

          <p className="text-xl font-bold text-amber-500">
            ₹ {product.price}/Piece <a
  href="tel:+918826544443"
  onClick={() => handleCallClick({ obj: product, source: "Product Page" })}
  className="ml-2 transition hover:underline hover:text-amber-500 text-base text-[#3C2012]"
>
  Get Latest Price
</a>
          </p>

          <div className="flex flex-col lg:flex-row gap-4 flex-wrap">
            <button onClick={() => { addToCart(product); setIsCartOpen(true) }} className="flex items-center justify-center gap-2 bg-[#3C2012] text-white px-6 py-3 rounded-lg hover:bg-amber-500 transition font-semibold">
              <ShoppingCart size={18} />
              Add to Cart
            </button>

<a
  href={`https://wa.me/+918826544443?text=Hi, I have seen your product on https://barbendingmachineimporter.com and I am interested in ${product.name}`}
  target="_blank"
  onClick={() => handleWhatsappClick({ obj: product, source: "Product Page" })}
  className="flex items-center justify-center gap-2 border border-green-500 text-green-500 px-6 py-3 rounded-lg hover:bg-green-500 hover:text-white transition font-semibold"
>
  <FaWhatsapp size={18} />
  WhatsApp Now
</a>

            <button onClick={() => setShowPopup(true)} className="flex items-center justify-center gap-2 border border-amber-500 text-amber-500 px-6 py-3 rounded-lg hover:bg-amber-500 hover:text-white transition font-semibold">
              <MessageCircle size={18} />
              Enquire Now
            </button>
          </div>

          <div className="bg-white rounded-xl shadow border mt-6 overflow-hidden">
            <h2 className="bg-amber-500 text-white px-4 py-3 font-semibold">
              Specifications
            </h2>

            <div className="divide-y">
              {product.specs?.map((spec, i) => (
                <div
                  key={i}
                  className="flex justify-between px-4 py-3 text-sm md:text-base"
                >
                  <span className="text-gray-700 font-medium">
                    {spec.label}
                  </span>
                  <span className="text-gray-600">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 px-4">
        <h2 className="text-3xl font-bold text-[#3C2012] mb-6 text-center flex flex-col justify-center items-center">
          Product Overview
          <span className="block h-1 w-30 bg-amber-500 mt-2 rounded-sm justify-self-center"></span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-lg transition" >
              <h3 className="text-xl font-semibold text-[#3C2012] mb-4 border-l-4 border-[#3C2012] pl-3">
                {section.title}
              </h3>

              {section.content.map((block, j) => {
                if (block.type === "p") {
                  return (
                    <p
                      key={j}
                      className="text-gray-600 leading-relaxed mb-4"
                      dangerouslySetInnerHTML={{ __html: block.text }}
                    />
                  );
                }

                if (block.type === "ul") {
                  return (
                    <ul key={j} className="space-y-2">
                      {block.items.map((item, k) => (
                        <li
                          key={k}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <CheckCircle
                            size={18}
                            className="text-green-600 mt-1"
                          />
                          <span
                            dangerouslySetInnerHTML={{ __html: item }}
                          />
                        </li>
                      ))}
                    </ul>
                  );
                }
              })}
            </div>
          ))}
          <div className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-lg transition flex flex-col h-full">
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-[#3C2012] mb-4 border-l-4 border-[#3C2012] pl-3">
                Get in Touch
              </h3>

              <p className="text-black text-base mb-2">
                If you are looking for a dependable Bar Bending Machine Importer, Shree
                Shakti Infratech provides the perfect combination of quality,
                performance, and affordability.
              </p>

              <p className="text-black text-sm mb-2">
                Contact us today to get expert advice and the best machine for your
                project.
              </p>
            </div>

            <div className="mt-auto flex justify-center pt-4">
              <button onClick={() => setShowPopup(true)}
                className="flex items-center gap-2 border border-amber-500 text-amber-500 px-6 py-3 rounded-lg hover:bg-amber-500 hover:text-white transition font-semibold"
              >
                <MessageCircle size={18} />
                Contact Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Related Products */}
    {relatedProducts?.length > 0 && (
      <div className="p-4 md:p-8">
        <h2 className="text-2xl md:text-5xl text-center text-amber-500 font-semibold mb-6 flex flex-col justify-center items-center">
          Related Products
          <span className="block h-1 w-30 bg-[#3C2012] mt-4 rounded-sm justify-self-center"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {relatedProducts.map((product) => (
            <Link href={`/products/${product?.slug}`} key={product.id} className="group border border-gray-200 hover:border-gray-400 rounded-xl p-2 bg-white shadow-sm hover:shadow-lg transition flex flex-col h-full">
              <div className="h-60 w-82 bg-gray-50 rounded-lg mb-2 flex items-center justify-center overflow-hidden!">
                <img
                  src={product.image?.src}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex flex-col flex-grow px-2">
                <h3 className="text-lg items-center font-semibold text-gray-700 group-hover:text-gray-900 line-clamp-2 min-h-[3.5rem]">
                  {product.name}
                </h3>

                <p className="text-black my-1">
                  Model: {product.model}
                </p>

                <div className="mt-auto flex text-black gap-1">
                  Category:
                  <span className="inline-block capitalize text-sm bg-[#ffe7db] text-[#3C2012] px-3 py-1 rounded-full">
                    {product.category.replace(/-/g, " ")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )}

    <div className="flex justify-center items-center mb-8">
      <Link href="/products">
        <button className="px-6 py-2 font-bold bg-[#3C2012] text-white rounded-lg hover:bg-[#2e180d] transition" >
          Explore More
        </button>
      </Link>
    </div>

    <Popup showPopup={showPopup} setShowPopup={setShowPopup} />

    <CartSidebar
      isOpen={isCartOpen}
      setIsOpen={setIsCartOpen}
      cartItems={cartItems}
      setCartItems={setCartItems}
    />
  </>);
}