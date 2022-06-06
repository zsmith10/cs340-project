
function deleteBoat(boatID) {
    let link = '/delete-boat-ajax/';
    let data = {
      id: boatID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(boatID);
      }
    });
  }
  
  function deleteRow(boatID){
      let table = document.getElementById("boat-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == boatID) {
              table.deleteRow(i);
              break;
         }
      }
  }