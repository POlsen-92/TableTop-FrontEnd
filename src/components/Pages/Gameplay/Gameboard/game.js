export class Game {
  tokenPosition = [1, 7]
  observers = []
  observe(o) {
    this.observers.push(o)
    this.emitChange()
    console.log("----------------------",this.observers);
    return () => {
      this.observers = this.observers.filter((t) => t !== o)
    }
  }
  moveToken(toX, toY) {
    this.tokenPosition = [toX, toY]
    this.emitChange()
  }
  // moveTokenNoEmit(toX, toY) {
  //   this.tokenPosition = [toX, toY]
  // }
  canMoveToken(toX, toY) {
    const [x, y] = this.tokenPosition
    const dx = toX - x
    const dy = toY - y
    return (
      (Math.abs(dx) > 0 || Math.abs(dy) > 0)
    )
  }
  emitChange() {
    const pos = this.tokenPosition
    // const currentO = this.observers.filter((t) => t == o)
    this.observers.forEach((o) => o && o(pos))
  }
  
}