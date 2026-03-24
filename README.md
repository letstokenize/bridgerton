# bridged

CLI for [Bridge.xyz](https://www.bridge.xyz) stablecoin infrastructure.

## Features

- Manage **customers**, **wallets**, **transfers**, **liquidation addresses**, and **virtual accounts**
- Query live **exchange rates**
- Built-in **MCP server** for AI agents
- Sandbox and production environments

## Overview

```bash
# check exchange rates
bridged rates --from usd --to eur

# list customers
bridged customers list

# create a wallet on tempo
bridged wallets create <customer-id> --chain tempo

# create a liquidation address
bridged liquidation create <customer-id> --chain tempo --currency usdc --destination-address 0x...

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

## Setup

```bash
bun install
bun run build
```

Set environment variables:

```
BRIDGE_API_KEY=your-api-key
BRIDGE_SANDBOX=true  # optional, for sandbox
```

## License

MIT
