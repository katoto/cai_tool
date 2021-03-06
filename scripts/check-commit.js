/**
 * @file check commit message
 */

const chalk = require("chalk");
const msgPath = process.env.GIT_PARAMS;
const msg = require("fs")
  .readFileSync(msgPath, "utf-8")
  .trim();

const commitRE = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?: .{3,64}/;
const mergeRE = /^Merge branch.+/;
if (!commitRE.test(msg) && !mergeRE.test(msg)) {
  throw `${chalk.bgRed.white(" ERROR ")} ${chalk.red(`Invalid commit message format.`)}\n\n` +
    chalk.white(`请使用 ${chalk.cyan(`npm run commit`)} 命令提交代码.\n\n`);
}