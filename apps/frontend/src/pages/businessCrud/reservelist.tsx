import React from 'react';
import { useReservations, useUpdateReservationStatus } from '@/client/services/reservation';
import { Button } from '@ketero/ui';

const ReservationList = ({ businessId }: { businessId: string }) => {
  const { reservations, loading } = useReservations(businessId);
  const { updateStatus, loading: statusLoading } = useUpdateReservationStatus();

  const handleStatusChange = (reservationId: string, status: string) => {
    updateStatus(reservationId, status);
  };

  if (loading) return <p>Loading reservations...</p>;

  return (
    <div>
      <h2>Client Reservations</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id} className="flex justify-between">
            <div>
              <p>{reservation.clientName}</p>
              <p>{reservation.serviceName}</p>
            </div>
            <div>
              <Button onClick={() => handleStatusChange(reservation.id, 'confirmed')} disabled={statusLoading}>
                Confirm
              </Button>
              <Button onClick={() => handleStatusChange(reservation.id, 'canceled')} disabled={statusLoading}>
                Cancel
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
