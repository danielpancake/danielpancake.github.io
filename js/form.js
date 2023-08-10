let form = document.getElementById("feedback-form");

async function handleSubmit(event) {
  event.preventDefault();

  let status = document.getElementById("feedback-form-status");
  let submit = document.getElementById("feedback-submit");
  let data = new FormData(event.target);

  // Disable submit button
  submit.disabled = true;
  submit.value = "Sending an e-mail...";

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML = "<3 Thank you for your submission!";
        form.reset();

        submit.disabled = false;
        submit.value = "Send";
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";

            submit.disabled = false;
            submit.value = "Send again";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
      console.log(error);

      submit.disabled = false;
      submit.value = "Send again";
    });
}

form.addEventListener("submit", handleSubmit);
