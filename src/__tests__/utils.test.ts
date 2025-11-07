import { getSwapQuote } from '@/lib/utils';

describe('getSwapQuote', () => {
  it('should return a mock quote', async () => {
    const quote = await getSwapQuote('0x...', '0x...', '1');
    expect(quote).toBe('1');
  });
});
