var tds = document.querySelectorAll('td');
var state_switch = 0;
var player_elems = document.getElementsByClassName('player');
player_elems[0].innerHTML = "Player "+(state_switch%2+1);
var board=new Array();
var char_arr = ["X","O"];

for (var i = 0; i < tds.length; i++) {
    // tds[i].onclick = (function (m) {
    //     return function () {
    //         tds[m].innerHTML = char_arr[state_switch%2];
    //         board[m] = char_arr[state_switch%2];
    //         var msg = check_if_win(state_switch);
    //         if (msg!="Nobody wins yet") {
    //           alert(msg);
    //         }
    //         state_switch = (state_switch+1)%2;
    //         player_elems[0].innerHTML = "Player "+(state_switch%2+1);
    //     }
    // })(i);
  //Above, you need the outer function(m) to make (i) available to the inner function
  tds[i].onclick = function() {
         this.innerHTML = char_arr[state_switch%2];
            var msg = check_if_win(state_switch);
            if (msg!="Nobody wins yet") {
              alert(msg);
            }
            state_switch = (state_switch+1)%2;
            player_elems[0].innerHTML = "Player "+(state_switch%2+1);
        };
}


function check_if_win(state_switch) {
  var victory_msg = "Nobody wins yet";
  win_char = char_arr[state_switch%2];
  var board_elems = document.querySelectorAll('td');
  //check horiz
  for (var m=0; m<7; m = m+3) {
    if (board_elems[m].innerHTML==win_char&&board_elems[m+1].innerHTML==win_char&&board_elems[m+2].innerHTML==win_char) {
      victory_msg = "Player "+(state_switch%2+1) + " wins"
    }
  }
  //check vert
  for (var m=0; m<3; m++) {
    if (board_elems[m].innerHTML==win_char&&board_elems[m+3].innerHTML==win_char&&board_elems[m+6].innerHTML==win_char) {
      victory_msg = "Player "+(state_switch%2+1) + " wins"
    }
  }
  //check diag
  for (var m=0; m<3; m=m+2) {
    if (board_elems[m].innerHTML==win_char&&board_elems[m+4].innerHTML==win_char&&board_elems[m+8].innerHTML==win_char) {
      victory_msg = "Player "+(state_switch%2+1) + " winsl"
    }
  }
  return victory_msg;
}