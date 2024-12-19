// @ts-nocheck
import { motion } from 'framer-motion';
import { toast } from '@/client/hooks/use-toast';
import UserProfile from './UserProfile/UserProfile';
import BusinessProfile from './BusinessProfile/Businessprofile';
import { Separator } from '@ketero/ui';
import { Button } from '@ketero/ui';
import { useUser } from '@/client/services/user';

const ProfilePage = (props) => {
  const { user, loading } = useUser();

  return (
    <div className="flex-1 lg:max-w-2xl space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold tracking-tight text-primary"
          >
            Profile
          </motion.h1>
        </div>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <UserProfile user={user} />
      {user.role === 'Business' && (
        <>
          <Separator />
          <BusinessProfile />
        </>
      )}
    </div>
  );
};

export default ProfilePage;
