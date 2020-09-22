import { Component, OnChanges, OnInit} from '@angular/core';
import { SudokuService } from 'src/app/services/sudoku.service';

@Component({
  selector: 'app-options-board',
  templateUrl: './options-board.component.html',
  styleUrls: ['./options-board.component.styl']
})
export class OptionsBoardComponent implements OnInit {

  isNotes:boolean=false;
  isNewGame:boolean=false;
  optionsArr = [1,2,3,4,5,6,7,8,9,"Notes","Undo","Erase"];

  constructor(private _sudokuService:SudokuService) { }

  ngOnInit(): void {
  }

  newGame(event){
    this.isNewGame=true;
    this._sudokuService.setNewGame(this.isNewGame);
    this.isNewGame=false;
  }

  onClick(event,i){
    console.log(event.path[0].textContent);
    
    if(i === 9){
      if(this.isNotes === false){
        this.isNotes=true;
      }
      else{
        this.isNotes=false;
      }
      // console.log(this.isNotes);

      this._sudokuService.setNotes(this.isNotes);
    }
    else if(i===0 || i===1 || i===2 || i===3 || i===4 || i===5 || i===6 || i===7 || i===8){
      this._sudokuService.setNum(parseInt(event.path[0].textContent));
      // console.log(this.isNotes);
      if(this.isNotes === false){
        this._sudokuService.setNotes(false);
      }
    }


  }

}
