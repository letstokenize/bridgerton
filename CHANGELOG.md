# bridgerton

## 0.2.0

### Minor Changes

- Add API parity for customers, wallets, liquidation, virtual accounts, and prefunded accounts.

  **New domains:**

  - `prefunded-accounts` — list, get, history

  **New commands:**

  - `customers update`, `delete`, `tos-link`, `kyc-link`, `tos-acceptance-link`, `transfers`
  - `wallets list-all`, `total-balances`, `history`
  - `liquidation update`, `all-drains`
  - `virtual-accounts list-all`, `update`, `deactivate`, `reactivate`, `activity`, `all-activity`
  - `external-accounts` — create, get, list, delete
