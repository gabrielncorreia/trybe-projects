// Deploys the site through the Pages workflow on GitHub, so what goes live is always what is on main.
// Pushes main when it has new commits (the push starts the workflow); otherwise re-runs the workflow.
import { execFileSync } from 'node:child_process';

const REPO = 'gabrielncorreia/trybe-projects';
const WORKFLOW = 'pages.yml';

const read = (cmd, args) => execFileSync(cmd, args, { encoding: 'utf8' }).trim();
const run = (cmd, args) => execFileSync(cmd, args, { stdio: 'inherit' });

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (read('git', ['branch', '--show-current']) !== 'main') {
  fail('Switch to main first: the site deploys from main.');
}
if (read('git', ['status', '--porcelain'])) {
  fail('Commit or stash your changes first: the workflow builds what is on GitHub, not your working tree.');
}

// GitHub's clock and this machine's can differ by a few seconds.
const started = Date.now() - 15000;
run('git', ['fetch', '--quiet', 'origin', 'main']);
if (read('git', ['rev-parse', 'HEAD']) !== read('git', ['rev-parse', 'origin/main'])) {
  run('git', ['push', 'origin', 'main']);
} else {
  console.log('main is already on GitHub; running the deploy again.');
  run('gh', ['workflow', 'run', WORKFLOW, '-R', REPO]);
}

// A new run takes a few seconds to show up.
let id;
for (let attempt = 0; attempt < 30 && !id; attempt += 1) {
  const [latest] = JSON.parse(read('gh', [
    'run', 'list', '-R', REPO, '--workflow', WORKFLOW, '--limit', '1', '--json', 'databaseId,createdAt',
  ]));
  if (latest && Date.parse(latest.createdAt) >= started) id = latest.databaseId;
  else await new Promise((resolve) => { setTimeout(resolve, 2000); });
}
if (!id) fail(`No deploy run showed up. Check https://github.com/${REPO}/actions`);

run('gh', ['run', 'watch', String(id), '-R', REPO, '--exit-status']);
console.log('Deployed: https://gabrielncorreia.github.io/trybe-projects/');
