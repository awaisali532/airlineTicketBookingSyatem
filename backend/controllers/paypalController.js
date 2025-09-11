import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const PAYPAL_API = 'https://api-m.sandbox.paypal.com';
const client = process.env.PAYPAL_CLIENT_ID;
const secret = process.env.PAYPAL_SECRET;

const auth = Buffer.from(`${client}:${secret}`).toString('base64');

export const createOrder = async (req, res) => {
  const { totalAmount } = req.body;

  try {
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: totalAmount,
          },
        }],
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ id: response.data.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const captureOrder = async (req, res) => {
  const { orderID } = req.body;

  try {
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
