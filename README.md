# nostr-cloudflare-worker

## Problem Statement
I needed an API endpoint to send a POST request with a string that would be posted on Nostr. To accomplish this, I created a Cloudflare Workers project that serves as an API endpoint for posting content to Nostr.

Project Overview
This project allows you to send a POST request to the endpoint with a JSON body containing your desired text for posting on Nostr. The JSON body format is as follows:

```json
{
  "content": "your text, you want to be posted to Nostr"
}
```

## Environment Configuration
To use this project, you need to create a variable called PRIVKEY. Using the Cloudflare dashboard is essential because it allows you to encrypt the environment variable, ensuring the security of your private key.

# Integration with Blastr
This API endpoint utilizes [Blastr](https://github.com/MutinyWallet/blastr) project, which is a Nostr Cloudflare Workers proxy relay that publishes to all known online relays. By utilizing this API endpoint in conjunction with Blastr, you can easily post content to Nostr and relay it to the Nostr network.




