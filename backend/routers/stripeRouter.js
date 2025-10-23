const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51SL7v8Ap2n0uexvkhYtWBbnIKHCPjet8udQEP1N4EmRpPZMJ1VPNKAzyN6VfYZfi8L3dzqHrP9cJa5AMSx4rDvyl00StbpOB6v'); // المفتاح السري بتاعك

router.post('/create-checkout-session', async (req, res) => {
    try {
        const { products } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ error: 'No products provided' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: products.map((p) => ({
                price_data: {
                    currency: 'usd',
                    product_data: { name: p.title },
                    unit_amount: Math.round(p.price * 100),
                },
                quantity: p.quantity,
            })),
            success_url: 'http://localhost:4200/success',
            cancel_url: 'http://localhost:4200/cancel',
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error('Stripe error:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
