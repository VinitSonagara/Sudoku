import { Component, OnInit } from '@angular/core';
import { SudokuService } from 'src/app/services/sudoku.service';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.styl']
})
export class DifficultyComponent implements OnInit {

  difficultyArr:string[]=["random","easy","medium","hard"];
  constructor(private _sudokuService:SudokuService) { }

  ngOnInit(): void {
  }

  onChange(event){
    // console.log(event);
    // console.log(event.target.options.selectedIndex);
    event.preventDefault();
    let index = event.target.options.selectedIndex;
    // console.log(index);
    let difficulty = this.difficultyArr[index];
    // console.log(diff);
    this._sudokuService.setDifficulty(difficulty);

  }
}
