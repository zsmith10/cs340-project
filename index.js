
    var modal = document.getElementById("add-boat-modal");

    var btn = document.getElementById("add-button");

    var closeBtn = document.getElementById("boat-cancel-button");

    btn.onclick = function() {
        modal.style.display = "block";
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
      }
      
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
          console.log("madeit");
        }
    }


