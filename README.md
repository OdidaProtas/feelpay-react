## Integrating with existing React App

1. Create the following hooks to enable us load feelpay to the React App

   1. useAsync to load the script asynchronously

   ```javascript
   import { useCallback, useEffect, useState } from "react";

   export function useAsync(callback, dependencies = []) {
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState();
     const [value, setValue] = useState();

     const callbackMemoized = useCallback(() => {
       setLoading(true);
       setError(undefined);
       setValue(undefined);
       callback()
         .then(setValue)
         .catch(setError)
         .finally(() => setLoading(false));
     }, dependencies);

     useEffect(() => {
       callbackMemoized();
     }, [callbackMemoized]);

     return { loading, error, value };
   }
   ```

   2. useScript to load feelpay library

   ```javascript
   import { useAsync } from "./useAsync";

   export default function useScript(url) {
     return useAsync(() => {
       const script = document.createElement("script");
       script.src = url;
       script.async = true;

       return new Promise((resolve, reject) => {
         script.addEventListener("load", resolve);
         script.addEventListener("error", reject);
         document.body.appendChild(script);
       });
     }, [url]);
   }
   ```

2. Create a feelpay button component, and instantiate feelpay inside a useEffect function

```jsx
import { useEffect } from "react";
import useScript from "../hooks/useScript";

export default function App() {
  const FEELPAY_CLIENT_ID = "";
  const FEELPAY_CLIENT_SECRET = "";

  const { loading, error } = useScript(
    "https://feelpay.vercel.app/packages/v1"
  );

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  return (
    <div>
      <div id="dreamfeel-pay-button"></div>
    </div>
  );
}
```

2. ## Preparing transaction details

You must keep your CLIENT_ID and CLIENT_SECRET hidden with .env variables, specific to your plaform.

```javascript
const orderDetails = {
  element: "dreamfeel-pay-button",
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
  description:"",
  order: {
    // Default for one time order checkout.
    installments: 1,
    orderCompleteAfterInstallment:1
    vat: 16, // percentage
    amount: 3000,
    currency:"KES",  //Only KES supported for now
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
    // const {feelPayCheckoutRequestID, feelPayCheckoutStatus, feelPayOrderId, ...} = detail
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
```

3. Instantiate feelpay on a script tag.

```javascript
  useEffect(() => {
    const orderDetails ={
  element: "dreamfeel-pay-button",
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
  description:"",
  order: {
    // Default for one time order checkout.
    installments: 1,
    orderCompleteAfterInstallment:1
    vat: 16, // percentage
    amount: 3000,
    currency:"KES",  //Only KES supported for now
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
    // const {feelPayCheckoutRequestID, feelPayCheckoutStatus, feelPayOrderId, ...} = detail
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
    }, 690);
  });
```

4. A button will appear "Checkout with feelpay". When clicked, a popup appears, where user can complete transaction.
