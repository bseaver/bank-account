//business logic

// user interface logic
$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    var customerName = $("input#customerName").val();
    console.log(customerName);
    var openingBalance = $("input#openingBalance").val();
    console.log(openingBalance);
    $("input#accountBalance").val("$0.00");
  });
});
