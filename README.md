# bridged

CLI for [Bridge.xyz](https://www.bridge.xyz) stablecoin infrastructure.

## Overview

```bash
# check exchange rates
bridged rates --from usd --to eur

# list customers
bridged customers list

# create a liquidation address
bridged liquidation create <customer-id> \
  --chain tempo --currency usdc \
  --destination-address 0x... \
  --dest-rail tempo --dest-currency usdc

# list liquidation addresses
bridged liquidation list <customer-id>

# create a wallet on tempo
bridged wallets create <customer-id> --chain tempo

# create a transfer
bridged transfers create \
  --on-behalf-of <customer-id> \
  --source-rail bridge_wallet \
  --source-currency usdc \
  --dest-rail tempo \
  --dest-currency usdc \
  --dest-address 0x...

# run as MCP server
bridged --mcp
```

### Example: listing liquidation addresses

```
$ bridged liquidation list 357ca32a-9cb1-4463-8a93-b3564351397e

count: 2
data[2]:
  - id: b25eec6b-c4b1-44dd-940f-3ea8ade17b93
    chain: tempo
    address: 0x6b4d2af6c1bfb3c51e53743de68968af24db2440
    currency: usdc
    destination_payment_rail: tempo
    destination_currency: usdc
    destination_address: 0xdaed0c0966099128a5e8b728540c53fc000bce38
    state: active

  - id: 1435182b-3547-49c7-900f-818e7a361f98
    chain: evm
    address: 0xe917dacfffa3bc9a4079369eab17cd52b192fbd7
    currency: usdc
    destination_payment_rail: tempo
    destination_currency: usdc
    destination_address: 0xdaed0c0966099128a5e8b728540c53fc000bce38
    state: active
```

## Setup

```bash
bun install
bun run build
```

Create a `.env` file:

```
BRIDGE_API_KEY=sk-live-...
```

Environment is auto-detected from the key prefix — `sk-test-*` routes to sandbox, `sk-live-*` to production.

## License

MIT
