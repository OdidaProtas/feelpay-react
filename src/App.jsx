import { useEffect } from "react";
import useScript from "../hooks/useScript";

export default function App() {
  const FEELPAY_CLIENT_ID = import.meta.env.VITE_APP_FEELPAY_CLIENT_ID;
  const FEELPAY_CLIENT_SECRET = import.meta.env.VITE_APP_FEELPAY_CLIENT_SECRET;

  const { loading, error } = useScript(
    "https://feelpay.vercel.app/packages/v1"
  );

  useEffect(() => {
    const orderDetails = {
      element: "dreamfeel-pay-button",
      clientId: "e1c40a3f019f9d50",
      clientSecret: "45c9f56f0464e0b78e4e1918b3df520e",
      description: "",
      order: {
        // Default for one time order checkout.
        installments: 1,
        orderCompleteAfterInstallment: 1,
        vat: 16, // percentage
        amount: 3000,
        currency: "KES", //Only KES supported for now
        // Specify an array of order items.
        items: [
          {
            id: "1",
            name: "",
            price: 0,
            vat: 0,
            url: ``,
            image: "",
          },
        ],
      },
      onSuccess: (detail) => {
        // Handle success
        // const {feelpayCheckoutRequestID, feelpayCheckoutStatus, feelpayOrderId, ...} = detail
        console.log(detail);
      },
      onError: (err) => {
        // Handle error
        // {message:""}
        console.log(err);
      },
      // Run an action when innitialized!
      onInit: () => {},
      // Action when user cancels transaction!
      onUserCancel: () => {},
    };
    setTimeout(() => {
      const feelpay = new FeelPayWidget(orderDetails);
      feelpay.init().then((pay) => {});
    }, 1000);
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  return (
    <div>
      <div id="dreamfeel-pay-button"></div>
    </div>
  );
}
