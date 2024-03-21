# Contributing to Airdrop-Farmer

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with Github

We use github to host code, to track issues and feature requests, as well as accept pull requests.

## We Use [Github Flow](https://guides.github.com/introduction/flow/index.html), So All Code Changes Happen Through Pull Requests

Pull requests are the best way to propose changes to the codebase (we use [Github Flow](https://guides.github.com/introduction/flow/index.html)). We actively welcome your pull requests:

`.env.local` - Required environment variables

```
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-UID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[KEY]
MANAGER_PRIVATE_KEY=[PRIVATE-KEY]
NEXT_PUBLIC_SUBSCRIPTION_CONTRACT_ADDRESS=[CONTRACT-ADDERSS]
NEXT_PUBLIC_ANKR_ETHEREUM_HTTP_API=https://rpc.ankr.com/eth
NEXT_PUBLIC_ANKR_OPTIMISM_HTTP_API=https://rpc.ankr.com/optimism
NEXT_PUBLIC_ANKR_ARBITRUM_HTTP_API=https://rpc.ankr.com/arbitrum
NEXT_PUBLIC_ANKR_POLYGON_HTTP_API=https://rpc.ankr.com/polygon
NEXT_PUBLIC_ANKR_BSC_HTTP_API=https://rpc.ankr.com/bsc
NEXT_PUBLIC_ANKR_AVALANCHE_HTTP_API=https://rpc.ankr.com/avalanche
NEXT_PUBLIC_ANKR_FANTOM_HTTP_API=https://rpc.ankr.com/fantom
NEXT_PUBLIC_ANKR_ZKSYNC_HTTP_API=https://rpc.ankr.com/zksync_era
NEXT_PUBLIC_ANKR_SEPOLIA_HTTP_API=https://rpc.ankr.com/eth_sepolia
NEXT_PUBLIC_ANKR_BASE_HTTP_API=https://rpc.ankr.com/base
NEXT_PUBLIC_ANKR_SCROLL_HTTP_API=https://rpc.ankr.com/scroll
```

1. Fork the repo and create your branch from `master`.
2. Create a `.env.local` file and fill out with the required variables.
3. If you've added code that should be tested, add tests.
4. If you've changed APIs, update the documentation.
5. Ensure the test suite passes.
6. Make sure your code lints.
7. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issues](https://github.com/rvVcNk2p/airdrop-farmer/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](); it's that easy!

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can. [A stackoverflow sample question](http://stackoverflow.com/q/12488905/180626) includes sample code that _anyone_ with a base setup can run and reproduce it
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

People _love_ thorough bug reports. I'm not even kidding.

## Use a Consistent Coding Style

I'm again borrowing these from [Facebook's Guidelines](https://github.com/facebook/draft-js/blob/a9316a723f9e918afde44dea68b5f9f39b7d9b00/CONTRIBUTING.md)

- 2 spaces for indentation rather than tabs
- You can try running `npm run lint` for style unification

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
