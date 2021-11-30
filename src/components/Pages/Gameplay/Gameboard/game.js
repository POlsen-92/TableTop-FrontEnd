export class Game {
    tokenPosition = [1, 7]
    observers = []
    observe(o) {
      this.observers.push(o)
      this.emitChange()
      return () => {
        this.observers = this.observers.filter((t) => t !== o)
      }
    }
    moveToken(toX, toY) {
      this.tokenPosition = [toX, toY]
      this.emitChange()
    }
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
      this.observers.forEach((o) => o && o(pos))
    }
  }