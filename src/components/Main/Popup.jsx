"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Popup({ showPopup, setShowPopup }) {
  if (!showPopup) return null;
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      supplierToken: "6a2799d20dd27bd1398dcc10",
      platform: "Bar Bending Machine Importer Popup",
      platformEmail: "shreeshaktiinfratech@gmail.com",
      name: formData.get("contactPerson"),
      email: formData.get("email"),
      company: 'NA',
      phone: formData.get("phone"),
      product: "Bar Bending Machine",
      place: "Delhi",
      message: formData.get("message"),
    };
    if (!data.phone || data.phone.length < 10)
      return toast.error("Enter Valid Phone Number");

    try {
      setLoading(true);
      const res = await axios.post("https://brandbnalo.com/api/form/add", data,
        { validateStatus: (status) => status >= 200 && status < 500 }
      );
      if (res.status >= 200 && res.status < 300) {
        setSubmitted(true);
        setTimeout(() => {
          e.target.reset();      // reset after UI change
        }, 100);
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      }
    } catch (err) {
      console.log("ERROR:", err?.response || err.message);
      toast.error("Something went wrong");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
      onClick={() => setShowPopup(false)}>
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl flex flex-col md:flex-row animate-fadeIn"
        onClick={(e) => e.stopPropagation()}>
        <div className="md:w-1/2 bg-gradient-to-br from-amber-400 to-amber-600 text-white p-8 hidden md:flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-3">Get Your Quote</h2>
            <p className="text-sm opacity-90">
              Tell us your requirements and we’ll get back with the best solution tailored for you.
            </p>
          </div>

          <img
            src="/1.png"
            alt="Quote"
            className="mt-4 rounded-lg object-contain h-70 w-full"
          />
        </div>

        <div className="md:w-1/2 p-6 relative">
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>

          {submitted ? (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold text-amber-600">
                🎉 Thank You!
              </h2>
              <p className="text-gray-800 mt-2">
                Your enquiry has been submitted successfully.
              </p>
              <p className="text-gray-700 text-sm mt-1">
                Our team will contact you shortly.
              </p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-semibold mb-4 text-amber-500 text-center">
                Fill the details
                <div className="w-20 h-1 bg-[#3C2012] mx-auto mt-1 rounded"></div>
              </h3>

              <form className="flex flex-col gap-3 text-black" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="contactPerson"
                  required
                  placeholder="Your Name"
                  className="border border-amber-200 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  className="border border-amber-200 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="border border-amber-200 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <textarea
                  rows={4}
                  name="message"
                  placeholder="Your Requirement"
                  className="border border-amber-200 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400"
                ></textarea>

                <button type="submit" disabled={loading} className="bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition font-medium">
                  {loading ? "Submitting..." : "Submit Inquiry"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}