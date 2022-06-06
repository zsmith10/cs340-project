let addCustomerForm = document.getElementById('add-customer-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    console.log("called add-customer.js")
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFname = document.getElementById("input-fname");
    let inputLname = document.getElementById("input-lname");
    let inputAddress = document.getElementById("input-address");
    let inputCity = document.getElementById("input-city");
    let inputState = document.getElementById("input-state");
    let inputZip = document.getElementById("input-zip");
    let inputPhone = document.getElementById("input-phone");
    let inputEmail = document.getElementById("input-email");

    // Get the values from the form fields
    let FnameValue = inputFname.value;
    let LnameValue = inputLname.value;
    let AddressValue = inputAddress.value;
    let CityValue = inputCity.value;
    let StateValue = inputState.value;
    let ZipValue = inputZip.value;
    let PhoneValue = inputPhone.value;
    let EmailValue = inputEmail.value;

    // Put our data we want to send in a javascript object
    let data = {
        customer_first_name: FnameValue,
        customer_last_name: LnameValue,
        address: AddressValue,
        city: CityValue,
        state: StateValue,
        zip: ZipValue,
        phone_number: PhoneValue,
        email: EmailValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFname.value = '';
            inputLname.value = '';
            inputAddress.value = '';
            inputCity.value = '';
            inputState.value = '';
            inputZip.value = '';
            inputPhone.value = '';
            inputEmail.value = '';
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
    let currentTable = document.getElementById("customer-table");

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
    let addressCell = document.createElement("TD");
    let cityCell = document.createElement("TD");
    let stateCell = document.createElement("TD");
    let zipCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");
    let emailCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");
    let editCell = document.createElement("TD");

    row.className = ("table-row");
    idCell.className = ("table-column");
    fnameCell.className = ("table-column");
    lnameCell.className = ("table-column");
    addressCell.className = ("table-column");
    cityCell.className = ("table-column");
    stateCell.className = ("table-column");
    zipCell.className = ("table-column");
    phoneCell.className = ("table-column");
    emailCell.className = ("table-column");

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

    idCell.innerText = newRow.customer_id;
    fnameCell.innerText = newRow.customer_first_name;
    lnameCell.innerText = newRow.customer_last_name;
    addressCell.innerText = newRow.address;
    cityCell.innerText = newRow.city;
    stateCell.innerText = newRow.state;
    zipCell.innerText = newRow.zip;
    phoneCell.innerText = newRow.phone_number;
    emailCell.innerText = newRow.email;

    // Add the cells to the row 

    row.appendChild(editCell);
    row.appendChild(deleteCell);

    row.appendChild(idCell);
    row.appendChild(fnameCell);
    row.appendChild(lnameCell);
    row.appendChild(addressCell);
    row.appendChild(cityCell);
    row.appendChild(stateCell);
    row.appendChild(zipCell);
    row.appendChild(phoneCell);
    row.appendChild(emailCell);

    row.setAttribute('data-value', newRow.customer_id);
    
    // Add the row to the table
    currentTable.appendChild(row);
}