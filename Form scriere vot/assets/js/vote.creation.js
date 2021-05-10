const answerCreator = document.querySelector(".answer-creator");
const emailsFile = document.querySelector(
  ".building-vote form input[type='file']"
);
const inputs = document.querySelectorAll(".building-vote form input");
const voteCreate = document.querySelector(".vote-create");
let lastSeparator = [];
const data = {
  password: "",
  emailList: "",
  emailSeparator: "",
  voteDuration: "",
  voteTitle: "",
  question: "",
  answers: "",
};

const buildAndAddAnswer = () => {
  let answerNumber = document.querySelector(".vote-answers");

  let input = document.createElement("input");
  input.classList.add("vote_answer");
  input.placeholder = `Answer #${
    answerNumber.children.length ? answerNumber.children.length : 0
  }`;

  let removeButton = document.createElement("a");
  removeButton.innerHTML = '<i class="fas fa-trash"></i>';
  removeButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentNode.parentNode.classList.contains("answer-container")
      ? e.target.parentNode.parentNode.remove()
      : e.target.parentNode.remove();
  });

  let answerContainer = document.createElement("div");
  answerContainer.classList.add("answer-container");

  answerContainer.appendChild(input);
  answerContainer.appendChild(removeButton);
  answerNumber.appendChild(answerContainer);

  //scroll to the bottom
  window.scrollTo(0, document.querySelector("body").scrollHeight);
};

const handleEvents = () => {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keyup", (e) => {
      e.preventDefault();
    });
  }

  voteCreate.addEventListener("click", (e) => {
    data.emailSeparator = inputs[2].nodeValue == "" ? "," : inputs[2].value;

    lastSeparator[0] =
      lastSeparator.length >= 1 ? lastSeparator[0] : data.emailSeparator;
    lastSeparator[0] =
      lastSeparator.length > 1 ? lastSeparator[1] : data.emailSeparator;
    data.emailList = !Array.isArray(data.emailList)
      ? data.emailList.split(data.emailSeparator)
      : data.emailList.join(lastSeparator[0]).split(data.emailSeparator);
    data.emailList[data.emailList.length - 1] = data.emailList[
      data.emailList.length - 1
    ]
      .replace("\n", "")
      .replace("\r", "");
    lastSeparator[1] = data.emailSeparator;
    data.voteDuration = inputs[4].value;
    data.question = inputs[5].value;
    data.password = inputs[0].value;
    data.voteTitle = inputs[3].value;

    const answers = document.querySelectorAll(".vote_answer");
    const answerList = [];
    for (let i = 0; i < answers.length; i++) {
      answers[i].value != "" ? answerList.push(answers[i].value) : null;
    }
    data.answers = answerList;
    if (
      data.emailList != "" &&
      data.voteDuration != "" &&
      data.question != "" &&
      data.password != "" &&
      data.voteTitle != "" &&
      data.answers
    ) {
      console.log(JSON.stringify(data));
    } else {
      alert("Bump, something is not so good..");
    }
  });

  answerCreator.addEventListener("click", (e) => {
    e.preventDefault();
    buildAndAddAnswer();
  });
};

buildAndAddAnswer();
handleEvents();

const openFile = (event) => {
  const input = event.target;

  const reader = new FileReader();
  reader.onload = function () {
    data.emailList = reader.result;
  };
  reader.readAsText(input.files[0]);
};
