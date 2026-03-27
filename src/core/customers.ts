import { bridge } from './client.js'

/** Create a new customer. */
export const createCustomer = (data: Record<string, unknown>) =>
  bridge.post('/customers', data)

/** Get a customer by ID. */
export const getCustomer = (id: string) =>
  bridge.get(`/customers/${id}`)

/** List all customers. */
export const listCustomers = () =>
  bridge.get('/customers')

/** Update a customer by ID. */
export const updateCustomer = (id: string, data: Record<string, unknown>) =>
  bridge.put(`/customers/${id}`, data)

/** Delete a customer by ID. */
export const deleteCustomer = (id: string) =>
  bridge.delete(`/customers/${id}`)

/** Create a Terms of Service link. */
export const createTosLink = () =>
  bridge.post('/customers/tos_links', {})

/** Get a KYC link for a customer. */
export const getKycLink = (id: string, params?: Record<string, string>) =>
  bridge.get(`/customers/${id}/kyc_link`, params)

/** Get a TOS acceptance link for a customer. */
export const getTosAcceptanceLink = (id: string) =>
  bridge.get(`/customers/${id}/tos_acceptance_link`)

/** List transfers for a customer. */
export const listCustomerTransfers = (id: string) =>
  bridge.get(`/customers/${id}/transfers`)
