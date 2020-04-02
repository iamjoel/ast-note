const t = require('@babel/types')

/*
* 节点探测
* 获取当前的节点 path.node
* 父节点 path.parent
* 祖先节点 path.findParent((path) => path.isObjectExpression())
* 兄弟节点: 在顶层或则
* 子节点 path.find((path) => ...)
* 继续往下找 path.traverse(vistor, { paramName })。 paramName 可以在 vistor 的this中用到。 这么做用来消除全局状态。
* 替换当前节点 单个 path.replaceWith 多个 path.replaceWithMultiple([])
 path.insertBefore path.insertAfter
 插入到容器中，path.unshiftContainer; path.pushContainer
*/
function notInFunction(path) {
  let functionParent = path.findParent((path) => {
     let functionNode = 
       t.isFunctionDeclaration(path.node) ||
       t.isArrowFunctionExpression(path.node) ||
       t.isBlockStatement(path.node)
     return functionNode
   })
  let res = !functionParent
  return res
}

module.exports = {
  notInFunction
}