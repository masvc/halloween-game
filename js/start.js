$(document).ready(function () {
  $("#toggle").change(function () {
    const label = $(".switch label");
    if (this.checked) {
      label.css("border-color", "#4D7C99");
      label.find(":before").text("OK START!!").css("color", "#4D7C99");
      setTimeout(function () {
        window.location.href = "main.html";
      }, 2000);
    } else {
      label.css("border-color", "#E56D48");
      label.find(":before").text("Ready??").css("color", "#E56D48");
    }
  });
});
