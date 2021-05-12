var upgradeTime = 172801; //2 days
var seconds = upgradeTime;
var countdownTimer;
function timer() {
  var days = Math.floor(seconds / 24 / 60 / 60);
  var hoursLeft = Math.floor((seconds) - (days * 86400));
  var hours = Math.floor(hoursLeft / 3600);
  var minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
  var minutes = Math.floor(minutesLeft / 60);
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

function alertAnswer() {
  var inputs = form.elements;
  var radios = [];
  let finalAnswer = "";

  for (var i = 0; i < inputs.length; ++i) {
    if (inputs[i].type == 'radio') {
      radios.push(inputs[i]);
    }
  }

  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      finalAnswer = radios[i].id;
    }
  }
  if (finalAnswer != "" && seconds > 0) {
    successfulVote(finalAnswer)
  }
  else
    if (finalAnswer == "")
      alert("Nu ati selectat nici o varianta")
    else if (seconds <= 0) {
      timedOutVote();
    }
}

function successfulVote(finalAnswer) {
  alert(finalAnswer)
  window.location.href = window.location.origin + "/Mesaj%20-%20votare%20cu%20succes/index.html";
}

function timedOutVote() {
  window.location.href = window.location.origin + "/Mesaj - a expirat timpu/index.html";
}




//form logic 
function generateInput(option) {
  var string = `<label class="container">${option.title}
        <input type="radio"  name="radio" id="${option.id}">
        <span class="radioMark"></span>
      </label>`
  var opt = document.createElement('div')
  var range = document.createRange();
  range.selectNodeContents(opt)
  var input = range.createContextualFragment(string);
  opt.appendChild(input);
  return opt.firstElementChild;
}

function generateSubmitButton() {
  var string = `  <input type="submit" name="vote" class="vote" value="Submit vote!" class="submit-vote" onsubmit="alertAnswer()">`
  var btnContainer = document.createElement('div')
  var range = document.createRange();
  range.selectNodeContents(btnContainer)
  var btn = range.createContextualFragment(string);
  btnContainer.appendChild(btn);
  return btnContainer.firstElementChild;
}

async function fetchVoteDetails(id) {
  // let data=await fetch(...)
  let data = {
    voteTitle: "Test",
    expirationDate: "2021/05/14",
    voteDescription: "vote description/question",
    options: [
      { title: "Option1", id: "1" },
      { title: "option2", id: "2" },
      { title: "option3", id: "3" }]
  }

  return data;

}


async function onPageLoaded() {
  let data = await fetchVoteDetails()

  document.getElementById("voteTitle").innerHTML = data.voteTitle;
  document.getElementById("voteDescription").innerHTML = data.voteDescription;
  seconds = Math.floor((new Date(data.expirationDate).getTime() - new Date().getTime()) / 1000);

  countdownTimer = setInterval('timer()', 1000);

  data.options.forEach(option => {
    document.getElementById("form").appendChild(generateInput(option));
  })
  document.getElementById("form").appendChild(generateSubmitButton());
}

window.onload = onPageLoaded