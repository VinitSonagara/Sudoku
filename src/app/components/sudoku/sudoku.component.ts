import {AfterContentInit, Component,DoCheck,OnChanges,OnDestroy,OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { SudokuService } from 'src/app/services/sudoku.service';

let m=0;

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.styl']
})
export class SudokuComponent implements OnInit{

  temp= [[],[],[],[],[],[],[],[],[]];
  tempKey1;
  sudokuData:any;
  sudokuRows:number[]=[];
  notes:boolean=false;
  notesBox:number[]=[1,2,3,4,5,6,7,8,9];
  num:number=0;
  clickEvent;
  notesClickEvent;
  diffculty:string="random";
  isNewGame:boolean=false;

  constructor(private _sudokuService:SudokuService) {}

  ngOnInit(): void {  
    console.log(`Called ${m++} times`); 
    /** 
    TO PRINT SUDOKU FOR FIRST TIME. 
    **/ 
    this._sudokuService.getSudoku(this.diffculty)
          .subscribe(data=>{
            this.sudokuData = data;

            // ARRAY USED TO PUT DATA FROM API TO TEMPLATE
            this.sudokuRows=[];
            console.log( this.sudokuData);
            for(let i=0;i<9;i++){
              this.sudokuRows.push(this.sudokuData.board[i]);
            }
            // console.log(this.sudokuRows);

            // TO CALL API AND GET SOLUTION
            this._sudokuService.solve(this.sudokuData);  

    });//data.board[0][0]

    /** 
    TO PRINT SUDOKU WHEN NEW GAME BUTTON IS CLICKED 
    **/ 
    this._sudokuService.newGame$
        .subscribe(newGame=>{
        // console.log(diff);
        this.isNewGame=newGame;
        // console.log(this.diffculty);

        if(this.isNewGame === undefined){
        this.isNewGame= false;
        }

        /** 
        TO GET SUDOKU ACCORDING TO THE DIFFICULTY LEVEL 
        **/
        this._sudokuService.getSudoku(this.diffculty)
            .subscribe(data=>{
            this.sudokuData = data;

            /** 
            ARRAY USED TO PUT DATA FROM API TO TEMPLATE 
            **/ 
            this.sudokuRows=[];
            // console.log( this.sudokuData);
            for(let i=0;i<9;i++){
              this.sudokuRows.push(this.sudokuData.board[i]);
            }
            // console.log(this.sudokuRows);

            /** TO CALL API AND GET SOLUTION */ 
            // this._sudokuService.solve(this.sudokuData);  
        });//data.board[0][0]
    });     

    /** 
    TO SELECT DIFFICULTY LEVEL 
    **/  
    this._sudokuService.difficulty$
      .subscribe(diff=>{
        // console.log(diff);
        this.diffculty=diff;
        // console.log(this.diffculty);

        if(this.diffculty === undefined){
          this.diffculty = "easy";
        }

        /** 
        TO GET SUDOKU ACCORDING TO THE DIFFICULTY LEVEL 
        **/
        this._sudokuService.getSudoku(this.diffculty)
          .subscribe(data=>{
            this.sudokuData = data;

            /** 
            ARRAY USED TO PUT DATA FROM API TO TEMPLATE 
            **/ 
            this.sudokuRows=[];
            // console.log( this.sudokuData);
            for(let i=0;i<9;i++){
              this.sudokuRows.push(this.sudokuData.board[i]);
            }
            // console.log(this.sudokuRows);

            /** TO CALL API AND GET SOLUTION */ 
            // this._sudokuService.solve(this.sudokuData);  

        });//data.board[0][0]
    }); 

    
    // TO TURN NOTES ON AND OFF
    this._sudokuService.notes$
        .subscribe(isNotes=>{
          this.notes = isNotes;
          // console.log("From sudoku comp"+this.notes);
          
        }); 

    // TO FILL DATA IN SUDOKU FROM SIDEBOX
    this._sudokuService.num$
      .subscribe(num=>{
        this.num=num;
        // console.log(this.num);
        if(this.clickEvent != undefined && this.notes === false){
          this.clickEvent.target.value=this.num;
        }

        // will have to solve this using view decorator 
        else{
          console.log(this.notesClickEvent);
          this.notesClickEvent.path[1].childNodes[this.num-1].value=this.num;
        }

    });  

    // TO FILL DATA IN NOTES FROM SIDEBOX
    
  }

  // USED IN PROCESS TO FILL DATA IN SUDOKU FROM SIDEBOX
  onClick(event){
    this.clickEvent=event;
  }

  notesClicked(event){
    this.notesClickEvent=event;
  }




  // TO FILL DATA ACCORDING TO THE KEY PRESSED
  onKey(event){

    // TO GET THE KEYPRESSED.
    this.tempKey1 = event.path[0].value;
    // console.log(this.tempKey1,typeof this.tempKey1);
    this.tempKey1 = this.tempKey1.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

    // PUT THE PRESSED KEY VALUE IN THE SELECTED BOX.
    event.path[0].textContent = this.tempKey1;

    if(event.path[5].textContent.replace(/ /g,'').length === 81){
      this.tempKey1 = event.path[5].textContent.replace(/ /g,'');
      let count=0;
      for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
          this.temp[i][j] = parseInt(this.tempKey1[count++]);
          // console.log(this.temp[i][j]);
        }
      }
      // console.log(this.temp,typeof this.temp);
      let boards:{board:any} = {board:this.temp};
      // boards.board = this.temp;
      // console.log(boards);
      this._sudokuService.validate(boards)
          .subscribe(isValid=>{
              let isValidTemp:any = isValid;
              // console.log(isValidTemp.status);
              if(isValidTemp.status === "solved"){
                alert("Congratulations!!");
              }
          })
    }    
    // console.log(event.path[5].textContent.replace(/ /g,''));
  }

}
