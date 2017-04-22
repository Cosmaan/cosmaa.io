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

//Getting database
const reffer = firebase.database().ref('users');

//Login
function play() {
    if (this.nickName == '') {
      this.errorMessage = 'Invalid nick';
      this.alertAppeare = true;
      return;
    }
    else {
      this.alertAppeare = false;
    }
    firebase.database().ref('users/'+this.nickName).set(this.score);
}

//Open + Reload ScoreBoard (sb)
function osb() {
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
}


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
