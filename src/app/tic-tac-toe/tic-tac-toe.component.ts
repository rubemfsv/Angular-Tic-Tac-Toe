import { Component, OnInit } from '@angular/core';
import { TicTacToeService } from './shared';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css'],
})
export class TicTacToeComponent implements OnInit {
  constructor(private ticTacToeService: TicTacToeService) {}

  ngOnInit(): void {
    this.ticTacToeService.start();
  }

  /**
   * Returns if the start screen must be shown
   *
   * @return boolean
   */
  get showStart(): boolean {
    return this.ticTacToeService.showStart;
  }

  /**
   * Returns if the board screen must be shown
   *
   * @return boolean
   */
  get showBoard(): boolean {
    return this.ticTacToeService.showBoard;
  }

  /**
   * Returns if the end screen must be shown
   *
   * @return boolean
   */
  get showEnd(): boolean {
    return this.ticTacToeService.showEnd;
  }

  /**
   * Start the data for a new game
   *
   * @return void
   */
  startGame(): void {
    return this.ticTacToeService.startGame();
  }

  /**
   * Realizes a movement according to the board coordinates.
   *
   * @param number posX
   * @param number posY
   * @return void
   */
  play(posX: number, posY: number): void {
    return this.ticTacToeService.play(posX, posY);
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
    return this.ticTacToeService.showX(posX, posY);
  }

  /**
   * Returns if the piece O must be showed to the
   * position informed.
   *
   * @param number posX
   * @param number posY
   * @return boolean
   */
  showO(posX: number, posY: number): boolean {
    return this.ticTacToeService.showO(posX, posY);
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
    return this.ticTacToeService.showVictory(posX, posY);
  }
}
