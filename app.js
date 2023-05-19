// random quote

const quoteCont = document.querySelector("#rnd_quote")
const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
    x = JSON.parse(this.responseText)
		console.log(x.text);
    quoteCont.innerHTML = `"${x.text}" - ${x.author}`
	}
});

xhr.open('GET', 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info');
xhr.setRequestHeader('X-RapidAPI-Key', 'ebd2857925mshcc1791ec740c585p1957c7jsn4a5a36b3b9c6');
xhr.setRequestHeader('X-RapidAPI-Host', 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com');

xhr.send(data);

// todo setup

let actions = [];

const ls = window.localStorage

if(ls.getItem("actions")){
  actions = ls.getItem("actions").split(",")
  console.log(actions);
} else {
  ls.setItem("actions",[])
}

const addInput = document.querySelector(".action_adder").children[1];
addInput.addEventListener("click", addAction);

function loadActions() {
    actions.forEach((e, i) => {
      document.querySelector(".actions").innerHTML += `
          <div class="action" id="act${i}">
            <button onclick="doneAction(event)"><img src="./check.png" alt="done" /></button>
            <p>${e}</p>
            <button onclick="deleteAction(event)"  class="delete_btn"><img src="./delete.png" alt="delete"</button>
            <button onclick="editAction(event)"><img src="./edit.png" alt="edit" /></button>
          </div>
          `;
    });
}

function addAction() {
  txt = document.querySelector(".action_adder").children[0].value;
  if(txt !== ""){
    
  actions.push(txt);
  ls.setItem("actions",actions)
  document.querySelector(".action_adder").children[0].value = "";
  console.log(actions);
  document.querySelector(".actions").innerHTML += `
        <div class="action" id="act${actions.length - 1}">
          <button onclick="doneAction(event)"><img src="./check.png" alt="done" /></button>
          <p>${actions[actions.length - 1]}</p>
          <button onclick="deleteAction(event)"  class="delete_btn"><img src="./delete.png" alt="delete"</button>
          <button onclick="editAction(event)"><img src="./edit.png" alt="edit" /></button>
        </div>
        `;
  }
}

function deleteAction(event) {
  x = event.target.parentElement.parentElement;
  x = x.childNodes[3].innerHTML;
  console.log(actions);
  console.log(x, "hulu");
  y = actions.indexOf(x);
  console.log(y);
  // two conditions
  if (y == actions.length - 1) {
    document.querySelector(`#act${y}`).remove();
    actions.splice(y, 1);
    ls.setItem("actions",actions)
    console.log(actions);
  } else {
    console.log("huhuhuhu");
    document.querySelector(`#act${y}`).remove();
    for (i = y + 1; i <= actions.length - 1; i++) {
      document.querySelector(`#act${i}`).id = `act${i - 1}`;
    }
    actions.splice(y, 1);
    ls.setItem("actions",actions)
  }
}

function doneAction(event) {
  x = event.target.parentElement.parentElement.innerHTML += `
  <div class="line"><div class="innerLine"></div></div>
  `;
  console.log(x);
}

let editIndex = null;

function editAction(event) {
  newtxt = "";
  x = event.target.parentElement.parentElement;
  y = x.querySelector("p").innerHTML;
  console.log(actions.indexOf(y));
  editIndex = y;

  x.innerHTML += `
    <div class="edit_box">
      <input type="text" id="edit_input" placeholder="Edit your action..">
      <button onClick="editTxt(event)"><img src="./edit.png" alt="edit" /></button>
      <button id="canceledit_btn" onClick="closeEditBox(event)"><img src="./close.png" alt="edit" /></button>
    </div>`;
}

function editTxt(event) {
  console.log(event);
  x = event.target.parentElement.parentElement;
  y = x.children[0].value;
  actions.splice(editIndex, 1);
  // actions[editIndex] = y;
  actions.splice(editIndex, 0, y);
  ls.setItem("actions",actions)
  console.log(y);
  x.parentElement.querySelector("p").innerHTML = y;
  x.remove();
}

function closeEditBox(event) {
  x = event.target.parentElement.parentElement;
  x.remove();
}

window.onload = loadActions();


