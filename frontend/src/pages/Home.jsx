// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { Button } from "@headlessui/react";
import { ChevronRight, Truck, Shield, Award, CreditCard } from 'lucide-react';
import { products,sportsCategories } from "@/data/products";
import { Card,CardContent } from "@/components/ui/card";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/categories");
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Categories response is not an array", data);
        }
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/products/${category.name}`);
  };

  return (
    <>
       {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Sports for Everyone
              <span className="block text-blue-200">At Unbeatable Prices</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Discover thousands of products for over 70 sports. Quality gear at prices that make sport accessible to all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 font-semibold">
                  Shop Now
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/products/Running">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3 font-semibold">
                  Discover Running
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    {/* Sports Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Sports</h2>
            <p className="text-xl text-gray-600">Find the perfect gear for your favorite sport</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {sportsCategories.map((sport) => (
             <Card key={sport.id}  onClick={() => handleCategoryClick(sport)}
             className="group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer">
             <CardContent className="p-6 text-center">
             <div className={`w-16 h-16 ${sport.color} rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform`}>
             {sport.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{sport.name}</h3>
            </CardContent>
            </Card>
            ))}
          </div>
        </div>
      </section>
    <Footer/>
    </>
  );
};

export default Home;
