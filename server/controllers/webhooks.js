import { Webhook } from 'svix';
import User from '../models/user.js';

// API controller function to manage Clerk user database
export const clerkWebhooks = async (req, res) => {
    try {
        // Create a svix instance with Clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verifying headers
        await whook.verify(req.body, {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        });

        // Getting data from request body
        const { data, type } = req.body;

        // Validate `type`
        if (!type || typeof type !== 'string') {
            return res.status(400).json({ success: false, message: 'Invalid event type' });
        }

        // Building switch cases for different events
        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data?.email_addresses?.[0]?.email_address || '',
                    name: `${data?.first_name || ''} ${data?.last_name || ''}`.trim(),
                    image: data?.image_url || '',
                    resume: '',
                };
                await User.create(userData);
                return res.status(200).json({ success: true });
            }

            case 'user.updated': {
                const userData = {
                    email: data?.email_addresses?.[0]?.email_address || '',
                    name: `${data?.first_name || ''} ${data?.last_name || ''}`.trim(),
                    image: data?.image_url || '',
                };
                const result = await User.findByIdAndUpdate(data.id, userData, { new: true });
                if (!result) {
                    return res.status(404).json({ success: false, message: 'User not found' });
                }
                return res.status(200).json({ success: true });
            }

            case 'user.deleted': {
                const result = await User.findByIdAndDelete(data.id);
                if (!result) {
                    return res.status(404).json({ success: false, message: 'User not found' });
                }
                return res.status(200).json({ success: true });
            }

            default:
                return res.status(400).json({ success: false, message: 'Unknown event type' });
        }
    } catch (error) {
        console.error("Webhook Error:", error.stack);
        return res.status(500).json({
            success: false,
            message: 'Webhooks Error',
            error: error.message,
        });
    }
};
