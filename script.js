let save = document.querySelector(".save");
let name = document.querySelector("#name");
let number = document.querySelector("#number");
let url = document.querySelector("#url");

let nameList = document.querySelector(".name-list");
render();

let showBook = document.querySelector(".show-book");
let book = document.querySelector(".book");

showBook.addEventListener("click", (e) => {
  e.preventDefault();
  book.style.display = "block";
});

let closeBook = document.querySelector(".close");
closeBook.addEventListener("click", (e) => {
  e.preventDefault();
  book.style.display = "none";
});

save.addEventListener("click", (e) => {
  e.preventDefault();
  //prevents reload
  //   console.log(name.value);
  if (!name.value.trim() && !number.value.trim()) {
    alert("fill all spaces");
    return;
  }
  let obj = {
    name: name.value,
    number: number.value,
    url: url.value,
  };
  setItemToStorage(obj);
  render();
});

function setItemToStorage(person) {
  let data = JSON.parse(localStorage.getItem("people")) || [];
  data.push(person);
  localStorage.setItem("people", JSON.stringify(data));
}

function render() {
  if (!localStorage.getItem("people")) {
    localStorage.setItem("people", "[]");
  }
  nameList.innerHTML = null;
  let newPeople = JSON.parse(localStorage.getItem("people"));
  console.log(newPeople);

  newPeople.forEach((item, index) => {
    let li = document.createElement("li");
    li.classList.add("item");
    nameList.append(li);
    let div1 = document.createElement("div");
    div1.classList.add("left");
    li.append(div1);

    let img = document.createElement("img");
    img.src = item.url;
    img.classList.add("img");
    div1.append(img);

    let nameBook = document.createElement("span");
    nameBook.innerText = item.name;
    div1.append(nameBook);

    let numberBook = document.createElement("span");
    numberBook.innerText = item.number;
    div1.append(numberBook);

    let div2 = document.createElement("div");
    div2.classList.add("right");
    li.append(div2);

    let btnEdit = document.createElement("button");

    btnEdit.classList.add("edit");
    btnEdit.innerText = "edit";
    let btnDelete = document.createElement("button");
    btnDelete.innerText = "delete";
    btnDelete.classList.add("delete");
    div2.append(btnEdit);

    btnDelete.addEventListener("click", () => {
      deleteElement(index);
    });
    div2.append(btnDelete);

    btnEdit.addEventListener("click", () => {
      editElement(index);
    });
  });
}

//?delete
function deleteElement(index) {
  let data = JSON.parse(localStorage.getItem("people"));
  data.splice(index, 1);
  localStorage.setItem("people", JSON.stringify(data));

  render();
}

//? edit
let modal = document.querySelector(".modal");
let inpName = document.querySelector(".edit-name ");
let inpNumber = document.querySelector(".edit-number");
let inpUrl = document.querySelector(".edit-url");

let btnSave = document.querySelector(".edit-save");
let btnClose = document.querySelector(".btnCloseEdit");

btnSave.addEventListener("click", (e) => {
  e.preventDefault();
  let data = JSON.parse(localStorage.getItem("people"));
  console.log(data);
  let nameId = inpName.id;
  let numberId = inpNumber.id;
  let urlId = inpUrl.id;

  let upPeople = {
    name: inpName.value,
    number: inpNumber.value,
    url: inpUrl.value,
  };

  data.splice(nameId, 1, upPeople);
  data.splice(numberId, 1, upPeople);
  data.splice(urlId, 1, upPeople);
  localStorage.setItem("people", JSON.stringify(data));
  modal.style.display = "none";
  render();
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "none";
  render();
});

function editElement(index) {
  modal.style.display = "flex";
  let data = JSON.parse(localStorage.getItem("people"));
  inpName.setAttribute("id", index);
  inpNumber.setAttribute("id", index);
  inpUrl.setAttribute("id", index);

  inpName.value = data[index].name;
  inpNumber.value = data[index].number;
  inpUrl.value = data[index.number];
}
