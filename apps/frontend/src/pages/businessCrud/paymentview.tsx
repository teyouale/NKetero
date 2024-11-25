import React from 'react';
import { usePayments } from '@/client/services/payment';

const PaymentView = ({ businessId }: { businessId: string }) => {
  const { payments, loading } = usePayments(businessId);

  if (loading) return <p>Loading payments...</p>;

  return (
    <div>
      <h2>Payments</h2>
      <ul>
        {payments.map((payment) => (
          <li key={payment.id}>
            <p>Client: {payment.clientName}</p>
            <p>Amount: ${payment.amount}</p>
            <p>Date: {new Date(payment.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentView;
