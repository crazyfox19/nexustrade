export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const mockFAQ: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I increase my maximum leverage for perpetual swaps?',
    answer: 'To increase your leverage limits, navigate to Settings > Trading Preferences > Risk Management. Premium accounts can access up to 100x leverage on selected pairs after completing the advanced risk assessment. Note that higher leverage increases liquidation risk.',
  },
  {
    id: 'faq-2',
    question: 'What are the current API rate limits for high-frequency trading?',
    answer: 'For standard accounts, the rate limit is 100 requests per second. Premium Pro accounts can be scaled up to 1,000 req/s upon request. WebSocket connections are limited to 300 active topics per stream.',
  },
  {
    id: 'faq-3',
    question: 'How do I enable 2FA using hardware security keys?',
    answer: 'Go to Settings > Security > Two-Factor Authentication. Click "Add Hardware Key" and follow the on-screen instructions. We support FIDO2/WebAuthn compatible keys including YubiKey 5 series and Google Titan keys.',
  },
  {
    id: 'faq-4',
    question: 'Can I withdraw to a non-custodial wallet during platform maintenance?',
    answer: 'Withdrawals are temporarily paused during scheduled maintenance windows. You can queue withdrawal requests which will be processed automatically once maintenance is complete. Emergency withdrawals to whitelisted addresses can be requested through priority support.',
  },
];
