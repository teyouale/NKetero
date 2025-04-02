import React from 'react';
import Herosection from './_components/herosection';
import TrendingCategories from './_components/TrendingCategories';
import PopularServices from './_components/PopularServices';
import TopSalon from './_components/TopSalon';

const ClientHomePage = (props) => {
  return (
    <div>
      <Herosection />
      <TrendingCategories />
      <PopularServices />
      <TopSalon />

      {/* <Catagoies /> */}
      {/* <BusinessList /> */}
      {/* <DataTable data={tasks} columns={columns} /> */}
    </div>
  );
};

export default ClientHomePage;
