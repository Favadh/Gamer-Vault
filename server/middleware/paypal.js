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

export const initiatePaypal = async (totalPrice, gameDetails) => {
  const accessToken = await generateAccessToken();

  const items = gameDetails.map(game => ({
    name: game.gameName,
    description: "Purchase of game account",
    unit_amount: {
      currency_code: "USD",
      value: game.price,
    },
    quantity: "1",
  }));

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
          items: items,
          amount: {
            currency_code: "USD",
            value: totalPrice.toString(),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: totalPrice.toString(),
              },
            },
          },
        },
      ],
      application_context: {
        return_url: process.env.GV_FRONTEND_URL + "/payment-verification", 
        cancel_url: process.env.GV_FRONTEND_URL + "/payment-verification",
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        brand_name: "GameVault",
        // locale: "en-US",
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
    // console.error("Cancelling the payment on paypal returned this:", error.response ? error.response.data : error.message);
    return error.response ? error.response.data : error.message;
  }

  
  

}