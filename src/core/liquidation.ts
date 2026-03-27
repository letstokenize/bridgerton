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

/** List drain history for a liquidation address. */
export const listDrains = (customerId: string, liquidationAddressId: string) =>
  bridge.get(`/customers/${customerId}/liquidation_addresses/${liquidationAddressId}/drains`)

/** Update a liquidation address. */
export const updateLiquidation = (customerId: string, liquidationAddressId: string, data: Record<string, unknown>) =>
  bridge.put(`/customers/${customerId}/liquidation_addresses/${liquidationAddressId}`, data)

/** List drain activity across all customers. */
export const listAllDrains = () =>
  bridge.get('/liquidation_addresses/drains')
