# 创建 AST 节点
AST (Abstract Syntax Tree(抽象语法树)) 是源代码语法结构的一种抽象表示。不了解 AST 的，可以看[这篇文章](https://www.jianshu.com/p/6fa90ee14d0e)。

创建 AST 节点是转换AST节点时的常见操作。本文用 [@babel/types](https://babeljs.io/docs/en/next/babel-types.html) 来创建 AST节点。@babel/types 是根据 babel 的 AST 规范来创建 AST。规范说明见[这里](https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md)。

下面，我们来具体看代码。代码中的 `t` 为 `require('@babel/types')`。完整代码见[这里](https://github.com/iamjoel/ast-note/blob/master/src/create.js)。

## 创建数字
```js
t.numericLiteral(1)
```

输出: 
```js
1
```

## 创建字符串
```js
t.stringLiteral('a str')
```

输出: 
```js
"a str"
```

## 创建布尔值
```js
t.booleanLiteral(true)
t.booleanLiteral(false)
```

输出: 
```js
true
false
```

## 创建null
```js
t.nullLiteral()
```

输出: 
```js
null
```

## 创建对象
```js
const nameKey = 
  t.objectProperty(
    t.identifier('name'), 
    t.stringLiteral('Joel')
  )
const agetKey = 
  t.objectProperty(
    t.identifier('age'),
    t.numericLiteral(18)
  )
t.objectExpression([nameKey, agetKey])
```

输出: 
```js
{
  name: "Joel",
  age: 18
}
```

## 创建获取对象的属性
```js
t.memberExpression(
  t.identifier('obj'),
  t.identifier('name')
)

t.memberExpression(
  t.identifier('obj'),
  t.identifier('name'),
  true
)
```

输出: 
```js
obj.name
obj[name]
```

## 创建数组
```js
const item1 = t.numericLiteral(1)
const item2 = t.numericLiteral(2)
t.arrayExpression([item1, item2])
```

输出: 
```js
[1, 2]
```

## 创建获取数组的内容
```js
t.memberExpression(
  t.identifier('arr'),
  t.numericLiteral(1),
  true
)
```

输出: 
```js
arr[1]
```

## 创建二元表达式
```js
t.binaryExpression(
  '+', // 操作符。 还支持：==, ===, != 等
  item1, // 左操作数
  item2
)
```

输出: 
```js
1 + 2
```

## 创建三元表达式
```js
t.conditionalExpression(
  t.binaryExpression(
    '>',
    t.numericLiteral(4),
    t.numericLiteral(3)
  ),
  t.numericLiteral(4),
  t.numericLiteral(3)
)
```

输出: 
```js
4 > 3 ? 4 : 3
```

## 创建逻辑表达式
```js
t.logicalExpression(
  '||',
  t.identifier('num'),
  t.numericLiteral(0)
)

t.logicalExpression(
  '&&',
  t.identifier('obj'),
  t.memberExpression(
    t.identifier('obj'),
    t.identifier('name')
  )
)
```

输出: 
```js
num || 0
obj && obj.name
```

## 创建条件语句if
```js
t.binaryExpression(
  '>',
  t.numericLiteral(4),
  t.numericLiteral(3)
),
t.blockStatement(
  [
    t.expressionStatement(
      t.callExpression(
        t.memberExpression(
          t.identifier('console'),
          t.identifier('log')
        ),
        [
          t.booleanLiteral(true)
        ]
      )
    )
  ]
)
```

输出: 
```js
if (4 > 3) {
  console.log(true);
}
```

不知到怎么创建 else if 和 else。

## 创建for循环
```js
t.forStatement(
  t.variableDeclaration(
    'let',
    [
      t.variableDeclarator(
        t.identifier('i'),
        t.numericLiteral(0)
      )
    ]
 ),
 t.binaryExpression(
    '<',
    t.identifier('i'),
    t.numericLiteral(3)
 ),
 t.updateExpression(
   '++',
   t.identifier('i')
 ),
 t.blockStatement([
   t.emptyStatement()
 ])
)
```

输出: 
```js
for (let i = 0; i < 3; i++) {
  ;
}
```

## 创建变量定义
```js
t.variableDeclaration(
  'let', // 还支持 const 和 var
  [
    t.variableDeclarator(
      t.identifier('b'), // 变量名
    )
  ]
)

t.variableDeclaration(
  'let', // 还支持 const 和 var
  [
    t.variableDeclarator(
      t.identifier('b'), // 变量名
    )
  ]
)
t.assignmentExpression(
  '=',
  t.identifier('b'),
  t.numericLiteral(1)
)
```

输出: 
```js
let a = 1;
let b;
b = 1
```

## 创建定义函数
```js
t.functionDeclaration(
  t.identifier('add'), // 函数名
  [t.identifier('a'), t.identifier('b')], // 参数
  t.blockStatement([ // 函数体
    t.variableDeclaration(// const sum = a + b
      'const', 
      [
        t.variableDeclarator(
          t.identifier('sum'), // 变量名
          t.binaryExpression('+', t.identifier('a'), t.identifier('b')) // a + b
        ),
      ]
    ),
    t.returnStatement(t.identifier('sum')) // return sum
  ])
)
```

输出: 
```js
function add(a, b) {
  const sum = a + b;
  return sum;
}
```

## 创建箭头函数
```js
const declarationArrowFun = 
  t.arrowFunctionExpression(
    [t.identifier('a'), t.identifier('b')], // 参数
    t.blockStatement([ // 函数体
      t.variableDeclaration(// const sum = a + b
        'const', 
        [
          t.variableDeclarator(
            t.identifier('sum'), // 变量名
            t.binaryExpression('+', t.identifier('a'), t.identifier('b')) // a + b
          ),
        ]
      ),
      t.returnStatement(t.identifier('sum')) // return sum
    ])
  )

t.variableDeclaration(
  'let', // 还支持 const 和 var
  [
    t.variableDeclarator(
      t.identifier('add2'), // 变量名
      declarationArrowFun
    )
  ]
 )
```

输出: 
```js
function add(a, b) {
  const sum = a + b;
  return sum;
}

let add2 = (a, b) => {
  const sum = a + b;
  return sum;
};
```

## 创建函数调用
```js
t.callExpression(
  t.identifier('add'),
  [
    t.numericLiteral(1),
    t.numericLiteral(2)
  ]
)
```

输出: 
```js
add(1, 2)
```