import { setRows } from "./modules/setRows.js";

let table = document.querySelector(".grid-table");
let loading = document.querySelector(".loading");
let search = document.querySelector("#search");

let isLoading = true;
let spellsData = [];
let rows = [];
let searchTerm = "";

search.addEventListener("input", (event) => {
  searchTerm = event.target.value;
  console.log(searchTerm);
  updateRows();
});

//Fetches all spell data from open5e api, then creates/maps into useable rows
async function fetchData() {
  try {
    const data = await fetch("https://api.open5e.com/v1/spells/?limit=1000");
    spellsData = await data.json();
    rows = setRows(spellsData);

    isLoading = false;
    handleLoading();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function updateRows() {
  while (table.childNodes.length > 2) {
    table.removeChild(table.lastChild);
  }

  rows
    .filter((row) => {
      return Array.from(row.childNodes).some((element) => {
        return element.innerText
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
    })
    .map((item) => {
      table.appendChild(item);
    });
}

//updates the screen
function handleLoading() {
  if (isLoading) {
    //shows loading element & hides the table
    loading.style.display = "static";
    table.classList.add("hidden");
  } else {
    updateRows();

    //hides loading element & shows table
    loading.style.display = "none";
    table.classList.remove("hidden");
  }
}

handleLoading();
fetchData();
