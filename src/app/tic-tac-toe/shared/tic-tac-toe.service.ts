import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TicTacToeService {
  private readonly BOARD_SIZE: number = 3;
  private readonly X: number = 1;
  private readonly O: number = 2;
  private readonly EMPTY: number = 0;

  private board: any;
  private numberOfMoves: number;
  private victory: any;

  private _player: number;
  private _showStart: boolean;
  private _showEnd: boolean;
  private _showBoard: boolean;

  constructor() {}

  /**
   * Start the game.
   *
   * @return void
   */
  start(): void {
    this._showStart = true;
    this._showEnd = false;
    this._showBoard = false;
    this._player = this.X;
    this.numberOfMoves = 0;
    this.victory = false;
    this.startBoard();
  }

  /**
   * Start the board game with all empty positions.
   *
   * @return void
   */
  startBoard(): void {
    this.board = [this.BOARD_SIZE];
    for (let i = 0; i < this.BOARD_SIZE; i++) {
      this.board[i] = [this.EMPTY, this.EMPTY, this.EMPTY];
    }
  }

  /**
   * Returns if the start screen should be showed.
   *
   * @return boolean
   */
  get showStart(): boolean {
    return this._showStart;
  }

  /**
   * Returns if the end screen should be showed.
   *
   * @return boolean
   */
  get showEnd(): boolean {
    return this._showEnd;
  }

  /**
   * Returns if the board should be showed.
   *
   * @return boolean
   */
  get showBoard(): boolean {
    return this._showBoard;
  }

  /**
   * Returns the number of the player to play.
   *
   * @return number
   */
  get player(): number {
    return this._player;
  }

  /**
   * Shows the board.
   *
   * @return void
   */
  startGame(): void {
    this._showStart = false;
    this._showBoard = true;
  }

  /**
   * Realizes a movement according to the board coordinates.
   *
   * @param number posX
   * @param number posY
   * @return void
   */
  jogar(posX: number, posY: number): void {
    // invalid movement
    if (this.board[posX][posY] !== this.EMPTY || this.victory) {
      return;
    }

    this.board[posX][posY] = this._player;
    this.numberOfMoves++;
    this.victory = this.endGame(posX, posY, this.board, this._player);
    this._player = this._player === this.X ? this.O : this.X;

    if (!this.victory && this.numberOfMoves < 9) {
      this.cpuPlay();
    }

    // victory
    if (this.victory !== false) {
      this._showEnd = true;
    }

    // raw
    if (!this.victory && this.numberOfMoves) {
      this._player = 0;
      this._showEnd = true;
    }
  }

  /**
   * Verifies and returns if the game ends.
   *
   * @param number row
   * @param number column
   * @param any board
   * @param number player
   * @return array
   */
  endGame(row: number, column: number, board: any, player: number): any {
    let end: any = false;

    // validates row
    if (
      board[row][0] === player &&
      board[row][1] === player &&
      board[row][2] === player
    ) {
      end = [
        [row, 0],
        [row, 1],
        [row, 2],
      ];
    }

    // validates column
    if (
      board[0][column] === player &&
      board[1][column] === player &&
      board[2][column] === player
    ) {
      end = [
        [0, column],
        [1, column],
        [2, column],
      ];
    }

    // validates diagonals
    if (
      board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player
    ) {
      end = [
        [0, 0],
        [1, 1],
        [2, 2],
      ];
    }

    if (
      board[0][2] === player &&
      board[1][1] === player &&
      board[2][0] === player
    ) {
      end = [
        [0, 2],
        [1, 1],
        [2, 0],
      ];
    }
    return end;
  }

  /**
   * Simulates random CPU movemente.
   *
   * @return void
   */
  cpuPlay(): void {
    // verifies victory movement
    let movement: number[] = this.obtainsMovement(this.O);

    if (movement.length <= 0) {
      // try another movement to avoid lose
      movement = this.obtainsMovement(this.X);
    }

    if (movement.length <= 0) {
      // random movement
      let movements: any = [];
      for (let i = 0; i < this.BOARD_SIZE; i++) {
        for (let j = 0; i < this.BOARD_SIZE; j++) {
          if (this.board[i][j] === this.EMPTY) {
            movements.push([i, j]);
          }
        }
      }
      let k = Math.floor(Math.random() * (movements.length - 1));
      movement = [movements[k][0], movement[k][1]];
    }

    this.board[movement[0]][movement[1]] = this._player;
    this.numberOfMoves++;
    this.victory = this.endGame(
      movement[0],
      movement[1],
      this.board,
      this._player
    );
    this._player = this._player === this.X ? this.O : this.X;
  }

  /**
   * Obtains a valid movement to a player victory.
   *
   * @param number player
   * @return void
   */
  obtainsMovement(player: number): number[] {
    let playing_board = this.board;
    for (let row = 0; row < this.BOARD_SIZE; row++) {
      for (let column = 0; column < this.BOARD_SIZE; column++) {
        if (playing_board[row][column] !== this.EMPTY) {
          continue;
        }
        playing_board[row][column] = player;
        if (this.endGame(row, column, playing_board, player)) {
          return [row, column];
        }
        playing_board[row][column] = this.EMPTY;
      }
    }

    return [];
  }

  /**
   * Returns if the piece X must be showed to the
   * position informed.
   *
   * @param number posX
   * @param number posY
   * @return boolean
   */
  showX(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.X;
  }

  /**
   * Returns if the piece 0 must be showed to the
   * position informed.
   *
   * @param number posX
   * @param number posY
   * @return boolean
   */
  showO(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.O;
  }

  /**
   * Returns if the victory mark must be showed
   * to the informed position
   *
   * @param number posX
   * @param number posY
   * @return boolean
   */
  showVictory(posX: number, posY: number): boolean {
    let showVictory: boolean = false;

    if (!this.victory) {
      return showVictory;
    }

    for (let pos of this.victory) {
      if (pos[0] === posX && pos[1] === posY) {
        showVictory = true;
        break;
      }
    }

    return showVictory;
  }

  /**
   * Starts a new game, as shows the board
   *
   * @return void
   */
  newGame(): void {
    this.start();
    this._showStart = false;
    this._showEnd = false;
    this._showBoard = true;
  }
}
