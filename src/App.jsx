import { useEffect, useState } from "react";

export default function App() {
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
      <feelpay-launcher
        clientSecret="0a7013c0fac16ea352b45cd5b52534bd"
        clientKey="e07fea12a51701c1"
        order="{}"
      />
    </div>
  );
}
