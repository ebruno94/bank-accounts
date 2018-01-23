$(document).ready(function(){
  var currentUser;

  var Bank = {
    accountHolders: [],
    totalMoney: 0,
    logIn: function(userName, passWord){
            var booleanFlag = false;
            var i = 0;
            this.accountHolders.forEach(function(account){
              if (account.user === userName && account.pass === passWord){
                booleanFlag = true;
              };
            });
            return booleanFlag;
          },
    removeAccount: function(){
              var i = 0;
              this.accountHolders.forEach(function(account){
                if (this.user === user){
                  Bank.accountHolders.slice(i, i+1);
                  $(this).parent().hide("ease");
                  $("#login").show("ease");
                  $(".row > input").val("");
                  Bank.totalMoney -= currentUser.money;
                  currentUser = undefined;
                }else{
                  i++;
                };
              });
            },
    getCurrentUser: function(user) {
      this.accountHolders.forEach(function(account) {
        if (account.user === user) {
          currentUser = account;
        };
      })
    }
  };

  function AccountHolder(name, user, pass, money) {
    this.name = name;
    this.user = user;
    this.pass = pass;
    this.money= money;
    this.history = [];
  };

  AccountHolder.prototype.makeDeposit = function(){
    this.money += parseInt($("#amount").val());
    Bank.totalMoney += parseInt($("#amount").val());
  };

  AccountHolder.prototype.makeWithdrawal = function(){
    this.money -= parseInt($("#amount").val());
    Bank.totalMoney -= parseInt($("#amount").val());
  };


  $("#login").submit(function(event){
    event.preventDefault();
    if (Bank.logIn($("input#username").val(),$("input#password").val())){
      $("#login").hide("ease");
      $("#account").show("ease");
      var user = $("input#username").val();
      Bank.getCurrentUser(user);
      $("#balance").text(currentUser.money);
    } else {
      alert("Invalid username/password");
      $("#login > input").val("");
    };
  });

  $("#createAccount").click(function(event){
    $("#login").hide("ease");
    $("#create").show("ease");
  });

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
      $("#account").show("ease");
      $(".row > input").val("");
      Bank.getCurrentUser(user);
      $("#balance").text(currentUser.money);
      Bank.totalMoney += currentUser.money;
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

  $("#deposit").click(function(){
    currentUser.makeDeposit();
    $("#balance").text(currentUser.money);
  });

  $("#withdraw").click(function(){
    currentUser.makeWithdrawal();
    $("#balance").text(currentUser.money);
  });

  $("#logout").click(function(){
    $(this).parent().hide("ease");
    $("#login").show("ease");
    $(".row > input").val("");
    currentUser = undefined;
  });
});
