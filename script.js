let MainWraperPosts = document.getElementById("PostsWraper");
let overlayPost = document.getElementById("overlay");
let contentPost = document.getElementById("contentPost");
let CloseIcon = document.getElementById("close");
let AddPost = document.getElementById("add");
let overlayAdd = document.getElementById("overlayadd");
let FormPost = document.getElementById("form-post");

function ajaxPost(url, fnc) {
  let requisit = new XMLHttpRequest();
  requisit.open("GET", url);
  requisit.addEventListener("load", function () {
    console.log(this);
    let responseData = JSON.parse(this.responseText);
    fnc(responseData);
  });
  requisit.send();
}
ajaxPost("https://jsonplaceholder.typicode.com/posts", function (data) {
  console.log(data);
  data.forEach((element) => {
    CreatePostDiv(element);
  });
});

function CreatePostDiv(item) {
  let divEl = document.createElement("div");
  divEl.classList.add("PostsContainer");
  divEl.setAttribute("data-id", item.id);
  let TitleEl1 = document.createElement("h3");
  TitleEl1.textContent = item.id;
  let TitleEl2 = document.createElement("h2");
  TitleEl2.textContent = item.title;
  let deletebtn = document.createElement("button");
  deletebtn.textContent = "delete this post";
  deletebtn.setAttribute("dataDeleteId", item.id);
  divEl.appendChild(TitleEl1);
  divEl.appendChild(TitleEl2);
  divEl.appendChild(deletebtn);

  deletebtn.addEventListener("click", function (event) {
    event.stopPropagation();
    console.log(this);
    let deletebtnId = this.getAttribute("dataDeleteId");
    console.log(deletebtnId);
    let newDeleteUrl = `https://jsonplaceholder.typicode.com/posts/${deletebtnId}`;
    console.log(newDeleteUrl);
    fetch(newDeleteUrl, {
      method: "DELETE",
    }).then((json) => console.log(json));
  });
  CloseIcon.addEventListener("click", function () {
    overlayPost.classList.remove("overlayActive");
  });
  divEl.addEventListener("click", function () {
    contentPost.innerHTML = " ";
    overlayPost.classList.add("overlayActive");
    let clickedDivId = this.getAttribute("data-id");
    console.log(clickedDivId);
    let newLink = `https://jsonplaceholder.typicode.com/posts/${clickedDivId}`;
    ajaxPost(newLink, function (NewData) {
      console.log(NewData);
      let pDescr = document.createElement("p");
      pDescr.textContent = NewData.body;
      contentPost.appendChild(pDescr);
    });
  });
  MainWraperPosts.appendChild(divEl);
}

AddPost.addEventListener("click", function () {
  overlayAdd.classList.add("activeOverlay");
});

FormPost.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(this[0].value);

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({ title: this[0].value, userId: 11 }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      overlayAdd.classList.remove("activeOverlay");
      this[0].value = " ";
      CreatePostDiv(json);
      console.log(json);
    });
});
