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

  if (respone.status !== 200) {
    throw new Error("Failed to generate PayPal access token");
  }

  return respone.data.access_token;
}

export const initiatePaypal = async () => {
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
        return_url: process.env.GV_FRONTEND_URL + "/payment-success", 
        cancel_url: process.env.GV_FRONTEND_URL + "/payment-success",
        shipping_preference: "NO_SHIPPING", // Set to "NO_SHIPPING" if you don't need shipping.
        user_action: "PAY_NOW", // Set to "PAY_NOW" to show the Pay Now button
        brand_name: "GameVault", // Your brand name
        // locale: "en-US", // Set the locale for the PayPal UI
      },
    }),
  });

  if (respone.status !== 201) {
    throw new Error("Failed to initiate PayPal payment");
  }

  return respone.data.links.find(link => link.rel === "approve").href;
}

export const capturePayment = async (orderId) => {
  const accessToken = await generateAccessToken();
  console.log(`Capturing payment for order ID: ${orderId}`);
  try{
    
  const response = await axios({
    url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
  } catch (error) { 
    console.error("Error capturing payment:", error.response ? error.response.data : error.message);
    throw new Error("Failed to capture PayPal payment");
  }

  
  

}