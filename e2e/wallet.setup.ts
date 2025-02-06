import { defineWalletSetup } from '@synthetixio/synpress';
import { MetaMask } from '@synthetixio/synpress/playwright';
import type { BrowserContext, Page } from '@playwright/test';

// Set your wallet constants
const SEED_PHRASE = 'test test test test test test test test test test test junk';
const PASSWORD = 'SynpressIsAwesomeNow!!!';

// Define the setup configuration
const setup = defineWalletSetup(PASSWORD, async (context: BrowserContext, walletPage: Page) => {
    // Initialize MetaMask with the current context and page
    const metamask = new MetaMask(context, walletPage, PASSWORD);

    // Import the wallet using the seed phrase
    await metamask.importWallet(SEED_PHRASE);

    // You can add additional setup steps here if needed
    // For example:
    // await metamask.addNetwork({ networkName: 'Your Network' });
    // await metamask.switchNetwork('Your Network');
});

// Export the setup with a hash for caching
export default {
    ...setup,
    hash: 'wallet-setup-v1', // You can increment this when you need to invalidate the cache
};