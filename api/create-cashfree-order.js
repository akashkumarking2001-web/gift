export default async function handler(req, res) {
  // Add CORS headers for the cross-domain iframe requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Handle both snake_case (mobile) and camelCase (web)
  const body = req.body;
  const amount = body.amount;
  const customerId = body.customer_id || body.customerId || `guest_${Date.now()}`;
  const customerName = body.customer_name || body.customerName || 'Customer';
  const customerEmail = body.customer_email || body.customerEmail || 'support@giftmagic.co';
  const customerPhone = (body.customer_phone || body.customerPhone || '9876543210').toString().replace(/\D/g, '');

  console.log(`[API] Creating Cashfree order for: ${customerEmail}`);

  if (!amount || !customerId || !customerEmail || customerPhone.length < 10) {
    console.error('[API] Validation failed:', { amount, customerId, customerEmail, customerPhone });
    return res.status(400).json({ message: 'Missing or invalid required fields (amount, email, or 10-digit phone)' });
  }

  // Use process.env variables (Node environment)
  const appId = process.env.VITE_CASHFREE_APP_ID;
  const secretKey = process.env.CASHFREE_SECRET_KEY;
  const mode = process.env.VITE_CASHFREE_MODE || 'sandbox';

  const baseUrl = mode === 'production' 
    ? 'https://api.cashfree.com/pg/orders' 
    : 'https://sandbox.cashfree.com/pg/orders';

  try {
    let returnUrl = body.return_url || body.returnUrl;
    const mode = process.env.VITE_CASHFREE_MODE || 'sandbox';
    
    // IF production, force the return URL to use the production domain to avoid whitelisting issues
    if (mode === 'production' && returnUrl && returnUrl.includes('localhost')) {
        console.log('[API] Rewriting localhost return_url to production domain');
        returnUrl = returnUrl.replace(/http:\/\/localhost:\d+/g, 'https://www.giftmagic.beauty');
    }

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'x-client-id': appId || '',
        'x-client-secret': secretKey || '',
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_amount: amount,
        order_currency: 'INR',
        order_id: `ord_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        customer_details: {
          customer_id: customerId.substring(0, 50),
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone.length > 10 ? customerPhone.slice(-10) : customerPhone
        },
        order_meta: {
          return_url: returnUrl || `https://www.giftmagic.beauty/(user)/history?order_id={order_id}`,
          payment_methods: ""
        },
        order_note: body.order_note || body.orderNote || 'Gift Magic Purchase'
      })
    });

    const data = await response.json();
    console.log(`[API] Cashfree Response status: ${response.status}`);

    if (!response.ok) {
      console.error('[API] Cashfree error details:', data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('[API] Internal creation error:', error);
    return res.status(500).json({ message: 'Merchant server error creating order' });
  }
}
