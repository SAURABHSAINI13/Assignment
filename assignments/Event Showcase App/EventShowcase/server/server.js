// server/server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/paytm/payment', (req, res) => {
  const { orderId, amount, customerId } = req.body;

  const fakeResponse = {
    success: true,
    message: 'Payment processed (mock)',
    orderId,
    amount,
    customerId,
    transactionId: 'TXN' + Math.floor(Math.random() * 1000000000),
    status: 'TXN_SUCCESS',
    paymentGateway: 'FAKE_PAYTM'
  };

  res.json(fakeResponse);
});

app.listen(3000, () => {
  console.log('🧪 Fake Paytm API running at http://localhost:3000');
});
