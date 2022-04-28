export class Controller {
    constructor (game, view) {
        this.game = game;
        this.view = view;
    }

    init(codeKey) {
        window.addEventListener('keydown', event => {
            if (event.code === codeKey) {
                this.view.init();
                this.start();
            }
        })
    }

    start() {
        this.view.showArea(this.game.viewArea);
        
        this.game.createUpdatePanels(this.view.createBlockScore(), this.view.createBlockNextTetromino());

        const tick = () => {
            const time = (1100-100 * this.game.level);
            if (this.game.gameOver) return;
            setTimeout(() => {
                this.game.moveDown();
                this.view.showArea(this.game.viewArea);
                tick();
            }, time > 100 ? time : 100)
        }

        tick();

        setInterval(() => {
            this.game.moveDown();
            this.view.showArea(this.game.viewArea);
        }, 1000)

        window.addEventListener("keydown", (event) => {
          const key = event.code;
          switch (key) {
            case "ArrowLeft":
              // действие
              this.game.moveLeft();
              this.view.showArea(this.game.viewArea);
              break;
            case "ArrowRight":
              // действие
              this.game.moveRight();
              this.view.showArea(this.game.viewArea);
              break;
            case "ArrowDown":
              // действие
              this.game.moveDown();
              this.view.showArea(this.game.viewArea);
              break;
            case "ArrowUp":
              // действие
              this.game.rotateTetromino();
              this.view.showArea(this.game.viewArea);
              break;
          }
        });
    }
}