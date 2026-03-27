# bridgerton

CLI and MCP server for [Bridge.xyz](https://www.bridge.xyz) stablecoin infrastructure.

## Install

```bash
npm install -g bridgerton
```

Or run directly:

```bash
npx bridgerton --help
```

## Setup

On first run with no arguments, bridgerton prompts for your API key interactively. Or configure it explicitly:

```bash
bridgerton configure api-key sk-test-...
```

You can also set it via environment variable:

```bash
export BRIDGE_API_KEY=sk-test-...
```

Environment is auto-detected from the key prefix — `sk-test-*` routes to sandbox, `sk-live-*` to production.

## Usage

```bash
# check exchange rates
bridgerton rates --from usd --to usdc

# list customers
bridgerton customers list

# create a customer
bridgerton customers create -f John -l Doe -e john@example.com

# create a wallet on tempo
bridgerton wallets create <customer-id> --chain tempo

# create a liquidation address
bridgerton liquidation create <customer-id> \
  --chain tempo --currency usdc \
  --destination-address 0x...

# create a transfer
bridgerton transfers create \
  --on-behalf-of <customer-id> \
  --source-rail bridge_wallet --source-currency usdc \
  --dest-rail tempo --dest-currency usdc \
  --dest-address 0x...

# set default output format
bridgerton configure format json
```

## Commands

| Group | Commands |
|---|---|
| `customers` | `create`, `get`, `list`, `update`, `delete`, `tos-link`, `kyc-link`, `tos-acceptance-link`, `transfers` |
| `wallets` | `create`, `get`, `list`, `list-all`, `total-balances`, `history` |
| `transfers` | `create`, `get`, `list` |
| `liquidation` | `create`, `get`, `list`, `update`, `drains`, `all-drains` |
| `external-accounts` | `create`, `get`, `list`, `delete` |
| `virtual-accounts` | `create`, `get`, `list`, `list-all`, `update`, `deactivate`, `reactivate`, `activity`, `all-activity` |
| `prefunded-accounts` | `list`, `get`, `history` |
| `configure` | `api-key`, `format`, `show` |
| `rates` | Get current exchange rates |

All commands support `--format toon|json|yaml|md|jsonl` and `--help`.

## MCP Server

Register as an MCP server for AI agents:

```bash
bridgerton mcp add
```

Or run directly in stdio mode:

```bash
bridgerton --mcp
```

## Development

```bash
bun install
bun run build        # tsc + chmod
bun run typecheck    # tsc --noEmit
```

## License

MIT
