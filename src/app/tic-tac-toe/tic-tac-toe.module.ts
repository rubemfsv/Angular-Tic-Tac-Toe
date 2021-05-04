import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToeComponent } from './';
import { TicTacToeService } from './shared';

@NgModule({
  imports: [CommonModule],
  declarations: [TicTacToeComponent],
  exports: [TicTacToeComponent],
  providers: [TicTacToeService],
})
export class TicTacToeModule {}
