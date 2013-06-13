var tds = document.querySelectorAll('td');
var state_switch = 0;
var char_arr = ["X","O"]
for (var i = 0; i < tds.length; i++) {
    tds[i].onclick = (function (i) {
        return function () {
            tds[i].innerHTML = char_arr[state_switch%2];
            state_switch = (state_switch+1)%2;
        }
    })(i);
}