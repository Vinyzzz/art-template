import compiler from "./compile/index.js";
import options from "./compile/options.js";
import {minify} from "html-minifier";

/**
 * 渲染模板
 * @param   {string|Object}    source    模板内容
 * @param   {Object}           data      数据
 * @param   {Object}           [options] 选项
 * @return  {string}           渲染好的字符串
 */
const render = (source, data, options) => compile(source, options)(data);

/**
 * 模板引擎
 * @param {string} filenameOrTemplateId  如果 content 为字符串，则作为模板 ID 用于缓存中，否则为模板文件路径
 * @param {string|{[p:string]:any}} [content] 如果为字符串，则作为模板内容返回{@link Render 渲染函数}，否则作为模板数据输入返回渲染生成的字符串
 * @return {Render|string}
 */
const template = (filenameOrTemplateId, content) =>
  content === undefined || typeof content === 'string' ?
    compile(content, {filename: filenameOrTemplateId}) :
    render({filename: filenameOrTemplateId}, content);

/**
 * @param {string|Options} source    模板内容
 * @param {Options}        [options] 编译选项
 * @returns {Render}       渲染函数
 */
function compile(source, options = {}) {
  if (source && typeof source !== 'string') {
    options = source;
    source = undefined;
  }

  let render = compiler(source, options);
  if (options.minimize) {
    return data => {
      let html = render(data);
      return minify(html, options.htmlMinifierOptions);
    }
  }
  return render;
}

export {
  template as default,
  options,
  render,
  compile,
}
