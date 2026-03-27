import { bridge } from './client.js'

/** Create a wallet for a customer. */
export const createWallet = (customerId: string, data: Record<string, unknown>) =>
  bridge.post(`/customers/${customerId}/wallets`, data)

/** Get a wallet by ID. */
export const getWallet = (customerId: string, walletId: string) =>
  bridge.get(`/customers/${customerId}/wallets/${walletId}`)

/** List wallets for a customer. */
export const listWallets = (customerId: string) =>
  bridge.get(`/customers/${customerId}/wallets`)

/** List all wallets across all customers. */
export const listAllWallets = () =>
  bridge.get('/wallets')

/** Get total balances across all wallets. */
export const getWalletTotalBalances = () =>
  bridge.get('/wallets/total_balances')

/** Get history for a wallet. */
export const getWalletHistory = (walletId: string) =>
  bridge.get(`/wallets/${walletId}/history`)
