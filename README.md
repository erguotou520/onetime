# One-time share app

Want to share message or file between devices with security? Like burn after reading? [Try this app online](https://onetime.erguotou.me/)!

You can deploy this app yourself using [Vercel](https://vercel.com/) and [Deta](https://deta.sh/). Thanks for them.

## Features

- Open source, means you can control your data
- Burn after reading, only once for security
- All free

## Limit
Limitted by Vercel and Deta if they have limits.

## Deploy step
1. Register [Vercel](https://vercel.com/) and [Deta](https://deta.sh/)
2. Create a new project in Deta and Copy the [Project Keys](https://web.deta.sh/home/{username}/{projectName}/settings/)
3. Import this repo to vercel, on the build setting page, provide an environment variable named `DETA_PROJECT_KEY` with the copied value above. Then click the deploy button!
4. Bind custom domain in Vercel if you want.