import compile from "./compile/index.js";
import settings from "./compile/settings.js";

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
 * @param   {string}            filename 模板名
 * @param   {Object|string}     [content]  数据或模板内容
 * @return  {string|function}            如果 content 为 string 则编译并缓存模板，否则渲染模板
 */
const template = (filename, content) => content instanceof Object ?
  render({filename}, content) :
  compile({filename, source: content});

export default template;
export {
  settings,
  render,
  compile,
}
