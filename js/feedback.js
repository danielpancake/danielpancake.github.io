/* This script handles feedback form */
const preName = ["Perhaps it's", "Maybe it's", "...or", "It's definitely", "Maybe", "I think, it's", "You must be"];
const nameList = ["Alexander", "Danila", "Steve", "Maria", "David", "Henry", "Owen", "Daisy", "Daniel", "George", "Dolores", "Yaraslava", "Oscar", "Jacob", "Lawrence", "Kaiden", "Desmond", "Ben", "Maxim", "Arina", "Arnold", "Jack"];

const nameInput = document.getElementById("name");

let nameListPos = 0;
setInterval(() => {
  nameListPos = ++nameListPos % nameList.length;
  nameInput.placeholder = "* " + preName[Math.round(Math.random() * preName.length)] + " " + nameList[nameListPos];
}, 5000);

const smtpjs = (name, email, subject, body) => {
  let message = name + " wrote to you: " + body;
  if (email != "") { message += "Write back, " + email; }
  Email.send({
    SecureToken: "2d60c5e6-b738-4a95-8e38-45075cf81d32",
    To: "inboxpancake@gmail.com",
    From: "inboxpancake@gmail.com",
    Subject: subject,
    Body: message
  }).then((response) => {
    if (response == "OK") {
      alert(`❤ Thank you for your letter, ${name}!`);
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("body").value = "";
      window.scrollTo(0, 0);
    } else {
      alert("< ! > Error occurred!");
    }
  });
}

// Sending a feedback
const sendfeedback = () => {
  smtpjs(document.getElementById("name").value, document.getElementById("email").value,
    document.getElementById("subject").value, document.getElementById("body").value);
}