//business logic
var Ledger = function() {
  this.customers = [];
}

Ledger.prototype.findCustomerByName = function(name) {
  for (var i = 0; i < this.customers.length; i++) {
    if (this.customers[i].name === name) {
      return this.customers[i];
    }
  }
}

Ledger.prototype.addCustomer = function(customer) {
  this.customers.push(customer);
}

var ledger = new Ledger();

var Customer = function(name, accountBalance) {
  this.name = name;
  this.accountBalance = accountBalance;
};

Customer.prototype.depositTransaction = function(amount) {
  this.accountBalance += amount;
};

Customer.prototype.withdrawalTransaction = function(amount) {
  this.accountBalance -= amount;
};

/// copied from http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript ///
Number.prototype.formatMoney = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
   return "$" + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };



// user interface logic
$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    var customerName = $("input#customerName").val();
    var openingBalance = parseFloat($("input#openingBalance").val());
    var depositAmount = parseFloat($("input#depositAmount").val());
    var withdrawalAmount = parseFloat($("input#withdrawalAmount").val());

    var customer = ledger.findCustomerByName(customerName);
    if (!customer) {
      customer = new Customer(customerName, openingBalance);
      ledger.addCustomer(customer);
    }

    if (depositAmount) {
      customer.depositTransaction(depositAmount);
    }

    if (withdrawalAmount) {
      customer.withdrawalTransaction(withdrawalAmount);
    }

    $("input#accountBalance").val(customer.accountBalance.formatMoney());

  });
});
