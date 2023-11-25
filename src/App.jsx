import { useEffect, useState } from "react";
import useScript from "../hooks/useScript";

export default function App() {
  const FEELPAY_CLIENT_ID = import.meta.env.VITE_APP_FEELPAY_CLIENT_ID;
  const FEELPAY_CLIENT_SECRET = import.meta.env.VITE_APP_FEELPAY_CLIENT_SECRET;

  const [amount, setAmount] = useState(1);

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
    <div className="lg:px-48 min-h-screen dark:bg-gray-900">
      <div className="text-center">
        <div className="flex justify-center pt-24 pb-20 ">
          <img
            className="w-80"
            src="https://feelpay.io/_app/immutable/assets/logo-transparent.558d9349.png"
            alt=""
          />
        </div>
        <h1 className="text-7xl dark:text-white font-bold">
          Reactjs Widget Demo{" "}
        </h1>
        <p className=" dark:text-white mt-9">
          An example of FeelPay seamlessly integrated into a React App, the
          world's most popular web framework
        </p>
        <div className="mt-9 justify-center gap-9 flex">
          <a
            href="https://github.com/OdidaProtas/feelpay-react"
            target="blank"
            className="text-sky-400  underline dark:text-blue-400"
          >
            View This Page Source Code
          </a>
          <a
            href="https://feelpay-docs.deno.dev/docs/frameworks/react"
            target="blank"
            className="text-sky-400  underline dark:text-blue-400"
          >
            View React Integration Guide
          </a>
        </div>
      </div>
      <div className="my-9">
        <div>
          <label
            for="amount"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter an amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="KES 1"
            required
          />
        </div>
      </div>
      <div id="dreamfeel-pay-button"></div>
    </div>
  );
}
