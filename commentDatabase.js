(($) => {

  $(document).ready(function() {
    $.get("showVisitors.php", function(visitors) {
      $(visitors).find("visitor").each(function(index, visitor) {
        let visitorID = $(visitor).find('id').text()
        let visitorName = $(visitor).find('name').text();
        let visitorDescription = $(visitor).find('description').text();
        let containerDiv = $("<div></div>");
        let visitorHTML = $("<span>" + visitorName + " says: \"" + visitorDescription + "\"</span>");
        let deleteButton = $("<button class='deleteButton btn' id='" + visitorID + "' type='button'><img src='images/trash.png'></button>");
        let editButton = $("<a class='editButton btn' href='visitors.php'><img src='images/edit.png'></a><br><br>");
        let visitorDiv = $(".allVisitors");
        visitorDiv.append(containerDiv);
        containerDiv.append(visitorHTML);
        containerDiv.append(deleteButton);
        containerDiv.append(editButton);
      })
    })


    $('div').on('click', '.deleteButton', function() {
      let deleteID = $(this).attr('id');
      console.log(deleteID);
      $.post("removeVisitor.php", {"id": deleteID}, function(rowsAffected) {
        if (rowsAffected == 1) {
          $("#" + deleteID).parent().remove();
          console.log($(this));
        } else {
          alert("Something Went Wrong");
        }
      })
    })

    $("#visitorSubmit").on("click", () => {
      let newVisitor = $("#newVisitor");
      let visitorText = newVisitor.val();
      let newComment = $("#newComment");
      let commentText = newComment.val();
      newVisitor.val("");
      newComment.val("");
      newVisitor.focus();
      console.log(commentText);
    $.post("addVisitor.php", {"name": visitorText, "description": commentText}, function(addResponse) {
        addResponse = JSON.parse(addResponse);
        console.log(addResponse);
        let name = addResponse.name;
        let comment = addResponse.description;
        let visitorID = addResponse.id;
        let containerDiv = $("<div></div>");
        let newVisitor = $("<span>" + name + " says: \"" + comment + "\"</span>");
        let deleteButton = $("<button class='deleteButton btn' id='" + visitorID + "' type='button'><img src='images/trash.png'></button>");
        let editButton = $("<a class='editButton btn' href='visitors.php'><img src='images/edit.png'></a><br><br>");
        let visitorDiv = $(".allVisitors");
        visitorDiv.append(containerDiv);
        containerDiv.append(newVisitor);
        containerDiv.append(deleteButton);
        containerDiv.append(editButton);
      })
    })
  })
})(jQuery)
