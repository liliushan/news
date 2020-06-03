function setRem() {
  // 将屏幕宽度划分为15份取一份为1rem的值 设计稿为 375
  let scale = 25
  if (document.documentElement.clientWidth > 750) {
    // 屏幕超过750px 750 / 15
    scale = 50
  } else {
    scale = document.documentElement.clientWidth / 15
  }
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = Math.min(scale) + 'px'
}

setRem()
window.onresize = ()=>{
  setRem()
}
export default setRem
