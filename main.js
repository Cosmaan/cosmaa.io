//Restart score and time
function restart() {
  this.count = 0;
  this.time = 0;
  this.disableButton = true;
  this.record = false;
  this.disableInput = true;
  clearTimeout(this.timerID);
  this.badNumber = false;
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
    this.badNumber = true;
    return;
  }
  if (this.count == 0) {
    this.timerID = setInterval(this.timer, 100);
  }
  this.count += 1;
  if (this.count == 1) {
    this.time = this.timeSelect*100;

  }
}

 var appMain = new Vue({
            el: '#main',
            data: {
                translate: '',
                transX: '',
                transY: '',
                CSSColor: '',
                count: 0,
                time: 0,
                timerID: 0,
                timeSelect: 1,
                record: false,
                disableButton: true,
                disableInput: true,
                badNumber: false,
                score: 0,
                nickName: '',
                errorMessage: '',
                showBoard: true,
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
