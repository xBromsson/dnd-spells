let table = document.querySelector(".grid-table");
let rows = document.querySelectorAll(".grid-row");
let loading = document.querySelector(".loading");

let isLoading = true;

let spells = [];

function updateUI() {
  if (isLoading) {
    loading.style.display = "static";
    table.classList.add("hidden");
  } else {
    loading.style.display = "none";
    table.classList.remove("hidden");
    rows = document.querySelectorAll(".grid-row");
  }
}

function createTable() {
  //for each spell, need to create a row

  spells.results.map((item) => {
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

    table.appendChild(row);
  });

  //for each row, need to create 5 cells (name, school, level, component, class )
}

async function fetchData() {
  try {
    const data = await fetch("https://api.open5e.com/v1/spells/?limit=300");

    spells = await data.json();

    console.log(spells.results);

    isLoading = false;
    //maps data to table
    // spells.results.forEach((item) => {
    //   console.log(item.name);
    // });
    createTable();
    console.log(rows);
    updateUI();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

updateUI();
fetchData();
