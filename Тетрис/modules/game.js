import { tetrominoes } from './tetrominoes.js';
import { ROWS, COLUMNS } from '../script.js';

// механика
export class Game {
  area = [
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
  ];
  activeTetromino = this.createTetramino();

  nextTetromino = this.createTetramino();

  createTetramino() {
    const keys = Object.keys(tetrominoes);
    const letterTetromino = keys[Math.floor(Math.random() * keys.length)];
    const rotation = tetrominoes[letterTetromino];
    const rotationIndex = Math.floor(Math.random() * rotation.length);
    const block = rotation[rotationIndex];

    return {
      block,
      rotationIndex,
      rotation,
      x: 3,
      y: 0,
    };
  }

  changeTetramino() {
      this.activeTetromino = this.nextTetromino;
      this.nextTetromino = this.createTetramino();
  }

  moveLeft() {
    if (
      this.checkOutPosition(this.activeTetromino.x - 1, this.activeTetromino.y)
    ) {
      this.activeTetromino.x -= 1;
    }
  }
  moveRight() {
    if (
      this.checkOutPosition(this.activeTetromino.x + 1, this.activeTetromino.y)
    ) {
      this.activeTetromino.x += 1;
    }
  }
  moveDown() {
    if (
      this.checkOutPosition(this.activeTetromino.x, this.activeTetromino.y + 1)
    ) {
      this.activeTetromino.y += 1;
    } else {
      this.stopMove();
    }
  }
  rotateTetromino() {
    this.activeTetromino.rotationIndex =
      this.activeTetromino.rotationIndex < 3
        ? this.activeTetromino.rotationIndex + 1
        : 0;

    this.activeTetromino.block =
      this.activeTetromino.rotation[this.activeTetromino.rotationIndex];

    if (
      !this.checkOutPosition(this.activeTetromino.x, this.activeTetromino.y)
    ) {
      this.activeTetromino.rotationIndex =
        this.activeTetromino.rotationIndex > 0
          ? this.activeTetromino.rotationIndex - 1
          : 3;

      this.activeTetromino.block =
        this.activeTetromino.rotation[this.activeTetromino.rotationIndex];
    }
  }

  // создаем копию начальной aria
  get viewArea() {
    const area = JSON.parse(JSON.stringify(this.area));
    // добавка новой падающей фигурки
    const { x, y, block: tetromino } = this.activeTetromino;
    for (let i = 0; i < tetromino.length; i++) {
      const row = tetromino[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] !== "o") {
          area[y + i][x + j] = tetromino[i][j];
        }
      }
    }
    return area;
  }

  // ограничение движения фигурки игровым полем
  checkOutPosition(x, y) {
    const tetromino = this.activeTetromino.block;
    // самый низ
    for (let i = 0; i < tetromino.length; i++) {
      // боковые стенки
      for (let j = 0; j < tetromino[i].length; j++) {
        if (tetromino[i][j] === "o") continue;

        if (
          !this.area[y + i] ||
          !this.area[y + i][x + j] ||
          this.area[y + i][x + j] !== "o"
        ) {
          return false;
        }
      }
    }
    return true;
  }

  stopMove() {
    const { x, y, block: tetromino } = this.activeTetromino;

    // фиксация фигурки внизу поля и изменение главной aria
    for (let i = 0; i < tetromino.length; i++) {
      const row = tetromino[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] !== "o") {
          this.area[y + i][x + j] = tetromino[i][j];
        }
      }
    }

    this.changeTetramino();
    this.clearRow();
  }

  // очищение заполненного ряда
  clearRow() {
    const rows = [];
    for(let i = ROWS - 1; i >= 0; i--) {
        let countBlock = 0;
        for(let j = 0; j < COLUMNS; j++) {
            if(this.area[i][j] !== 'o') {
                countBlock += 1;
            }
        }
        if(!countBlock) break;
        if(countBlock === COLUMNS) {
            rows.unshift(i);
        }
    }
    rows.forEach(i => {
        this.area.splice(i, 1);
        this.area.unshift(Array(COLUMNS).fill('o'));
    })
  }
};
