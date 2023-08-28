import { setRows } from "./modules/setRows.js";

let table = document.querySelector(".grid-table");

let loading = document.querySelector(".loading");

let isLoading = true;

let spellsData = [];
let rows = [];

let searchTerm = "";

//Fetches all spell data from open5e api, then creates/maps into useable rows
async function fetchData() {
  try {
    const data = await fetch("https://api.open5e.com/v1/spells/?limit=20");

    spellsData = await data.json();

    isLoading = false;
    rows = setRows(spellsData);
    updateUI();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

//updates the screen
function updateUI() {
  if (isLoading) {
    //shows loading element & hides the table
    loading.style.display = "static";
    table.classList.add("hidden");
  } else {
    //maps each row to the table based on user selected filters
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
        console.log(table);
      });

    //hides loading element & shows table
    loading.style.display = "none";
    table.classList.remove("hidden");
  }
}

updateUI();
fetchData();
