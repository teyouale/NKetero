import Catagoies from './components/catagoies';
import BusinessList from './components/BusinessList';
import UserProfile from '../Profile/UserProfile/UserProfile';
import BusinessPage from './components/BusinessPage';

// import DataTable from '../reservation/section/listTable/data-table';
const ClientHomePage = (props) => {
  return (
    <div>
      <Catagoies />
      <BusinessList />
      {/* <BusinessPage /> */}
      <UserProfile />
      {/* <DataTable data={tasks} columns={columns} /> */}
    </div>
  );
};

export default ClientHomePage;
