import axios from "axios";

const generateAccessToken = async () => {
  const respone = await axios({
    url: process.env.PAYPAL_BASE_URL + "/v1/oauth2/token",
    method: "post",
    data: "grant_type=client_credentials",
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_CLIENT_SECRET,
    },
  });
  return respone.data.access_token;
}

const initiatePaypal = async () => {
  const accessToken = await generateAccessToken();

  const respone = await axios({
    url: process.env.PAYPAL_BASE_URL + "/v2/checkout/orders",
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          items: [
            {
              name: "Game Account Purchase", // Replace with the actual item name
              description: "Purchase of game account", // Replace with the actual description
              unit_amount: {
                currency_code: "USD",
                value: "100.00", // Replace with the actual amount
              },
              quantity: "1", // Replace with the actual quantity
            },
          ],
          amount: {
            currency_code: "USD",
            value: "100.00", // Replace with the actual amount
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: "100.00", // Replace with the actual amount
              },
            },
          },
        },
      ],
      application_context: {
        return_url: process.env.GV_BASE_URL + "/api/payment-success", // Replace with your actual return URL
        cancel_url: process.env.GV_BASE_URL + "/api/payment-cancel", // Replace with your actual cancel URL
        shipping_preference: "NO_SHIPPING", // Set to "NO_SHIPPING" if you don't need shipping.
        user_action: "PAY_NOW", // Set to "PAY_NOW" to show the Pay Now button
        brand_name: "GameVault", // Replace with your brand name
        // locale: "en-US", // Set the locale for the PayPal UI
      },
    }),
  });
  return respone.data.links.find(link => link.rel === "approve").href;
}

export default initiatePaypal;