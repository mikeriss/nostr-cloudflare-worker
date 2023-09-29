import { validateEvent, verifySignature, getSignature, getEventHash, getPublicKey, generatePrivateKey } from 'nostr-tools'

export interface Env {
	ACCOUNTSPK: {
		[key: string]: string ;
	  };
	  API_HOST: string
  }


export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	if (request.method === 'POST') {
		try {
			// Parse the JSON data from the incoming request
			const eventData: { content?: string; account?: string } = await request.json();

			// Check if an account name is provided in the request
			const accountName = eventData.account; // Default to moscowTimeBot if not provided

			// Get the private key for the specified account from ACCOUNTSPK
			const privateKey = env.ACCOUNTSPK[accountName!];
			console.log(privateKey)

			if (!privateKey) {
				return new Response('Invalid account name', { status: 400 });
			}
		 
		  // Update the event content with the received data
		  let event = {
			id: '',
			sig: '',
			kind: 1,
			created_at: Math.floor(Date.now() / 1000),
			tags: [],
			content: eventData.content || '', // Set event.content to the received data
			pubkey: getPublicKey(privateKey),
		  };

		  event.id = getEventHash(event);
		  event.sig = getSignature(event, privateKey);


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
		} catch (error) {
		  console.error('Error parsing JSON:', error);
		  return new Response('Invalid JSON data', { status: 400 });
		}
	  } else {
		return new Response('Invalid request method', { status: 400 });
	  }
	  
	},
  };
