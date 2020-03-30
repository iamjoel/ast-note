// https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md
const babelParser = require('@babel/parser')
const parse = babelParser.parse
const t = require('@babel/types')
const generate = require('@babel/generator').default

const code = ''
const ast = parse(code)

// 数据类型
// 数字
const number = t.numericLiteral(1)
ast.program.body.push(number)

// 字符串
const str = t.stringLiteral('a str')
ast.program.body.push(str)

// 布尔值
const trueValue = t.booleanLiteral(true)
const falseValue = t.booleanLiteral(false)
ast.program.body.push(trueValue)
ast.program.body.push(falseValue)

// null
const nullValue = t.nullLiteral()
ast.program.body.push(nullValue)

// 对象。 {name: 'Joel', age: 18}
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
const obj = t.objectExpression([nameKey, agetKey])
ast.program.body.push(obj)

// 获取对象是属性。 obj.name
const objMember = 
  t.memberExpression(
    t.identifier('obj'),
    t.identifier('name')
  )
ast.program.body.push(objMember)

// 获取对象是属性。 obj[name]
const objMemberDynamic = 
  t.memberExpression(
    t.identifier('obj'),
    t.identifier('name'),
    true
  )
ast.program.body.push(objMemberDynamic)

// 数组 [1, 2]
const item1 = t.numericLiteral(1)
const item2 = t.numericLiteral(2)
const arr = t.arrayExpression([item1, item2])
ast.program.body.push(arr)

// 获取数组的内容。 arr[1]
const arrMember = 
  t.memberExpression(
    t.identifier('arr'),
    t.numericLiteral(1),
    true
  )
ast.program.body.push(arrMember)

// 二元表达式 1+2。
const expr = 
  t.binaryExpression(
    '+', // 操作符。 还支持：==, ===, != 等
    item1, // 左操作数
    item2
  )
ast.program.body.push(expr)

// 三元表达式。 4 > 3 ? 4 : 3
const conditionExpr = 
  t.conditionalExpression(
    t.binaryExpression(
      '>',
      t.numericLiteral(4),
      t.numericLiteral(3)
    ),
    t.numericLiteral(4),
    t.numericLiteral(3)
  )
ast.program.body.push(conditionExpr)

// &&
const logicExpr = 
  t.logicalExpression(
    '||', // 还支持 &&
    t.identifier('num'),
    t.numericLiteral(0)
  )

const logicExpr2 = 
  t.logicalExpression(
    '&&',
    t.identifier('obj'),
    t.memberExpression(
      t.identifier('obj'),
      t.identifier('name')
    )
  )
ast.program.body.push(logicExpr)
ast.program.body.push(logicExpr2)


/*
* if
* if(4 > 3) {
*   console.log(true)
* }
*/
const ifStatement = t.ifStatement(
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
)
ast.program.body.push(ifStatement)

//不知到怎么创建 else if 和 else。

/*
* for(let i = 0; i < 3; i++) {
    ;
*}
*/
const forStatement = 
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
ast.program.body.push(forStatement)

// 变量定义并赋值 let a = 1
const declarationLet = 
  t.variableDeclaration(
    'let', // 还支持 const 和 var
    [
      t.variableDeclarator(
        t.identifier('a'), // 变量名
        t.numericLiteral(1) // 变量值
      )
    ]
   )
ast.program.body.push(declarationLet)


// 变量定义，赋值 let b; b = 1
const declarationLet2 = 
  t.variableDeclaration(
    'let', // 还支持 const 和 var
    [
      t.variableDeclarator(
        t.identifier('b'), // 变量名
      )
    ]
   )
const assignmentExpr = 
t.assignmentExpression(
  '=',
  t.identifier('b'),
  t.numericLiteral(1)
)
ast.program.body.push(declarationLet2)
ast.program.body.push(assignmentExpr)

/*
* 定义函数 
* function add(a, b) {
*    const sum = a + b
*    return a + b
* }
*/
const declarationFun = 
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
ast.program.body.push(declarationFun)

// 箭头函数
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
const setArrowFun = 
  t.variableDeclaration(
    'let', // 还支持 const 和 var
    [
      t.variableDeclarator(
        t.identifier('add2'), // 变量名
        declarationArrowFun
      )
    ]
   )
ast.program.body.push(setArrowFun)

// 函数调用 add(1, 2)
const funCall = 
  t.callExpression(
    t.identifier('add'),
    [
      t.numericLiteral(1),
      t.numericLiteral(2)
    ]
  )

ast.program.body.push(funCall)

const output = generate(ast, {}, code)
console.log(output.code)

module.export = ast

