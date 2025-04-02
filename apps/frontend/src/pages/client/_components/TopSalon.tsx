// ts-nocheck
import { Star, MapPin } from 'lucide-react';
import React from 'react';

const TopSalon = (props) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Top Beauty Salons
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'Elegance Beauty Studio',
              rating: 4.9,
              reviews: 128,
              location: 'Downtown',
              image: '/placeholder.svg?height=200&width=300',
            },
            {
              name: 'Glow & Glamour',
              rating: 4.8,
              reviews: 96,
              location: 'Westside',
              image: '/placeholder.svg?height=200&width=300',
            },
            {
              name: 'Pure Bliss Spa',
              rating: 4.7,
              reviews: 112,
              location: 'Northside',
              image: '/placeholder.svg?height=200&width=300',
            },
          ].map((salon, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={salon.image || '/placeholder.svg'}
                  alt={salon.name}
                  // fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                  <span className="font-medium">{salon.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 text-lg">
                  {salon.name}
                </h3>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {salon.location}
                  <span className="mx-2">•</span>
                  {salon.reviews} reviews
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="text-xs bg-pink-100 text-primary px-2 py-1 rounded-full">
                    Hair
                  </span>
                  <span className="text-xs bg-pink-100 text-primary px-2 py-1 rounded-full">
                    Nails
                  </span>
                  <span className="text-xs bg-pink-100 text-primary px-2 py-1 rounded-full">
                    Makeup
                  </span>
                </div>
                <button className="w-full mt-4 border border-pink-500 text-primary hover:bg-pink-50 font-medium py-2 rounded-md transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-6 py-2 rounded-md transition-colors">
            View All Salons
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopSalon;
