import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const REMOTE_USER = 'root';
const REMOTE_HOST = 'guangzhou2c2g.mo7.cc';
const REMOTE_DIR = '/var/www/mo7tech.com/html';

function run(cmd) {
  console.info(`\x1b[36m> ${cmd}\x1b[0m`);
  execSync(cmd, { stdio: 'inherit', shell: true });
}

if (!existsSync('./html')) {
  console.error('\x1b[31m❌ 错误: 本地 ./html 目录不存在，部署终止。\x1b[0m');
  process.exit(1);
}

try {
  console.info('🚀 开始部署到服务器...\n');

  // 1. 确保远端目录存在
  run(`ssh ${REMOTE_USER}@${REMOTE_HOST} "mkdir -p ${REMOTE_DIR}"`);

  // 2. 将本地 ./html 内部所有内容递归推送到远端
  run(`scp -r ./html/. ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/`);

  console.info('\n\x1b[32m✨ 部署完成！访问: https://mo7tech.com\x1b[0m');
} catch (err) {
  console.error('\n\x1b[31m❌ 部署失败，请检查网络或 SSH 连通性。\x1b[0m');
  process.exit(1);
}
