let addBoatForm = document.getElementById('add-sales-people-form-ajax');

// Modify the objects we need
addBoatForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputMake = document.getElementById("input-make");
    let inputModel = document.getElementById("input-model");
    let inputYear = document.getElementById("input-year");
    let inputPrice = document.getElementById("input-price");
    let inputDateServiced = document.getElementById("input-date_serviced");
    let inputServicedBy = document.getElementById("input-serviced_by");

    // Get the values from the form fields
    let MakeValue = inputMake.value;
    let ModelValue = inputModel.value;
    let YearValue = inputYear.value;
    let PriceValue = inputPrice.value;
    let DateServicedValue = inputDateServiced.value;
    let ServicedByValue = inputServicedBy.value;

    // Put our data we want to send in a javascript object
    let data = {
        make: MakeValue,
        model: ModelValue,
        year: YearValue,
        price: PriceValue,
        date_serviced: DateServicedValue,
        serviced_by: ServicedByValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-boat-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputMake.value = '';
            inputModel.value = '';
            inputYear.value = '';
            inputPrice.value = '';
            inputDateServiced.value = '';
            inputServicedBy.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from boats
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("boat-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let makeCell = document.createElement("TD");
    let modelCell = document.createElement("TD");
    let yearCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let dateServicedCell = document.createElement("TD");
    let servicedByCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");
    let editCell = document.createElement("TD");

    row.className = ("table-row");
    idCell.className = ("table-column");
    makeCell.className = ("table-column");
    modelCell.className = ("table-column");
    yearCell.className = ("table-column");
    priceCell.className = ("table-column");
    dateServicedCell.className = ("table-column");
    servicedByCell.className = ("table-column");

    editCell.className =("table-column");
    deleteCell.className =("table-column");

    editBtn = document.createElement("button");
    editBtn.innerHTML = "EDIT";
    editCell.appendChild(editBtn);

    // Fill the cells with correct data
    deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "DELETE";
    deleteBtn.onclick = function(){
        deleteBoat(newRow.boat_id);
    };

    deleteCell.appendChild(deleteBtn);

    idCell.innerText = newRow.boat_id;
    makeCell.innerText = newRow.make;
    modelCell.innerText = newRow.model;
    yearCell.innerText = newRow.year;
    priceCell.innerText = newRow.price;
    dateServicedCell.innerText = newRow.date_serviced;
    servicedByCell.innerText = newRow.serviced_by;

    // Add the cells to the row 

    row.appendChild(editCell);
    row.appendChild(deleteCell);

    row.appendChild(idCell);
    row.appendChild(makeCell);
    row.appendChild(modelCell);
    row.appendChild(yearCell);
    row.appendChild(priceCell);
    row.appendChild(dateServicedCell);
    row.appendChild(servicedByCell);

    row.setAttribute('data-value', newRow.id);
    
    // Add the row to the table
    currentTable.appendChild(row);
}