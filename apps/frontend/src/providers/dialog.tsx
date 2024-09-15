// import ClientReservationDialog from '../pages/client/dialog/reservation';
// import BusinessDialog from '../pages/dashboard/dialogs/business';
// import ReservationDialog from '../pages/dashboard/dialogs/reservation';

import BusinessDialog from '../pages/dashboard/dialogs/business';

type Props = {
  children: React.ReactNode;
};

export const DialogProvider = ({ children }: Props) => {
  return (
    <>
      {children}

      <div id="dialog-root">
        <BusinessDialog />
        {/* <BusinessDialog />
        <ReservationDialog />
        <ClientReservationDialog /> */}
        {/* Nice to meet you */}
        {/* {isResumeLoaded && <>Hello</>} */}
      </div>
    </>
  );
};
