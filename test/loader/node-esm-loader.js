import render from "./template.art";

let html = render({loader: "node-esm-loader"});
console.log(html);