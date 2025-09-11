import React from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const paymentDetails = state?.paymentDetails;

  return (
    <div>
      <h2>Payment Successful!</h2>
      <p>Transaction ID: {paymentDetails?.id}</p>
      <p>Status: {paymentDetails?.status}</p>
      <p>Payer Email: {paymentDetails?.payer?.email_address}</p>
    </div>
  );
};

export default PaymentSuccess;
