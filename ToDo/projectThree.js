(($) => {

  $(document).ready(function() {
    $.get("allTasks.php", function(tasks) {
      $(tasks).find("task").each(function(index, task) {
        let taskID = $(task).find('id').text();
        let taskDescription = $(task).find('description').text();
        let containerDiv = $("<div></div>");
        let deleteButton = $("<button class='deleteButton btn' id='" + taskID + "' type='button'><img src='images/trash.png'></button>");
        let editButton = $("<button class='editButton btn' type='button'><img src='images/edit.png'></button>");
        let taskHTML = $("<span>" + taskDescription + "</span><br>");
        let taskDiv = $(".allTasks");
        taskDiv.append(containerDiv);
        containerDiv.append(taskHTML);
        containerDiv.append(deleteButton);
      })
    })


    $(".allTasks").on("click", ".deleteButton", function() {
      let deleteID = $(this).attr('id');
      $.post("deleteTask.php", {"id": deleteID}, function(rowsAffected) {
        if (rowsAffected == 1) {
          $("#" + deleteID).parent().remove();
          console.log($(this));
        } else {
          alert("Something Went Wrong");
        }
      })
    })

    $("#submitTask").on("click", () => {
      let newTask = $("#newTask");
      let taskText = newTask.val();
      newTask.val("");
      newTask.focus();

      $.post("addTask.php", {"description": taskText}, function(addResponse) {
        addResponse = JSON.parse(addResponse);
        let deleteButtonID = addResponse.id;
        let tasks = $(".allTasks");
        let containerDiv = $("<div></div>");
        let deleteButton = $("<button class='deleteButton btn'  id='" + deleteButtonID + "' type='button'><img src='images/trash.png'></button>");
        tasks.append(containerDiv);
        containerDiv.append(deleteButton);
        containerDiv.append(taskText);
      })
    })
  })
})(jQuery)
