import { bridge } from './client.js'

/** Create a liquidation address for a customer. */
export const createLiquidation = (customerId: string, data: Record<string, unknown>) =>
  bridge.post(`/customers/${customerId}/liquidation_addresses`, data)

/** Get a liquidation address by ID. */
export const getLiquidation = (id: string) =>
  bridge.get(`/liquidation_addresses/${id}`)

/** List liquidation addresses for a customer. */
export const listLiquidations = (customerId: string) =>
  bridge.get(`/customers/${customerId}/liquidation_addresses`)
