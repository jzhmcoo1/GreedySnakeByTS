// 引入其他类
import ScorePanel from './ScorePanel'
import Food from './Food'
import Snake from './Snake'
// 游戏控制器
class GameControl {
  // 定义三个属性
  snake: Snake
  food: Food
  scorePanel: ScorePanel
  // 创建一个属性控制蛇的移动方向
  direction: string = ''
  // 创建一个属性用来记录游戏是否结束
  isLive: boolean = true
  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel(10, 2)

    this.init()
  }

  // 游戏的初始化方法,调用后游戏开始
  init() {
    // 绑定键盘事件
    document.addEventListener('keydown', this.keyDownHandler)
    this.run()
  }

  /**
   * 创建键盘回调   
   * @param event: ArrowUp ArrowDown ArrowLeft ArrowRight
   */
  keyDownHandler = (event: KeyboardEvent) => {
    // TODO: 赋值前检查合法性
    let key = event.key
    if (
      this.direction === 'ArrowUp' && key === 'ArrowDown' ||
      this.direction === 'ArrowDown' && key === 'ArrowUp' ||
      this.direction === 'Arrowleft' && key === 'ArrowRight' ||
      this.direction === 'ArrowRight' && key === 'Arrowleft'
    ) { return; }
    else {
      this.direction = key
    }
  }

  // 控制蛇移动的方法
  run = () => {
    // 根据方向使蛇的位置改变
    // 获取蛇现在的坐标
    let X = this.snake.X
    let Y = this.snake.Y
    switch (this.direction) {
      case "ArrowUp":
        Y -= 10
        break;
      case "ArrowDown":
        Y += 10
        break;
      case "ArrowLeft":
        X -= 10
        break;
      case "ArrowRight":
        X += 10
        break;
    }

    // 吃到食物后
    this.checkEat(X, Y)

    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (e) {
      // 弹出提示信息
      alert(e.message + ' Game Over!')
      this.isLive = false
    }

    this.isLive && setTimeout(this.run, 300 - (this.scorePanel.level - 1) * 30)
  }

  // 检查是否吃到了食物
  checkEat = (X: number, Y: number) => {
    if (X === this.food.X && Y === this.food.Y) {
      // 改食物位置
      this.food.change()
      // 增加分数
      this.scorePanel.addScore()
      // 增加身体
      this.snake.addBody()
    }
  }
}

export default GameControl