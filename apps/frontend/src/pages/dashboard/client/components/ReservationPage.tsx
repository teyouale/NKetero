import React from "react";
import { useLocation } from "react-router-dom";

const Reserve = () => {
  const location = useLocation();
  const { category } = location.state || {};

  if (!category) {
    return <p>No category selected!</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reserve: {category.name}</h1>
      {/* Add reservation form or details here */}
    </div>
  );
};

export default Reserve;
