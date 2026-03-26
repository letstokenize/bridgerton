import { bridge } from './client.js'

/** List all prefunded accounts. */
export const listPrefundedAccounts = () =>
  bridge.get('/prefunded_accounts')

/** Get a prefunded account by ID. */
export const getPrefundedAccount = (id: string) =>
  bridge.get(`/prefunded_accounts/${id}`)

/** Get funding history for a prefunded account. */
export const getPrefundedAccountHistory = (id: string) =>
  bridge.get(`/prefunded_accounts/${id}/history`)
