let table = document.querySelector(".grid-table");

let loading = document.querySelector(".loading");

let isLoading = true;

let spellsData = [];
let rows = [];

let search = "Acid";

//updates the screen
function updateUI() {
  if (isLoading) {
    //shows loading element & hides the table
    loading.style.display = "static";
    table.classList.add("hidden");
  } else {
    //hides loading element & shows table
    loading.style.display = "none";
    table.classList.remove("hidden");
  }
}

function createTable() {
  //maps spells data into html elements and adds each row element to rows array
  spellsData.results.map((item) => {
    //Creates a row with child cells of name, school, level, component, class
    let row = document.createElement("div");
    row.classList.add("grid-row");

    let cellName = document.createElement("div");
    cellName.classList.add("cell");
    cellName.innerHTML = item.name;
    row.appendChild(cellName);

    let cellSchool = document.createElement("div");
    cellSchool.classList.add("cell");
    cellSchool.innerHTML = item.school;
    row.appendChild(cellSchool);

    let cellLevel = document.createElement("div");
    cellLevel.classList.add("cell");
    cellLevel.innerHTML = item.level_int;
    row.appendChild(cellLevel);

    let cellComponents = document.createElement("div");
    cellComponents.classList.add("cell");
    cellComponents.innerHTML = item.components;
    row.appendChild(cellComponents);

    let cellClass = document.createElement("div");
    cellClass.classList.add("cell");
    cellClass.innerHTML = item.dnd_class;
    row.appendChild(cellClass);

    //adds the new row to rows array
    rows.push(row);
  });

  //maps each row to the table
  rows.map((item) => {
    table.appendChild(item);
  });

  //for each row, need to create 5 cells (name, school, level, component, class )
}

async function fetchData() {
  try {
    const data = await fetch("https://api.open5e.com/v1/spells/?limit=20");

    spellsData = await data.json();

    console.log(spellsData.results);

    isLoading = false;
    createTable();
    console.log(rows[0].firstChild.innerHTML);
    updateUI();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

updateUI();
fetchData();
