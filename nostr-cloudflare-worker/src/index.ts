/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { validateEvent, verifySignature, getSignature, getEventHash, getPublicKey, generatePrivateKey } from 'nostr-tools'

export interface Env {
	PRIVKEY: string;
  }




export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	  if (request.method === 'POST') {
		try {
		  // Parse the JSON data from the incoming request
		  const eventData: { content?: string } = await request.json();
		 
  
		  // Update the event content with the received data
		  let event = {
			id: '',
			sig: '',
			kind: 1,
			created_at: Math.floor(Date.now() / 1000),
			tags: [],
			content: eventData.content || '', // Set event.content to the received data
			pubkey: getPublicKey(env.PRIVKEY),
		  };

		  event.id = getEventHash(event);
		  event.sig = getSignature(event, env.PRIVKEY);


		  console.log(JSON.stringify(["EVENT", event]))
  
		  // Continue with the rest of your code...
  
		  // Define the URL
		  let url = 'https://nostr.mutinywallet.com/event';
  
		  // Define the POST request options
		  let requestOptions = {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(["EVENT", event])
		  };
  
		  // Send the Fetch POST request and return the response
		  try {
			let response = await fetch(url, requestOptions);
			// Handle the response data here if needed
			console.log('Response:', response);
			return response;
		  } catch (error) {
			console.error('Error:', error);
			// Handle errors here if needed
			return new Response('Error occurred', { status: 500 });
		  }
		x} catch (error) {
		  console.error('Error parsing JSON:', error);
		  return new Response('Invalid JSON data', { status: 400 });
		}
	  } else {
		return new Response('Invalid request method', { status: 400 });
	  }
	},
  };
