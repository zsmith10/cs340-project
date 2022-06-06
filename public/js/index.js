var modal = document.getElementById("add-boat-modal");

var btn = document.getElementById("add-button");

var closeBtn = document.getElementById("boat-cancel-button");

var submitBtn = document.getElementById("boat-form-btn");

var edit_modal = document.getElementById("update-boat-modal");

var edit_btn = document.getElementById("change-button");

var edit_close = document.getElementById("edit-cancel");


btn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none"
}

submitBtn.onclick = function() {
    modal.style.display = "none"
}
      
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

edit_btn.onclick = function() {
    edit_modal.style.display = "block";
}

edit_close.onclick = function() {
    edit_modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == edit_modal) {
        edit_modal.style.display = "none";
        console.log("madeit");
    }
}