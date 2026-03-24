import { bridge } from './client.js'

/** Create a virtual account for a customer. */
export const createVirtualAccount = (customerId: string, data: Record<string, unknown>) =>
  bridge.post(`/customers/${customerId}/virtual_accounts`, data)

/** Get a virtual account by ID. */
export const getVirtualAccount = (customerId: string, id: string) =>
  bridge.get(`/customers/${customerId}/virtual_accounts/${id}`)

/** List virtual accounts for a customer. */
export const listVirtualAccounts = (customerId: string) =>
  bridge.get(`/customers/${customerId}/virtual_accounts`)
