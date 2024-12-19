
import { ScrollArea } from '@radix-ui/react-scroll-area';
import Header from './components/header';
import { Outlet } from 'react-router-dom';

const ClientLayout = (props) => {
  return (
    // <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
    <div className=" h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <ScrollArea orientation="vertical" className="h-screen">
        <Header />
        <Outlet />
        {/* <Footer /> */}
      </ScrollArea>
    </div>
  );
};

export default ClientLayout;
