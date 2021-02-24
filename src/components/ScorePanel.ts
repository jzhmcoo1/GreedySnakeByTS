// 定义记分牌的类
class ScorePanel {
  score: number = 0
  level: number = 1
  scoreElement: HTMLElement
  levelElement: HTMLElement

  // 设置一个变量限制等级
  maxLevel: number
  // 设置一个变量,多少分时升级
  upScore: number
  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreElement = document.getElementById('score')!
    this.levelElement = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  // 设置一个加分的方法
  addScore() {
    // 分数自增
    this.scoreElement.innerHTML = `${++this.score}`
    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }
  // 等级提升的方法
  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelElement.innerHTML = `${++this.level}`
    }
  }
}

export default ScorePanel