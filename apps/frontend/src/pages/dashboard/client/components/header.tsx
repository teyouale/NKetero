import { UserNav } from './user-nav';
import { Button } from '@ketero/ui';

const Header = (props) => {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your tasks for this month!
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button>My Reservation</Button>
        <UserNav />
      </div>
    </div>
  );
};

export default Header;
