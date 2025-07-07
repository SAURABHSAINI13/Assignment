import { useParams } from 'react-router-dom';
import { useState } from 'react';

const EventRegistration = () => {
  const { eventId } = useParams();
  const username = localStorage.getItem('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = () => {
    fetch(`https://eventify-api.mockapi.io/api/v1/events/${eventId}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, user: username })
    }).then(() => alert("Registered successfully"));
  };

  const handlePayment = async () => {
  const res = await fetch(`${API_BASE}/create-order`, { method: 'POST' });
  const data = await res.json();

  const options = {
    key: "YOUR_KEY",
    amount: data.amount,
    currency: "INR",
    name: "Eventify",
    order_id: data.id,
    handler: function (response) {
      alert("Payment Successful!");
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};


fetch("http://localhost:3000/api/paytm/payment", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    orderId: "ORDER123",
    amount: "999.00",
    customerId: "USER_01"
  })
})

  return (
    <div className="p-4">
      <h2>Register for Event #{eventId}</h2>
      <input placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <input placeholder="Phone" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
export default EventRegistration;