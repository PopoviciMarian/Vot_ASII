var upgradeTime = 172801; //2 days
var seconds = upgradeTime;

function timer() {
  var days        = Math.floor(seconds/24/60/60);
  var hoursLeft   = Math.floor((seconds) - (days*86400));
  var hours       = Math.floor(hoursLeft/3600);
  var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
  var minutes     = Math.floor(minutesLeft/60);
  var remainingSeconds = seconds % 60;
  function pad(n) {
    return (n < 10 ? "0" + n : n);
  }
  document.getElementById('countdown').innerHTML = pad(days) + ":" + pad(hours) + ":" + pad(minutes) + ":" + pad(remainingSeconds);
  if (seconds == 0) {
    clearInterval(countdownTimer);
    document.getElementById('countdown').innerHTML = "Expired";
  } else {
    seconds--;
  }
}
var countdownTimer = setInterval('timer()', 1000);

function alertAnswer(){
  var radioAnswers = document.forms[0];
  var finalAnswer = "";
  for(var i = 0; i < radioAnswers.length; i++){
    if(radioAnswers[i].checked){
      finalAnswer = document.getElementById(radioAnswers[i].id).textContent;
    }
  }
  alert(finalAnswer);
  if(finalAnswer != "" && seconds > 0){
    successfulVote()
  }else if(seconds <= 0){
    timedOutVote();
  }
}

function successfulVote(){
  window.location.href = "..\Mesaj - votare cu succes\index.html"; 
}

function timedOutVote(){
  window.location.href = "..\Mesaj - a expirat timpu\index.html"; 
}