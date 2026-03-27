---
"bridgerton": minor
---

Expand from 20 to 37 commands with full Bridge API parity:

- **customers**: add `update`, `delete`, `tos-link`, `kyc-link`, `tos-acceptance-link`, `transfers`
- **wallets**: add `list-all`, `total-balances`, `history`
- **liquidation**: add `update`, `all-drains`
- **virtual-accounts**: add `list-all`, `update`, `deactivate`, `reactivate`, `activity`, `all-activity`
- **external-accounts**: new subcommand group with `create`, `get`, `list`, `delete`
- **prefunded-accounts**: new subcommand group with `list`, `get`, `history`
