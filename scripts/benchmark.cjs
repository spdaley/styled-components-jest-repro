#!/usr/bin/env node
const { spawnSync } = require('node:child_process');
const { performance } = require('node:perf_hooks');

const ITERATIONS = Number(process.env.BENCH_ITERATIONS || 10);
const RUN_COMPARE = process.argv.includes('--compare');

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function runCase(name, extraEnv = {}) {
  const times = [];
  for (let i = 0; i < ITERATIONS; i += 1) {
    const start = performance.now();
    const result = spawnSync(
      process.execPath,
      [
        './node_modules/.bin/jest',
        '--runInBand',
        '--no-cache',
        '--coverage=false',
        'test/regression.spec.jsx',
        '-t',
        'renders heavy styled tree'
      ],
      {
        env: { ...process.env, ...extraEnv },
        stdio: 'ignore'
      }
    );

    if (result.status !== 0) {
      console.error(`Case '${name}' failed at iteration ${i + 1}. Exit code: ${result.status}`);
      process.exit(result.status || 1);
    }

    times.push(performance.now() - start);
  }

  const med = median(times);
  const min = Math.min(...times);
  const max = Math.max(...times);

  return { name, times, med, min, max };
}

function printResult(result) {
  console.log(`\n${result.name}`);
  console.log(`  runs: ${result.times.length}`);
  console.log(`  median: ${(result.med / 1000).toFixed(3)}s`);
  console.log(`  min: ${(result.min / 1000).toFixed(3)}s`);
  console.log(`  max: ${(result.max / 1000).toFixed(3)}s`);
}

const baseline = runCase('baseline');
printResult(baseline);

if (RUN_COMPARE) {
  const noGlobal = runCase('SC_DISABLE_GLOBAL_STYLE_MOCK=1', {
    SC_DISABLE_GLOBAL_STYLE_MOCK: '1'
  });
  printResult(noGlobal);

  const diffMs = baseline.med - noGlobal.med;
  const pct = baseline.med === 0 ? 0 : (diffMs / baseline.med) * 100;
  console.log(`\nmedian delta: ${(diffMs / 1000).toFixed(3)}s (${pct.toFixed(1)}%)`);
}
