import { bridge } from './client.js'

/** Create a transfer. */
export const createTransfer = (data: Record<string, unknown>) =>
  bridge.post('/transfers', data)

/** Get a transfer by ID. */
export const getTransfer = (id: string) =>
  bridge.get(`/transfers/${id}`)

/** List all transfers. */
export const listTransfers = () =>
  bridge.get('/transfers')
