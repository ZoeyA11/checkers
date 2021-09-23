import React, { useState } from 'react';
import "./board.css";
import {Typography, Box, Fab } from '@material-ui/core';
import logo from "../Icon/Icon_64x64.png";
import logow from "../IconW/Icon_64x64.png";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];//Axis y
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];//axis x
var clickblack = 0;//value of the clicked black piece button 
var clickwhite=0;//value of the clicked white piece button
var clickblank=0;//value of the clicked blank button
var clickb=false;//check if the black piece button clicked
var clickw=false;//check if the white piece button clicked
var clickblankbool=false;//check if the blank button(without piece) clicked
var bpiece=true;//check if the pieces can move


export default function Board() {
    const [board, setBoard] = useState([]);// the checkerboard
    const [blackisnext, setBisnext]= useState(true);// player turn
    const [start, setStart]=useState(true);//check if its the first time running the game
    const [win, setWin]=useState([]);//array that contains the pieces in the first row of the enemy

    if (start){
      //setting the board
        for (let j = verticalAxis.length - 1; j >= 0; j--) {
            for (let i = 0; i < horizontalAxis.length; i++) {
                const number = j + i + 2;
        
                if(number % 2 === 0) {
                    board.push(
                        <button name='blank' className="tile black-tile" onClick={() => handleBlank((verticalAxis[7-j]*8 - (7-i))-1) }></button>
                      );
                } else {
                    board.push(
                        <div className="tile white-tile"></div>
                      );
                }
            }
          }
      // setting the first pieces
        for (let k=0; k< 24 ; k++){
          if (k % 2 ===1 && ((k>=16 && k<24) || (k>=0 && k<8))) {
              board[k]=<button name='black' className= "button" onClick={() =>(handleBlack(k))}><img src={logo} alt="Logo" class="center" /></button>;
          }
          else if (k % 2 ===0 && (k>=8 && k<16 )){
                board[k]=<button name='black' className= "button" onClick={() =>(handleBlack(k))}><img src={logo} alt="Logo" class="center" /></button>;
          }
      }

      for (let k=40; k< 64 ; k++){
        if (k % 2 ===0 && ((k>=56 && k<64) || (k>=40 && k<48))) {
            board[k]=<button name='white' className= "button" onClick={() =>(handleWhite(k))}><img src={logow} alt="Logo" class="center"/></button>;
        }
        else if (k % 2 ===1 && (k>=49 && k<56 )){
            board[k]=<button name='white' className= "button" onClick={() =>(handleWhite(k))}><img src={logow} alt="Logo" class="center"/></button>;

        }
      }
          setStart(false);
    }


const handleBlack=(i) =>{
  //i: the index of the clicked black button
  //handle func when black piece clicked
  clickw=false;
  clickblankbool=false;
  clickb=true;
  clickblack= i;
  };


const handleWhite=(i) =>{
  //i: the index of the clicked white button
  //handle func when white piece clicked
  clickblankbool=false;
  clickb=false;
  clickw=true;
  clickwhite= i;
  };


const handleBlank=(i)=>{
  //i: the index of the clicked blank button
  //handle func when blank piece clicked, the func check if the black/white piece can move.
  clickblank=i;
  clickblankbool=true;
  if (clickblankbool && clickb && bpiece)
  {
    moveblack();
  }
  if (clickblankbool && clickw && !bpiece)
  {
    movewhite();
  }
};


const WinBlack=(piece) =>{
  //piece: target index
  //check if player 1 win
  var indexW=62;
  while(indexW >= 56)
  {
    if(piece=== indexW ){
        win.push(piece);
        setWin(win);
    }
    if(win.length ===2){
      alert('Player 1 win!!!');
      indexW = 55;
      setWin([]);
      window.location.reload();
    }
    indexW--;
  }
};


const WinWhite=(piece)=>{
  //piece: target index
  //check if player 2 win
  var indexW=1;
  while(indexW <= 7)
   {
     if(piece=== indexW ){
         win.push(piece);
         setWin(win);
     }
     if(win.length ===2){
       alert('Player 2 win!!!');
       indexW = 8;
       window.location.reload();
       setWin([]);
     }
     indexW++;
   }
};

const movewhite=() =>{
  //responsible for moving the white pieces include eating, checking for white win.
    bpiece=true;
      setBisnext(true);
      if (clickwhite>0 &&clickblank>0&& (clickwhite-clickblank === 7 || clickwhite-clickblank===9)){
        //moving the white by moving diagonally
          let whitepiece=clickwhite;
          board[whitepiece]=<button name='blank' className="tile black-tile"  onClick={() => handleBlank(whitepiece)}></button>;
          let blankPiece=clickblank;
          board[blankPiece]=<button name='white' className= "button" onClick={() =>(handleWhite(blankPiece))}><img src={logow} alt="Logo" class="center"/></button>; 
          setBoard(board);
          WinWhite(blankPiece);
        }
      else if (clickwhite>0&&clickblank>0&& (clickwhite-clickblank===14 || clickwhite-clickblank===18)){
        //eating the black piece and moving diagonally
        let whitepiece =clickwhite; 
        let blankPiece=clickblank; 
        let middlepiece;
        if (clickwhite-clickblank ===14){
          middlepiece= clickwhite-7;
        }
        else{
          middlepiece= clickwhite-9;
        }
       if (board[middlepiece].props.name ==='black'){
          board[whitepiece]=<button name='blank' className="tile black-tile"  onClick={() =>  handleBlank(whitepiece)}></button>;
          board[middlepiece]=<button name='blank' className="tile black-tile"  onClick={() =>  handleBlank(middlepiece)}></button>;
          board[blankPiece]=<button name='white' className= "button" onClick={() =>(handleWhite(blankPiece))}><img src={logow} alt="Logo" class="center"/></button>; 
          setBoard(board);
          WinWhite(blankPiece);
        }
      else{ 
        alert('Player2: There is no one to eat, try again!')
        bpiece = false;
        setBisnext(false);
      }
      }
      else if(clickwhite>0) 
      {
        alert("Player2 please move by the rules!");
        bpiece=false;
        setBisnext(false);
      }
};


const moveblack = () => {
  //responsible for moving the black pieces include eating, checking for black win.
      bpiece=false;
        setBisnext(false);
        if (clickblack>0 && clickblank>0 &&( clickblank-clickblack === 7 || clickblank- clickblack===9)){
          //moving the black by moving diagonally
            let blackpiece= clickblack;
            board[blackpiece]=<button name='blank' className="tile black-tile"  onClick={() =>  handleBlank(blackpiece)}></button>;
            let blankPiece=clickblank;
            board[blankPiece]=<button name='black' className= "button" onClick={() =>(handleBlack(blankPiece))}><img src={logo} alt="Logo" class="center"/></button>; 
            setBoard(board);
            WinBlack(blankPiece);
            setBisnext(false);
        }
        else if (clickblack>0 && clickblank>0 &&(clickblank-clickblack===14 || clickblank-clickblack===18)){
          //eating the white piece and moving diagonally
          let blackpiece =clickblack; 
          let blankPiece=clickblank; 
          let middlepiece;
          if (clickblank-clickblack ===14)
          {
            middlepiece=clickblank-7;
          }
          else{
            middlepiece=clickblank-9;
          }
         if (board[middlepiece].props.name ==='white'){
            board[blackpiece]=<button name='blank' className="tile black-tile"  onClick={() =>  handleBlank(blackpiece)}></button>;
            board[middlepiece]=<button name='blank' className="tile black-tile"  onClick={() =>  handleBlank(middlepiece)}></button>;
            board[blankPiece]=<button name='black' className= "button" onClick={() =>(handleBlack(blankPiece))}><img src={logo} alt="Logo" class="center"/></button>;
            setBoard(board);
         }
        else{
          alert("Player1: There is no one to eat, try again!")
          bpiece=true;
          setBisnext(true);
           }
           WinBlack(blankPiece);
        }
        else {
          alert("Player1 please move by the rules!"); 
          bpiece =true;
          setBisnext(true);
          }
  };

const handleCancel=()=>{
  clickw = false;
  clickb=false;
  clickblack=0;
  clickwhite=0;
};

const status = `${blackisnext ? 'Player1': 'Player2'} is playing now`

  return( 
  <Typography component="div">
    <Box sx={{ fontWeight: 'regular', m: 1 }}>Player1- Black piece | Player2- White piece</Box>
    <Box sx={{ fontWeight: 'bold', m: 1 }}>{status}</Box>
    <Box sx={{ fontWeight: 'regular', m: 1 }}>
      Cancel the selceted piece press: 
      <Fab variant="extended" size="small" color="primary" aria-label="add" type='reset' className="Cancel" onClick={()=>handleCancel()} >Cancel</Fab>
      </Box> 
  <div id="board">
      {board.map((v, index) =>
  <div key={index}>
    {v}
  </div>)}
      </div>
      </Typography>
  );
}