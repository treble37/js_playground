var tds = document.querySelectorAll('td');
var state_switch = 0;
var player_elems = document.getElementsByClassName('player');
player_elems[0].innerHTML = "Player "+(state_switch%2+1);
var board=new Array();
var char_arr = ["X","O"];
for (var i = 0; i < tds.length; i++) {
    tds[i].onclick = (function (i) {
        return function () {
            tds[i].innerHTML = char_arr[state_switch%2];
            board[i] = char_arr[state_switch%2];
            var msg = check_if_win(state_switch);
            if (msg!="Nobody wins yet") {
              alert(msg);
            }
            state_switch = (state_switch+1)%2;
            player_elems[0].innerHTML = "Player "+(state_switch%2+1);
        }
    })(i);
}

function check_if_win(state_switch) {
  var victory_msg = "Nobody wins yet";
  win_char = char_arr[state_switch%2];
  //check horiz
  for (var m=0; m<7; m = m+3) {
    if (board[m]==win_char&&board[m+1]==win_char&&board[m+2]==win_char) {
      victory_msg = "Player "+(state_switch%2+1) + " wins"
    }
  }
  //check vert
  for (var m=0; m<3; m++) {
    if (board[m]==win_char&&board[m+3]==win_char&&board[m+6]==win_char) {
      victory_msg = "Player "+(state_switch%2+1) + " wins"
    }
  }
  //check diag
  for (var m=0; m<3; m=m+2) {
    if (board[m]==win_char&&board[m+4]==win_char&&board[m+8]==win_char) {
      victory_msg = "Player "+(state_switch%2+1) + " winsl"
    }
  }
  return victory_msg;
}