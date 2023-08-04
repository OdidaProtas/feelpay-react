import { useEffect } from "react";
import useScript from "../hooks/useScript";

export default function App() {
  const { loading, error } = useScript(
    "https://feelpay.vercel.app/packages/v1"
  );

  useEffect(() => {
    const orderDetails = {
      element: "dreamfeel-pay-button",
      clientId: "afc17c43531c2441",
      clientSecret: "67d6bc1a5843172286ce6ca701f80094",
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
    const feelpay = new FeelPayWidget(orderDetails);
    feelpay.init().then((pay) => {
      console.log(pay);
    });
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  return (
    <div>
      <div id="dreamfeel-pay-button"></div>
    </div>
  );
}
