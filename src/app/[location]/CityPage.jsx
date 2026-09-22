"use client";
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import Link from 'next/link';
import FormSection from '@/components/Main/FormSection';
import { useParams } from 'next/navigation';
import { ChevronRight, CheckCircle } from "lucide-react";
import CoreProduct from '@/components/Home/CoreProduct';
import IndustriesSection from '@/components/Home/IndustriesSection';
export default function CityPage({}) {
  const params = useParams();

const formatCityName = (slug) => {
    if (!slug) return "India";

    const decodedSlug = decodeURIComponent(slug);

    return decodedSlug
        .replace(/\((.*?)\)/g, " ($1)")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

const citySlug = params?.location?.includes("-in-")
    ? params.location.split("-in-")[1]
    : null;

const cityName = citySlug ? formatCityName(citySlug) : "India";

    const cards = [
        {
            title: "What is a Bar Bending Machine?",
            content:
                "A bar bending machine is an advanced construction tool used to bend steel reinforcement bars (TMT bars) into required shapes for structural applications. These machines ensure consistent accuracy and speed, which is essential for modern infrastructure projects like bridges, highways, and buildings.",
        },
        {
            title: "Imported Bar Bending Machines – Market Demand",
            content:
                "India has seen a growing demand for imported bar bending machines due to their advanced technology and efficiency. Recent trade data shows hundreds of import shipments and increasing buyers across India, highlighting strong market demand for imported equipment.",
        },
    ];

    const sections = [
        {
            title: "Features of Our Imported Machines",
            items: [
                "High bending capacity (up to 40–50 mm TMT bars)",
                "Automatic & semi-automatic models",
                "Heavy-duty motor with low power consumption",
                "Accurate angle control system",
                "मजबूत gearbox for long life",
                "Easy operation with safety features",
            ],
        },
        {
            title: `Applications in ${cityName}`,
            items: [
                "Residential & commercial construction",
                "Flyovers & metro projects",
                "Highway and road construction",
                "Industrial plants & factories",
                "Infrastructure and government projects",
            ],
        },
        {
            title: "Types of Bar Bending Machines We Import",
            items: [
                "Automatic Bar Bending Machine",
                "Semi-Automatic Rebar Bending Machine",
                "Spiral / Stirrup Bending Machine",
                "Heavy-Duty Industrial Bar Benders",
                "Portable Bar Bending Machines",
            ],
        },
        {
            title: `Why Choose Us in ${cityName}?`,
            items: [
                "Trusted importer with industry experience",
                "High-quality imported machines",
                "Competitive pricing & bulk deals",
                "Ready stock availability",
                `Fast delivery across ${cityName}`,
                "After-sales support & spare parts",
            ],
        },
    ];

    const images = [
        '/1.png',
        '/2.png',
        '/3.png',
        "/ctaimg1.webp",
        "/feature2.webp",
        "/whychooseimg.webp",
    ];

    const [current, setCurrent] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (<>
        <section className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/banner-1.webp')" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-extrabold text-white leading-tight relative text-center"
            >
                Bar Bending Machine Importer in {cityName}
            </motion.h1>
        </section>

        <CoreProduct isButton={true} />

        <section className="grid md:grid-cols-2 gap-10 items-center bg-amber-50 py-10 px-4 md:px-15 text-black">
            <div className="space-y-4">
                <h1 className="text-4xl font-bold">Bar Bending Machine Importer in {cityName}</h1>
                <p className="text-lg">
                    Looking for a reliable <Link href={"/"} className='text-amber-500 font-bold'>Bar Bending Machine Importer in {cityName}?</Link> Shree Shakti Infratech is  a leading importer and supplier of high-quality rebar bending machines designed for modern construction and infrastructure projects. Our imported machines are known for precision, durability, and high performance, making them ideal for contractors, builders, and construction companies.
                </p>
                <p className="text-lg">
                    {cityName} is one of India’s fastest-growing construction hubs, with continuous demand for efficient machinery. Our imported bar bending machines help improve productivity, reduce manual labor, and ensure accurate bending of steel bars for all types of construction work.
                </p>
            </div>
            <div className="relative w-full h-75 md:h-96 rounded-2xl overflow-hidden shadow-sm">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt="About Shree Shakti"
                        className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 
                            ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
                    />
                ))}
            </div>
        </section>

        <section className="py-10 px-4 md:px-15 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-amber-200"
                    >
                        <h3 className="text-2xl font-semibold mb-4 text-amber-500 text-center">{card.title}</h3>
                        <p className="text-gray-900">{card.content}</p>
                    </div>
                ))}
            </div>
        </section>

        <IndustriesSection />

        <section className="py-16 px-8 md:px-16 space-y-16">
            {sections.map((section, index) => (
                <div key={index}>
                    <h2 className="text-3xl font-semibold mb-6 text-amber-500 text-center">{section.title}</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {section.items.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                            >
                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                                <span className="text-gray-800">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>

        <section className="bg-[#3C2012] py-10 px-4 md:px-15 w-full">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-white md:max-w-2xl">
                    <a href='tel:+918826544443' target='blank' className="text-3xl md:text-5xl font-bold mb-3">
                        +91 8826544443
                    </a>

                    <p className="text-lg text-amber-200 mb-2">
                        Looking for the best bar bending machine importer in {cityName}?
                    </p>

                    <p className="text-gray-200">
                        Shree Shakti Infratech provides high-quality imported machinery
                        with expert support. Let’s discuss your requirements and find
                        the perfect solution for your construction projects.
                    </p>
                </div>

                <div className="flex-shrink-0">
                    <a href='tel:+918826544443' target='blank' className="bg-amber-500 hover:bg-amber-600 text-[#3C2012] font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-lg hover:scale-105 transform">
                        Get in Touch
                    </a>
                </div>
            </div>
        </section>

        <FormSection />
    </>)
}
