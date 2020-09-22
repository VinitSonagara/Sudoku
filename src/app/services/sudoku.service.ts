import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParameterCodec } from '@angular/common/http';
import { Board } from '../models/board';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {

  
  private _notesSource = new Subject<boolean>();
  notes$ = this._notesSource.asObservable();

  private _numSource = new Subject<number>();
  num$ = this._numSource.asObservable();

  private _difficultySource = new Subject<string>();
  difficulty$ = this._difficultySource.asObservable();

  private _newGameSource = new Subject<boolean>();
  newGame$ = this._newGameSource.asObservable();

  constructor(private http:HttpClient) { }

  setNewGame(newGame:boolean){
    this._newGameSource.next(newGame);
  }

  setDifficulty(difficulty){
    console.log(difficulty);
    this._difficultySource.next(difficulty);
  }

  setNotes(isNotes){
    this._notesSource.next(isNotes);
  }

  setNum(num){
    // console.log(num);
    this._numSource.next(num);
  }

  getSudoku(diff){
    return this.http.get(`https://sugoku.herokuapp.com/board?difficulty=${diff}`);
  }

  validate(data){
    console.log(data);
    
    const url=`https://sugoku.herokuapp.com/validate`;
    
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

    const encodeParams = (params) => 
      Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');

    let body = encodeParams(data);    
    
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded'
    });
    let options = {headers:httpHeaders};

    return this.http.post(url,body,options);
  }


  solve(data){
    console.log(data);

    const url=`https://sugoku.herokuapp.com/solve`;
    
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

    const encodeParams = (params) => 
      Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');

    let body = encodeParams(data);   
    
    let httpHeaders = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded'
    });
    let options = {headers:httpHeaders};

    this.http.post(url,body,options)
        .subscribe(data=>console.log(data));
  }
}