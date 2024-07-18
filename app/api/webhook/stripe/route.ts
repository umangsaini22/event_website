// import Stripe from 'stripe';
// import { NextResponse } from 'next/server';
// import { createOrder } from '@/lib/actions/order.actions';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

// export async function POST(request: Request) {
//   const body = await request.text();
//   console.log('Request body:', body);

//   const sig = request.headers.get('stripe-signature') as string;
//   console.log('Stripe signature:', sig);

//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
//     console.log('Constructed event:', event);
//   } catch (err) {
//     console.error('Webhook signature verification failed.', (err as Error).message);
//     return NextResponse.json({ message: 'Webhook error', error: (err as Error).message }, { status: 400 });
//   }

//   const eventType = event.type;

//   if (eventType === 'checkout.session.completed') {
//     const { id, amount_total, metadata } = event.data.object;

//     const order = {
//       stripeId: id,
//       eventId: metadata?.eventId || '',
//       buyerId: metadata?.buyerId || '',
//       totalAmount: amount_total ? (amount_total / 100).toString() : '0',
//       createdAt: new Date(),
//     };

//     try {
//       const newOrder = await createOrder(order);
//       return NextResponse.json({ message: 'OK', order: newOrder }, { status: 200 });
//     } catch (orderError) {
//       console.error('Failed to create order:', (orderError as Error).message);
//       return NextResponse.json({ message: 'Order creation failed', error: (orderError as Error).message }, { status: 500 });
//     }
//   }

//   return new Response('', { status: 200 });
// }
// import Stripe from 'stripe';
// import { NextResponse } from 'next/server';
// import { createOrder } from '@/lib/actions/order.actions';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

// export async function POST(request: Request) {
//   const body = await request.text();
//   const sig = request.headers.get('stripe-signature');
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

//   try {
//     if (!sig) {
//       throw new Error('Missing Stripe signature');
//     }

//     // Verify webhook signature
//     const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

//     // Handle the event type
//     switch (event.type) {
//       case 'checkout.session.completed':
//         const session = event.data.object;

//         // Extract relevant session data
//         const { id, amount_total, metadata } = session;

//         // Prepare order data
//         const order = {
//           stripeId: id,
//           eventId: metadata?.eventId || '',
//           buyerId: metadata?.buyerId || '',
//           totalAmount: amount_total ? (amount_total / 100).toString() : '0',
//           createdAt: new Date(),
//         };

//         // Attempt to create the order
//         try {
//           const newOrder = await createOrder(order);
//           console.log('Order created:', newOrder);
//           return NextResponse.json({ message: 'OK', order: newOrder }, { status: 200 });
//         } catch (orderError: any) { // Type assertion here
//           console.error('Failed to create order:', orderError);
//           return NextResponse.json({ message: 'Order creation failed', error: (orderError as Error).message, status: 500 });
//         }

//       default:
//         console.warn('Unhandled event type:', event.type);
//         return new Response('', { status: 200 });
//     }
//   } catch (error: any) { // Type assertion here
//     console.error('Error processing webhook event:', error);
//     return NextResponse.json({ message: 'Error processing webhook event', error: (error as Error).message, status: 400 });
//   }
// }

import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/actions/order.actions';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    if (!sig) {
      throw new Error('Missing Stripe signature');
    }

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    // Log the event for debugging
    console.log('Received event:', event);

    // Handle the event type
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;

        // Extract relevant session data
        const { id, amount_total, metadata } = session;

        // Prepare order data
        const order = {
          stripeId: id,
          eventId: metadata?.eventId || '',
          buyerId: metadata?.buyerId || '',
          totalAmount: amount_total ? (amount_total / 100).toString() : '0',
          createdAt: new Date(),
        };

        // Attempt to create the order
        try {
          const newOrder = await createOrder(order);
          console.log('Order created:', newOrder);
          return NextResponse.json({ message: 'OK', order: newOrder }, { status: 200 });
        } catch (orderError: any) {
          console.error('Failed to create order:', orderError);
          return NextResponse.json({ message: 'Order creation failed', error: orderError.message, status: 500 });
        }

      default:
        console.warn('Unhandled event type:', event.type);
        return new Response('', { status: 200 });
    }
  } catch (error: any) {
    console.error('Error processing webhook event:', error);
    return NextResponse.json({ message: 'Error processing webhook event', error: error.message, status: 400 });
  }
}






