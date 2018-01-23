$(document).ready(function(){
  var Bank = {
    accountHolders = [];
    totalMoney = 0;
  };

  function AccountHolder(name, user, pass, money) {
    this.name = name;
    this.user = user;
    this.pass = pass;
    this.money= money;
    this.history = [];
  };

  AccountHolder.prototype.makeDeposit(){
    this.money += $("#amount").val();
  };

  AccountHolder.prototype.makeWithdrawal(){
    this.money -= $("#amount").val();
  };

  $("#create").submit(function(event){
    event.preventDefault();
    var name = $("#newName").val();
    var money = parseInt($("#newMoney").val());
    var user = $("#newUser").val();
    var pass = $("#newPass").val();
    var confirm = $("#confirmPass").val();

    if (money >= 0 && (pass === confirm)){
      // Add check if username already exists
      Bank.accountHolders.push(new AccountHolder(name, user, pass, money));
      $("form#create, #signin").hide("ease");
      $("form#account").show("ease");
      $(".row > input").val("");
    } else {
      if (money < 0){
        alert("Please enter a positive number!");
        $("#newMoney").val("");
      } else if (pass !== confirm){
        alert("Passwords do not match")
        $("#newPass, #confirmPass").val("");
      }
    };
  });

  $("#logout").click(function(){
    $(this).parent().parent().hide("ease");
    $(".row > input").val("");
  });
});
