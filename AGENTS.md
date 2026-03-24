# bridged

Bridge.xyz stablecoin infrastructure CLI. Built with incur.

## Architecture

One incur router CLI (`cli.ts`) with subcommand groups for each Bridge API domain. `cli.fetch` provides HTTP API + MCP for free.

```
src/
├── cli.ts              # incur router CLI — all commands
├── bin.ts              # Entry point — cli.serve()
├── index.ts            # Library exports
└── core/
    ├── client.ts       # Bridge API fetch wrapper (auth, base URL)
    ├── customers.ts    # Customers API
    ├── wallets.ts      # Wallets API
    ├── transfers.ts    # Transfers API
    ├── liquidation.ts  # Liquidation addresses API
    ├── virtual-accounts.ts  # Virtual accounts API
    └── exchange-rates.ts    # Exchange rates API
```

## Key Design Decisions

- **incur subcommand groups**: `customers`, `wallets`, `transfers`, `liquidation`, `virtual-accounts` as sub-CLIs
- **core/client.ts**: thin fetch wrapper, reads `BRIDGE_API_KEY` and `BRIDGE_SANDBOX` from env
- **Production**: `https://api.bridge.xyz/v0`, **Sandbox**: `https://api.sandbox.bridge.xyz/v0`
- **Bun + local incur**: `"incur": "file:../incur"`

## Development

```bash
bun install
bun run build        # tsc + chmod + bun link
bun run typecheck    # tsc --noEmit
```

## Environment

- `BRIDGE_API_KEY` — Bridge API key (required)
- `BRIDGE_SANDBOX` — set to `true` to use sandbox API (optional)

## Commit Rules

- Atomic commits, conventional messages (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`)
- Always push after committing
