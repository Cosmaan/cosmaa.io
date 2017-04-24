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
    if (this.nickName.length >= 15) {
      this.errorMessage = 'Nick must be less then 15 symbols!';
      this.alertAppeare = true
      return;
    }
    else if (this.nickName.length == 0) {
      this.errorMessage = 'Nick can not be empty!';
    //  this.alertAppeare = true;
    //  return;
    }
    else {
      this.alertAppeare = false;
    }

    this.clickPage = true
    //firebase.database().ref('users/'+this.nickName).set(this.score);
}

//Open + Reload ScoreBoard (sb)
function osb(scoreBoard) {
  let sb = scoreBoard;
  reffer.orderByValue().limitToLast(20).once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      let currentNick = childSnapshot.key;
      let currentScore = childSnapshot.val();
      sb.push([currentNick, currentScore]);
    });
    sb.reverse();
  });
}
