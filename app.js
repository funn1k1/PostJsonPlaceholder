const sendBtn = document.querySelector(".btn-send");
const apiURL = "https://jsonplaceholder.typicode.com/posts";
const container = document.querySelector(".container");

function postRequest(body, cb) {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", apiURL);

  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    cb(response);
  });

  xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");

  xhr.addEventListener("error", () => {
    console.log(`Error ${xhr.status}: ${xhr.statusText}`);
  });

  xhr.send(JSON.stringify(body));
}

function createObjForm() {
  const form = document.forms[0];
  const name = form.elements["name"].value;
  const email = form.elements["email"].value;
  const username = form.elements["username"].value;
  const phone = form.elements["phone"].value;
  const website = form.elements["website"].value;

  return {
    name,
    email,
    username,
    phone,
    website,
  };
}

function validateData() {
  const form = document.forms[0];
  const fields = form.querySelectorAll("input");
  for (let i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
      alert("Fill in all the fields");
      return false;
    }
  }
  return true;
}

function getUserCallBack(post) {
  const card = document.createElement("div");
  card.classList.add("card", "mt-3");
  const header = document.createElement("h5");
  header.className = "card-header";
  header.textContent = `
    Name: ${post.name}, username: ${post.username}
  `;
  const body = document.createElement("div");
  body.className = "card-body";
  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = post.phone;
  const text = document.createElement("p");
  text.className = "card-text";
  text.textContent = `Email: ${post.email}, website: ${post.website}`;
  body.append(title, text);
  card.append(header, body);
  container.insertAdjacentElement("afterbegin", card);
}

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const obj = createObjForm();
  let isValidate = validateData();
  if (!isValidate) return;
  postRequest(obj, getUserCallBack);
});
