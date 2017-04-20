
(function() {

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCal7Z0k-uFVLaQiSDlsd-XgwQ6G_ovVwc",
    authDomain: "cosmaan-game.firebaseapp.com",
    databaseURL: "https://cosmaan-game.firebaseio.com",
    projectId: "cosmaan-game",
    storageBucket: "cosmaan-game.appspot.com",
    messagingSenderId: "562207389623"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  //var database = firebase.database();
// Initialize Firebase

const preObject = document.getElementById('object');

const dbRefObject = firebase.database().ref().child('object');

dbRefObject.on('value', snap => console.log(snap.val()));

//console.log('ebat', dbRefObject)

}());

function restart() {
  this.count = 0;
  this.time = 0;
  this.disableButton = true;
  this.record = false;
  this.disableInput = true;
  clearTimeout(this.timerID);
  this.badNumber = false;
}

function getColor() {
  return 'rgb(' + String( Math.floor(Math.random() * (255 - 1)) + 1) +
           ', ' + String( Math.floor(Math.random() * (255 - 1)) + 1) +
           ', ' + String( Math.floor(Math.random() * (255 - 1)) + 1) + ')';
}
 var app = new Vue({
            el: '#app',
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
                badNumber: false
            },
            methods: {
                restart: restart,
                timer: function() {
                  this.transX = String( Math.floor(Math.random() * (10 - 1)) + 1),
                  this.transY = String( Math.floor(Math.random() * (10 - 1)) + 1),
                  this.translate = 'translate(' + this.transX + 'px, ' + this.transY + 'px)';
                  //console.log(this.translate);
                  this.time -= 10;
                  if (this.time <= 0) {
                    this.record = true;
                    this.disableButton = false;
                    clearTimeout(this.timerID);
                    return;
                  }
                },
                up: function() {
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
                },
          }

        })
