# nostr-cloudflare-worker

## Problem Statement
I needed a straightforward API endpoint that would accept a POST request containing the content I wanted to publish on Nostr. The endpoint should handle all the necessary tasks, such as signing with the private key, and then publish the content to all known relays on Nostr.

## Project Overview
This project allows you to send a POST request to the endpoint with a JSON body containing your desired text for posting on Nostr. Addional  The JSON body format is as follows:

```json
{
  "content": "your text, you want to be posted to Nostr",
  "account": "botNr1" //this name has to be defined Environment Configuration
}
```

## Environment Configuration
To use this project, you need to create a variable called ACCOUNTSPK. You can set this variable using the Cloudflare dashboard, which is essential because it allows you to encrypt the environment variable, ensuring the security of your private keys.

### ACCOUNTSPK Format
```json
{
  "botNr1": "private Key of botNr1 in hex format",
  "botNr2": "private Key of botNr2 in hex format",
  // more private keys can be added here
}
```



## Integration with Blastr
This API endpoint utilizes [Blastr](https://github.com/MutinyWallet/blastr) project, which is a Nostr Cloudflare Workers proxy relay that publishes to all known online relays. By utilizing this API endpoint in conjunction with Blastr, you can easily post content to Nostr and relay it to the Nostr network.






