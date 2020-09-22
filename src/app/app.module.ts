import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SudokuComponent } from './components/sudoku/sudoku.component';
import { HeaderComponent } from './components/header/header.component';
import { OptionsBoardComponent } from './components/options-board/options-board.component';
import { DifficultyComponent } from './components/difficulty/difficulty.component';

import { SudokuService } from './services/sudoku.service';

@NgModule({
  declarations: [
    AppComponent,
    SudokuComponent,
    HeaderComponent,
    OptionsBoardComponent,
    DifficultyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SudokuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
