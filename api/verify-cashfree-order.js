import { loadEnv } from 'vite';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { orderId } = req.query;
  if (!orderId) {
    return res.status(400).json({ message: 'Missing orderId' });
  }

  if (orderId === 'mock_success_123') {
    return res.status(200).json({
      order_id: 'mock_success_123',
      order_status: 'PAID',
      payment_session_id: 'mock_session_123',
      order_amount: 300,
      customer_details: {
        customer_name: 'Mock Customer',
        customer_email: 'mock@example.com',
        customer_phone: '9876543210'
      }
    });
  }

  // Load environment variables
  const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
  const appId = env.VITE_CASHFREE_APP_ID;
  const secretKey = env.CASHFREE_SECRET_KEY;
  const baseUrl = env.VITE_CASHFREE_MODE === 'production'
    ? 'https://api.cashfree.com/pg'
    : 'https://sandbox.cashfree.com/pg';

  try {
    const response = await fetch(`${baseUrl}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': '2023-08-01',
        'accept': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    // Cashfree order status can be: ACTIVE, PAID, EXPIRED, CANCELLED
    res.status(200).json({
      order_id: data.order_id,
      order_status: data.order_status,
      payment_session_id: data.payment_session_id,
      order_amount: data.order_amount
    });
  } catch (error) {
    console.error('Verify Order Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
