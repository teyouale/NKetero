import Catagoies from './components/catagoies';
import BusinessList from './components/BusinessList';

const ClientHomePage = (props) => {
  return (
    <div>
      <Catagoies />
      <BusinessList />
      {/* <DataTable data={tasks} columns={columns} /> */}
    </div>
  );
};

export default ClientHomePage;
