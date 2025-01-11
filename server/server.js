import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import './config/instrument.js';
import * as Sentry from '@sentry/node';
import mongoConnect from './config/connection.js';
import { clerkWebhooks } from './controllers/webhooks.js';

const app = express();

// Sentry Initialization
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
});

// Middlewares
app.use(cors());
app.use('/webhooks', express.raw({ type: 'application/json' })); // Raw body for webhook verification
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
await mongoConnect();

// Routes
app.get('/', (req, res) => {
    res.send('Hey Sanamika');
});

// Sentry Debugging Route (only for non-production environments)
if (process.env.NODE_ENV !== 'production') {
    app.get('/debug-sentry', (req, res) => {
        throw new Error('Testing Sentry error reporting!');
    });
}

app.post('/webhooks', clerkWebhooks);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start the Server
app.listen(process.env.PORT, () => {
    console.log('I Love You ❤️❤️');
});
