// Function to add a new row to the table
function addRow() {
  var table = document.getElementById("product-table");
  var tbody = table.getElementsByTagName("tbody")[0];

  var newRow = document.createElement("tr");

  var quantityCell = createTableCell("number", "Quantity");
  var descriptionCell = createTableCell("text", "Description");
  var unitPriceCell = createTableCell("number", "Unit Price");
  var subtotalCell = document.createElement("td");
  subtotalCell.textContent = "0.00";

  var actionsCell = document.createElement("td");
  var editButton = createButton("Edit", "edit-button");
  editButton.onclick = function () {
    editRow(newRow);
  };

  var deleteButton = createButton("Delete", "delete-button");
  deleteButton.onclick = function () {
    deleteRow(newRow);
  };

  actionsCell.appendChild(editButton);
  actionsCell.appendChild(document.createElement("br"));
  actionsCell.appendChild(deleteButton);

  newRow.appendChild(quantityCell);
  newRow.appendChild(descriptionCell);
  newRow.appendChild(unitPriceCell);
  newRow.appendChild(subtotalCell);
  newRow.appendChild(actionsCell);

  tbody.appendChild(newRow);
}

// Function to create a table cell with an input element
function createTableCell(type, label) {
  var cell = document.createElement("td");
  var input = document.createElement("input");
  input.type = type;
  input.placeholder = label;
  cell.appendChild(input);
  return cell;
}

// Function to calculate subtotal
function calculateSubtotal(row) {
  var quantity = parseFloat(row.cells[0].querySelector("input").value);
  var unitPrice = parseFloat(row.cells[2].querySelector("input").value);

  var subtotal = isNaN(quantity) || isNaN(unitPrice) ? 0 : quantity * unitPrice;

  row.cells[3].textContent = subtotal.toFixed(2);
}

// Function to edit a row
function editRow(row) {
  var inputs = row.querySelectorAll("input");
  var editButton = row.querySelector(".edit-button");

  if (editButton.textContent === "Edit") {
    // Enable inputs for editing
    inputs.forEach(function (input) {
      input.removeAttribute("readonly");
    });

    editButton.textContent = "Save";
  } else {
    // Save the changes made
    inputs.forEach(function (input) {
      input.setAttribute("readonly", true);
    });

    calculateSubtotal(row);

    editButton.textContent = "Edit";
  }
}

// Function to delete a row
function deleteRow(row) {
  var tbody = document.getElementById("table-body");
  tbody.removeChild(row);
}

// Function to create a button element
function createButton(text, className) {
  var button = document.createElement("button");
  button.textContent = text;
  button.className = className;
  return button;
}
