//Input Filter
Vue.directive("filter", {
  bind: function(el, binding) {
    this.inputHandler = function(e) {
      var ch = String.fromCharCode(e.which);
      var re = new RegExp(binding.value);
      if (!ch.match(re)) {
        e.preventDefault();
      }
    };
    el.addEventListener("keypress", this.inputHandler);
  },
  unbind: function(el) {
    el.removeEventListener("keypress", this.inputHandler);
  },
  inputHandler: null
});

//Restart score and time
function restart() {
  this.score = 0;
  this.time = 500;
  this.disableButton = true;
  this.record = false;
  this.disableInput = true;
  this.showBoard = false;
  clearTimeout(this.timerID);
  this.alertAppeare = false;

}

//Generate color
function getColor() {
  return 'rgb(' + String( Math.floor(Math.random() * (255 - 1)) + 1) +
           ', ' + String( Math.floor(Math.random() * (255 - 1)) + 1) +
           ', ' + String( Math.floor(Math.random() * (255 - 1)) + 1) + ')';
}

//Run timer
function timer() {
  this.transX = String( Math.floor(Math.random() * (10 - 1)) + 1),
  this.transY = String( Math.floor(Math.random() * (10 - 1)) + 1),
  this.translate = 'translate(' + this.transX + 'px, ' + this.transY + 'px)';
  this.time -= 10;
  if (this.time <= 0) {
    this.record = true;
    this.disableButton = false;
    clearTimeout(this.timerID);
    //Open + Reload ScoreBoard (sb)
    firebase.database().ref('users/'+this.nickName).set(this.score);
    this.scoreBoard = [];
    let sb = this.scoreBoard;
    reffer.orderByValue().limitToLast(50).once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        let currentNick = childSnapshot.key;
        let currentScore = childSnapshot.val();
        sb.push([currentNick, currentScore]);
      });
      sb.reverse();
    });
    //Open + Reload ScoreBoard (sb)
    this.showBoard = true;
    return;
  }
}

//Run click count
function clickUp() {
  this.transDeg = 'rotate(' + String( Math.floor(Math.random() * (10 - 1)) + 1) + 'deg)';
  this.CSSColor = getColor();
  //console.log(this.tweenedCSSColor);
  this.disableInput = false;
  if (this.timeSelect <= 0) {
    this.errorMessage = 'You can\'t click at 0 seconds';
    this.alertAppeare = true;
    return;
  }
  if (this.score == 0) {
    this.timerID = setInterval(this.timer, 100);
  }
  this.score += 1;
  if (this.score == 1) {
    this.time = this.timeSelect*100;

  }
}

 var appMain = new Vue({
            el: '#main',
            data: {
              clickPage: false,
              translate: '',
              transX: '',
              transY: '',
              CSSColor: '',
              time: 500,
              timerID: 0,
              timeSelect: 5,
              record: false,
              alertAppeare: false,
              disableButton: true,
              disableInput: true,
              score: 0,
              nickName: '',
              errorMessage: '',
              showBoard: false,
              scoreBoard: [],
            },
            methods: {
              play: play,
              osb: osb,
              restart: restart,
              timer: timer,
              clickUp: clickUp,
            }
        })
