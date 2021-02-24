class Snake {
  // 表示蛇头的元素
  head: HTMLElement
  // 表示蛇的身体(包括蛇头)
  bodies: HTMLCollection
  // 获取蛇的容器
  element: HTMLElement

  constructor() {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake>div') as HTMLElement
    this.bodies = document.getElementById('snake')!.getElementsByTagName('div')
  }

  // 获取蛇头的坐标
  get X() {
    return this.head.offsetLeft
  }
  get Y() {
    return this.head.offsetTop
  }
  // 设置蛇头坐标
  set X(value) {
    if (value === this.X) {
      return
    }
    // 判断是否撞墙
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了')
    }
    this.moveBody()
    this.head.style.left = `${value}px`
    this.checkHeadBody()
  }
  set Y(value) {
    if (value === this.Y)
      return
    // 判断是否撞墙
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了')
    }
    this.moveBody()
    this.head.style.top = `${value}px`
    this.checkHeadBody()
  }

  // 给蛇增加身体
  addBody() {
    // 向element添加div
    this.element.insertAdjacentHTML("beforeend", "<div></div>")
  }

  // 添加蛇身体移动的方法
  moveBody() {
    // 将后面身体的位置设置为前边身体的位置
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前边身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      // 设置到当前的身体
      (this.bodies[i] as HTMLElement).style.left = `${X}px`;
      (this.bodies[i] as HTMLElement).style.top = `${Y}px`;
    }
  }

  // 检查蛇头和身体是否相撞
  checkHeadBody() {
    // 获取所有的身体,检查其是否和蛇头的坐标发生重叠
    for (let i = 1; i < this.bodies.length; i++) {
      let body = this.bodies[i] as HTMLElement
      if (this.X === body.offsetLeft && this.Y === body.offsetTop) {
        // 游戏结束
        throw new Error('撞到自己了')
      }
    }
  }

}

export default Snake