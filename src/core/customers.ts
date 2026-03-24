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
