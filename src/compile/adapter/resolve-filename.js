import path from "node:path";

/**
 * 获取模板的绝对路径
 * @param   {string} filename
 * @param   {Object} options
 * @return  {string}
 */
const resolveFilename = (filename, options) => {
  const root = options.root;
  if (filename.startsWith(root)) {
    return filename;
  }

  const extname = options.extname;

  if (path.isAbsolute(filename)) {
    filename = path.join(root, filename);
  } else {
    if (filename === options.filename) {
      // 解析自身
      filename = path.resolve(root, filename);
    } else {
      // 解析导入
      filename = path.resolve(path.dirname(options.filename), filename);
    }
  }

  if (!path.extname(filename)) {
    filename = filename + extname;
  }

  return filename;
};

export default resolveFilename;
