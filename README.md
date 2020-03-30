# AST 笔记
AST 是 Abstract Syntax Tree(抽象语法树)的缩写。AST是编译器看的。编译器会将源代码转化成AST。如: 
```
var a = 42;
var b = 5;
function addA(d) {
    return a + d;
}
var c = addA(2) + b;
```

换转化成这样的AST:
![](img/ast-demo.jpg)

## 使用场景
TypeScript、babel、webpack、vue-cli 得都是依赖 AST 进行开发的。

通过AST，可以将代码转化后，再输出。比如：
* 代码压缩。删除没用的空格，未使用的语句，变量名替换等。
* 代码高亮。
* 将 ES6 代码转换成 ES5 代码。
* 给 CSS 中的某些属性加浏览器前缀`-webkit-`。
* 将 CSS 中的px转化成rem。
* 生成代码。最近用了[ANT DESIGN PRO](https://pro.ant.design/index-cn)。 ANT DESIGN PRO 中的[umi](https://umijs.org/) 可以在生成页面的代码和路由时，修改路由配置的js。umi 这种方式，用户体验很好。因此，我准备用这种方式来改造我之前做的代码生成工具。修改路由配置需要通过AST来转换代码。

## 需要掌握的知识
* 将源码转化为AST。
* 遍历AST。
* 修改 AST。
  * [创建AST的节点](docs/create.md)。
* 将AST转化为源码。

## npm 包
* [recast](https://github.com/benjamn/recast) 解析AST(parse)，遍历AST，修改AST，生成代码(print(...).code, prettyPrint)。文档很简单。
* [@babel/parser](https://babeljs.io/docs/en/next/babel-parser.html) 解析AST。 以前叫 [Babylon](https://github.com/babel/babylon)
* [@babel/traverse](https://babeljs.io/docs/en/next/babel-traverse.html) 遍历 AST,替换，移除和添加节点。
* [@babel/types](https://babeljs.io/docs/en/next/babel-types.html) 用于 AST 节点的 Lodash 式工具库， 它包含了构造、验证以及变换 AST 节点的方法。 该工具库包含考虑周到的工具方法，对编写处理AST逻辑非常有用。
* [@babel/generator](https://babeljs.io/docs/en/next/babel-generator.html) 是 Babel 的代码生成器，它读取AST并将其转换为代码和源码映射（sourcemaps）。
* [@babel/template](https://babeljs.io/docs/en/next/babel-template.html) 它能让你编写字符串形式且带有占位符的代码来代替手动编码， 尤其是生成的大规模 AST的时候。 在计算机科学中，这种能力被称为准引用（quasiquotes）。

## 工具
* [AST 浏览器](https://astexplorer.net/)

## 资源&文章推荐
* [Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
* [AST node](https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md)
* [透過製作 Babel-plugin 初訪 AST](https://blog.arvinh.info/2018/08/25/visit-ast-with-babel-plugin/)
* [AST 与前端工程化实战](http://www.imooc.com/article/290884)