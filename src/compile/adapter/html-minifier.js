import {minify} from "html-minifier";

/**
 * HTML 压缩器
 * @param  {string}     source
 * @param  {Object}     options
 * @return {string}
 */
const htmlMinifier = (source, options) => {
  const htmlMinifierOptions = options.htmlMinifierOptions;
  const ignoreCustomFragments = options.rules.map(rule => rule.test);
  htmlMinifierOptions.ignoreCustomFragments.push(...ignoreCustomFragments);
  source = minify(source, htmlMinifierOptions);
  return source;
};

export default htmlMinifier;
