// @ts-nocheck
import { Clock, Heart } from 'lucide-react';
import React from 'react';

const PopularServices = (props) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Popular Services
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'Classic Manicure',
              price: '$35',
              time: '45 min',
              image: '/placeholder.svg?height=200&width=300',
            },
            {
              name: 'Hair Coloring',
              price: '$120',
              time: '120 min',
              image: '/placeholder.svg?height=200&width=300',
            },
            {
              name: 'Facial Treatment',
              price: '$85',
              time: '60 min',
              image: '/placeholder.svg?height=200&width=300',
            },
            {
              name: 'Eyebrow Shaping',
              price: '$25',
              time: '30 min',
              image: '/placeholder.svg?height=200&width=300',
            },
            {
              name: 'Full Body Massage',
              price: '$95',
              time: '90 min',
              image: '/placeholder.svg?height=200&width=300',
            },
            {
              name: 'Hair Cut & Style',
              price: '$55',
              time: '60 min',
              image: '/placeholder.svg?height=200&width=300',
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={service.image || '/placeholder.svg'}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
                <button className="absolute top-3 right-3 h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 text-lg">
                  {service.name}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-primary font-semibold">
                    {service.price}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {service.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
