import assert from "node:assert";
import template from "../src/index.js";
import settings from "../src/compile/settings.js";
import path from "node:path";
import {fileURLToPath} from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
settings.root = path.join(__dirname, 'res');

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

  it('nested block use actual value', () => {
    const html = template('index/nested-block/index.art', {hello: 'hello'});
    assert.equal('hello', html);
  });

  it('nested block use default value', () => {
    const html = template('index/nested-block/default.art', {});
    assert.equal('default', html);
  });

});
