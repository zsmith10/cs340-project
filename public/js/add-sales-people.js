let addSalesPersonForm = document.getElementById('add-sales-person-form-ajax');

// Modify the objects we need
addSalesPersonForm.addEventListener("submit", function (e) {
    
    console.log("called add-sales-person.js")
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFname = document.getElementById("input-fname");
    let inputLname = document.getElementById("input-lname");

    // Get the values from the form fields
    let FnameValue = inputFname.value;
    let LnameValue = inputLname.value;

    // Put our data we want to send in a javascript object
    let data = {
        sales_person_first_name: FnameValue,
        sales_person_last_name: LnameValue,
        commission: 0
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-sales-person-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFname.value = '';
            inputLname.value = '';
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
    let currentTable = document.getElementById("sales-person-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let fnameCell = document.createElement("TD");
    let lnameCell = document.createElement("TD");
    let commissionCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");
    let editCell = document.createElement("TD");

    row.className = ("table-row");
    idCell.className = ("table-column");
    fnameCell.className = ("table-column");
    lnameCell.className = ("table-column");
    commissionCell.className = ("table-column");


    editCell.className =("table-column");
    deleteCell.className =("table-column");

    editBtn = document.createElement("button");
    editBtn.innerHTML = "EDIT";
    editCell.appendChild(editBtn);

    // Fill the cells with correct data
    deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "DELETE";

    /*
    deleteBtn.onclick = function(){
        deleteBoat(newRow.id);
    };
*/
    deleteCell.appendChild(deleteBtn);

    idCell.innerText = newRow.sales_person_id;
    fnameCell.innerText = newRow.sales_person_first_name;
    lnameCell.innerText = newRow.sales_person_last_name;
    commissionCell.innerText = newRow.commission;

    // Add the cells to the row 

    row.appendChild(editCell);
    row.appendChild(deleteCell);

    row.appendChild(idCell);
    row.appendChild(fnameCell);
    row.appendChild(lnameCell);
    row.appendChild(commissionCell);

    row.setAttribute('data-value', newRow.id);
    
    // Add the row to the table
    currentTable.appendChild(row);
}