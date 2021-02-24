// 定义食物类
class Food {
  // 定义一个属性表示事务所对应的元素
  element: HTMLElement
  constructor() {
    // 获取页面中的food元素将其赋值给element
    this.element = document.getElementById('food')!
  }

  // 定义获取食物坐标的方法
  get X() {
    return this.element.offsetLeft
  }
  get Y() {
    return this.element.offsetTop
  }

  // 设置食物位置的方法
  change() {
    // 生成一个随机位置:最小是0,最大是290
    // 蛇一次移动一个是10px,要求食物的位置时10的倍数
    let left = Math.round(Math.random() * 29) * 10
    let top = Math.round(Math.random() * 29) * 10
    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }
}

export default Food