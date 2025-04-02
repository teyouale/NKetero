import React from 'react';
import { MapPin } from '@phosphor-icons/react';
const Herosection = (props) => {
  return (
    <section className="relative bg-gradient-to-r from-pink-50 to-purple-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book your beauty appointment with ease
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover and book the best beauty salons and services in your area
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Your location"
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pribg-primary focus:border-transparent"
              />
            </div>
            <button className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-md font-medium transition-colors">
              Find Salons
            </button>
          </div>
        </div>
      </div>
      <div className="hidden lg:block absolute right-0 bottom-0 w-1/3 h-full">
        <img
          src="/placeholder.svg?height=600&width=500"
          alt="Herosection"
          width="500"
          height="600"
          className="h-full w-full object-cover object-left"
        />
      </div>
    </section>
  );
};

export default Herosection;
