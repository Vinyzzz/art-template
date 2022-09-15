declare type Options = {
    /**
     * template name
     */
    filename?: string;
    /**
     * an array of rules of template syntax
     */
    rules?: any[];
    /**
     * whether to automatically encode output statements of template. Setting false will close that functionality
     * escape can prevent XSS attacks
     */
    escape?: boolean;
    /**
     * enable debug mode. If true: {cache:false, minimize:false, compileDebug:true}
     */
    debug?: boolean;
    /**
     * if bail is set true, compilation errors and runtime errors will throw exception
     */
    bail?: boolean;
    /**
     * whether to enable caching
     */
    cache?: boolean;
    /**
     * whether to enable minimization. It will execute htmlMinifier and minimize HTML, CSS, JS
     * if template contains unclosing tags, please don't open minimize. Otherwise unclosing tags will be restored or filtered
     */
    minimize?: boolean;

    /**
     * whether to compile in debug mode
     */
    compileDebug?: boolean;
    /**
     * resolve template path
     */
    resolveFilename?(filename: string, options: Options): string;
    /**
     * sub template compilation adapter
     */
    include?(filename: string, data: any, blocks: any, options: Options): string,

    /**
     * HTML minifier configuration. Refer to: https://github.com/kangax/html-minifier
     */
    htmlMinifierOptions?: {
        collapseWhitespace: boolean,
        minifyCSS: boolean,
        minifyJS: boolean,
        // automatically merged at runtime: rules.map(rule => rule.test)
        ignoreCustomFragments: any[]
    };

    /**
     * error events. Work only if bail is false
     */
    onerror?: any,

    /**
     * template file loader
     */
    loader?(filename: string): string,

    /**
     * root directory of template. If filename field is not a local path, template will be found in root directory
     * @default '/'
     */
    root?: string;

    /**
     * @default '.art'
     * default extension. If no extensions, extname will be automatically added
     */
    extname?: string,

    /**
     * ignored variables. An array of template variables ignored by template compiler
     */
    ignore?: any[],

    // imported template variables
    imports?: { [key: string]: Function }
}

/**
 * 编译生成的渲染函数
 */
declare type Render<T = any> = (data: T) => string;

/**
 *
 * @param filenameOrTemplateId 如果 content 为字符串，则作为模板 ID 用于缓存中，否则为模板文件路径
 * @param content 如果为字符串，则作为模板内容返回{@link Render 渲染函数}，否则作为模板数据输入返回渲染生成的字符串
 */
declare function artTemplate<T extends string | { [p: string]: any }>(filenameOrTemplateId: string, content?: T):
    T extends string ? Render : string;

declare namespace artTemplate {
    export const options: Options;

    function render<T = any>(source: string, data: T, options?: Options): string;

    function compile<T = any>(source: string, options?: Options): Render<T>;
}
export = artTemplate;
