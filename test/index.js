import assert from "node:assert";
import template, {compile} from "../src/index.js";
import options from "../src/compile/options.js";
import path from "node:path";
import {fileURLToPath} from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
options.root = path.join(__dirname, 'res');

describe("#index", () => {

  it('compile', () => {
    const word = "world";
    const render = template('index/template.file.html');
    const html = render({word});
    assert.equal('hello world', html);
  });

  it('render with absolute path', () => {
    const word = "world";
    const html = template(path.join(__dirname + '/res/index/template.file.html'), {word});
    assert.equal(`hello ${word}`, html);
  });
  it('render with relative root path', () => {
    const word = "world";
    const html1 = template('/index/template.file.html', {word});
    assert.equal(`hello ${word}`, html1);
    const html2 = template('index/template.file.html', {word});
    assert.equal(`hello ${word}`, html2);
  });

  it('include', () => {
    const html = template('index/index.html', {name: 'parent value'});
    assert.equal(true, html.includes('parent'));
    assert.equal(true, html.includes('param'));
  });

  it('cache', () => {
    const value = "Cache Test";
    template('/index.html', '{{value}} Is OK');
    const html = template('/index.html', {value});
    assert.equal(`${value} Is OK`, html);
  });

  it('print', () => {
    const render1 = compile({filename: 'index/print.art', cache: false});
    const html1 = render1({});
    assert.equal('<pre>1 &#34;2&#34; {}</pre>', html1);
    const render2 = compile({filename: 'index/print.art', cache: false, escape: false});
    const html2 = render2({});
    assert.equal('> 1 "2" {}', html2);
  });

  it('nested block use actual value', () => {
    const html = template('index/nested-block/index.art', {hello: 'hello'});
    assert.equal('hello', html);
  });

  it('nested block use default value', () => {
    const html = template('index/nested-block/default.art', {});
    assert.equal('default', html);
  });

  it('with htmlMinifier', () => {
    const html = template('index/index.html', {});
    assert.match(html, /><\/?\w+/g);
  });

});
