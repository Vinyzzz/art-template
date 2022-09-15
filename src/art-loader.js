import {readFile} from "fs/promises";
import {fileURLToPath} from "node:url";
import {options} from "./index.js";

/**
 * @typedef LoadContext
 * @property conditions
 * @property format
 * @property importAssertions
 */

/**
 * @typedef LoadReturns
 * @property {'builtin'|'commonjs'|'json'|'module'|'wasm'} format
 * @property {boolean} shortCircuit 这个钩子打算终止解析钩子链的信号。默认值：false
 * @property {string|ArrayBuffer|TypedArray} source
 */
/**
 * load hook 提供了一种方法来定义自定义方法来确定应该如何解释、检索和解析 URL。它还负责验证导入断言。
 * @param {string} url {@link https://nodejs.org/api/esm.html#resolvespecifier-context-nextresolve resolve} 返回的 URL
 * @param {Object} context
 * @param {(specifier:string,context:LoadContext)=>LoadReturns} nextLoad
 * @returns {Promise<LoadReturns>}
 */
export async function load(url, context, nextLoad) {
  if (url.endsWith(options.extname)) {
    let path = fileURLToPath(url);
    /** @type string */
    let template = await readFile(path, 'utf-8');
    template = template
      .replace(/`/, "\\`")
      .replace(/\\/, "\\\\");
    return {
      format: "module",
      source: `import {compile} from "art-template";export default compile(\`${template}\`)`,
    }
  }
  return nextLoad(url, context);
}