import assert from "node:assert";
import {exec} from "node:child_process";


describe("#loader", () => {
  it("用于 node 的自定义 ESM 加载器", () => new Promise(resolve => {
    exec("node --loader ./src/art-loader.js ./test/loader/node-esm-loader.js", (error, stdout, stderr) => {
      assert.ifError(error);
      resolve();
    });
  }));
});
