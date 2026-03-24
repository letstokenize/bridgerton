import { bridge } from './client.js'

/** Get current exchange rates. */
export const getExchangeRates = (from: string, to: string) =>
  bridge.get('/exchange_rates', { from, to })
