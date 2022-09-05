import fs from "node:fs";

/**
 * 读取模板内容（同步方法）
 * @param   {string}    filename   模板名
 * @param   {?Object}   options
 * @return  {string}
 */
const loader = (filename /*, options*/) => {
  return fs.readFileSync(filename, 'utf8');
};

export default loader;
