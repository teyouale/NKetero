import Catagoies from './components/catagoies';
import BusinessList from './components/BusinessList';
import UserProfile from '../Profile/UserProfile/UserProfile';
const ClientHomePage = (props) => {
  return (
    <div>
      <Catagoies />
      <BusinessList />
      <UserProfile />
      {/* <DataTable data={tasks} columns={columns} /> */}
    </div>
  );
};

export default ClientHomePage;
