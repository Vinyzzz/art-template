import compile from "../index.js";

/**
 * 载入子模板
 * @param   {string}    filename
 * @param   {Object}    data
 * @param   {Object}    blocks
 * @param   {Object}    options
 * @return  {string}
 */
const include = (filename, data, blocks, options) => {
  options.filename = options.resolveFilename(filename, options);
  options.source = null;
  return compile(options)(data, blocks);
};

export default include;
