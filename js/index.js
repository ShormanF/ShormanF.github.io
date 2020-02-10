console.log("hello world");
$(document).ready(function(){
             if (jQuery) {
               // jQuery is loaded
               alert("Yeazzzer!");
             } else {
               // jQuery is not loaded
               alert("Doesn't Work");
             }
          });
//test monitor^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
class Connect4{
  constructor(selector){
    this.ROWS = 6;
    this.COLS = 7;
    this.player ='one';
  //  that.playerTwo ='two';
    this.selector = selector;
    this.gameOver = false;
    this.generateGrid();
    this.addEvent();
  }

  generateGrid(){
    const $slots = $(this.selector);
    $slots.empty();
    this.gameOver = false;
    this.player = 'one';

    for(let row = 0; row < this.ROWS; row++){
      const $row = $('<div>')
          .addClass('row');

      for(let col =0; col < this.COLS; col++){
        const $col =$('<div>')
          .addClass('col empty')
          .attr('data-col', col)//specify the colomn
          .attr('data-row', row);//specify the row
          $row.append($col);
      }
        $slots.append($row);
    }
  }

  addEvent(){
    const $slots = $(this.selector);
    const that = this;

    function findLastEmptySpace(col) {
      const spaces = $(`.col[data-col='${col}']`);

      for (let i = spaces.length - 1; i >=0; i--) {
        const $space = $(spaces[i]);

        if ($space.hasClass('empty')) {
          return $space;
        }
      }
      return null;
    }

    $slots.on('click', '.col.empty', function() {
      if(that.gameOver)
      return;

      const col = $(this).data('col');//trying to get the index
      const $lastEmptySpace = findLastEmptySpace(col);
      $lastEmptySpace.addClass(`next-${that.player}`);   //this add a chip to the next cell could switch to `next-${that.player}`

    });

    $slots.on('click', '.col', function() {
      $('.col').removeClass(`next-${that.player}`);
    });

    $slots.on('click', '.col.empty', function() {
      if(that.gameOver)
      return;

      const col = $(this).data('col');
    //  const row =$(this).data('row');
      const $lastEmptySpace = findLastEmptySpace(col);
      $lastEmptySpace.removeClass(`empty next-${that.player}`);
      $lastEmptySpace.addClass(that.player);
      $lastEmptySpace.data('player', that.player);

      const winner = that.checkForWinner(
        $lastEmptySpace.data('row'),
        $lastEmptySpace.data('col')
      )
      if (winner) {
        that.gameOver = true;

        window.alert(`Game Over Player ${that.player} has won!`);

        $('.col.empty').removeClass('empty');

        return;
      }

      that.player = (that.player === 'one') ? 'two' :  'one';
       $(this).trigger('mouseenter');//should be under the line under this to avoid the left behind shadow color
    });
  }

  checkForWinner(row, col) {
    const that = this;

    function $getSpace(x, y) {
      return $(`.col[data-row='${x}'][data-col='${y}']`);
    }

    function checkDirection(direction) {
      let total = 0;
      let x = row + direction.x;
      let y = col + direction.y;
      let $next = $getSpace(x, y);
      while (x >= 0 && x < that.ROWS && y >= 0 && y < that.COLS && $next.data('player') === that.player) {
          total++; x += direction.x; y += direction.y; $next = $getSpace(x, y);
        }
        return total;
    }

    function checkWin(directionA, directionB) {
      const total = 1 + checkDirection(directionA) + checkDirection(directionB);
      if (total >= 4) {
        return that.player;
      }
      else {
        return null;
      }
    }

    function checkVerticals() {
      return checkWin({
        x: -1, y: 0}, {x: 1, y: 0
        });
    }

    function checkDiagonalTLtoBR() {
      return checkWin({
        x: 1, y: 1}, {x: -1, y: -1
        });
    }

    function checkHorizontals() {
      return checkWin({
        x: 0, y: -1}, {x: 0, y: 1
        });
    }

    function checkDiagonalBLtoTR() {
      return checkWin({
        x: 1, y: -1}, {x: 1, y: 1
        });
    }


    return checkVerticals() || checkHorizontals() || checkDiagonalBLtoTR();
  }

  restart() {
    this.generateGrid();
  }
}
console.log(this.player);
