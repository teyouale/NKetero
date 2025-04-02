import { TrendingUp } from 'lucide-react';
import React from 'react';

const TrendingCategories = (props) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Trending Categories
          </h2>
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp className="h-4 w-4" />
            <span className="font-medium">Popular this week</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'Hair Styling', icon: '✂️' },
            { name: 'Makeup', icon: '💄' },
            { name: 'Nails', icon: '💅' },
            { name: 'Facials', icon: '✨' },
            { name: 'Massage', icon: '💆‍♀️' },
            { name: 'Eyebrows', icon: '👁️' },
          ].map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="font-medium text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500 mt-1">120+ salons</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingCategories;
