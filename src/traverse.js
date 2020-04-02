const babelParser = require('@babel/parser')
const parse = babelParser.parse
const t = require('@babel/types')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default

const query = require('./utils/query')

// console.log(
//   modifyArr(`
//     let arr = [1, 2, 3];
//     let obj = {
//       arr: [0, 1, 2]
//     };
//     () => {let arr = [2, 3, 4]}
//     function abc() {
//       let arr = [3, 4, 5]
//     }
//     {
//       let arr = [4, 5, 6]
//     }
//   `, 'arr', 2, t.numericLiteral(21))
// )

// 修改非函数中的数组
function modifyArr(code, arrIdentifier, index, value) {
  let ast = parse(code)
  traverse(ast, {
    Identifier(path) {
      const node = path.node
      if(
        arrIdentifier === node.name && 
        query.notInFunction(path)
      ) {
        let parentNode = path.parent
        let isObjProperty = parentNode.type === 'ObjectProperty'
        let arr
        if(isObjProperty) { // 对象的变量
          arr = parentNode.value.elements
        } else {
          arr = parentNode.init.elements
        }
        arr[index] = value
      }
    }
  })
  return generate(ast, {}, code).code
}

// console.log(
//   modifyObj(`
//     let obj = {name: 'joel', age: 20}
//     let b = {obj: {name: 'joel2', age: 21}}
//   `, 'obj', 'age' , t.numericLiteral(18))
// )

// 修改非函数中的对象
function modifyObj(code, objIdentifier, keyName, value) {
  let ast = parse(code)
  traverse(ast, {
    Identifier(path) {
      const node = path.node
      if(
        objIdentifier === node.name && 
        query.notInFunction(path)
      ) {
        let parentNode = path.parent
        let isObjProperty = parentNode.type === 'ObjectProperty'
        let tarObj = isObjProperty ? parentNode.value : parentNode.init
        let tarPerperty = tarObj.properties.find(p => p.key.name === keyName)
        tarPerperty.value = value
      }
    }
  })
  return generate(ast, {}, code).code
}

// 语句的替换

// 变量名的替换