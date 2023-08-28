export function setRows(data) {
  let rows = [];

  //maps spells data into html elements and adds each row element to rows array
  data.results.map((item) => {
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
  return rows;
}
