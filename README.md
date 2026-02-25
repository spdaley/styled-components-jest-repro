# styled-components Jest/jsdom perf repro

Small repro project for measuring Jest test-time changes between `styled-components@6.2.0` and `styled-components@6.3.9`.

## What this does

- Renders a compact but style-heavy tree (`createGlobalStyle`, dynamic styled props, keyframes).
- Runs in `jest` + `jsdom`.
- Supports A/B timing:
  - normal behavior
  - `createGlobalStyle` mocked to no-op (`SC_DISABLE_GLOBAL_STYLE_MOCK=1`)

## Setup

```bash
cd projects/styled-components-jest-repro
yarn install
```

## Single run

```bash
yarn test:single
```

No global style injection (A/B check):

```bash
yarn test:single:no-global
```

## Benchmark loop (median over 10 runs)

```bash
yarn bench:compare
```

Optional iteration count:

```bash
BENCH_ITERATIONS=20 yarn bench:compare
```

## Switch styled-components versions

```bash
yarn set:sc:620
yarn bench:compare

yarn set:sc:639
yarn bench:compare
```

## Share with maintainers

Provide:

1. Node version (`node -v`)
2. OS info
3. Output from `yarn bench:compare` on both versions
4. Any CPU profiles captured with:

```bash
NODE_OPTIONS="--cpu-prof --cpu-prof-dir=./tmp/profiles" yarn test:single
```
