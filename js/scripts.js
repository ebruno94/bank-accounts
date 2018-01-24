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
                if (this.user === currentUser.user){
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

  var Admin = {
    user: "Admin",
    pass: "Admin",
    showAdmin: function() {
      $("#login").hide("ease");
      $("#adminContainer").show("ease");
      $("#totalBankMoney").text("$" + Bank.totalMoney);
      $(".logout").show();
      this.showAccounts();
    },
    showAccounts: function() {
      Bank.accountHolders.forEach(function(account) {
      $("#accountHolders").append('<div class="col-md-4"><div class="accountCard"><h3 class="accountName">' + account.name + '</h3><p class="accountBalance">$' + account.money +'</p><button type="button" class="deleteAccount">Delete Account</button></div></div>');
      var user = account.user;
      var money = account.money;
      $("#accountHolders .accountCard").last().find("button").click(function() {
          Admin.removeAccount(user, money);
          $(this).parent().parent().hide();
        });

      });
    },
    removeAccount: function(user, money) {
      var i = 0;
      console.log(Bank.accountHolders[0]);
      console.log(Bank.accountHolders[1]);
      Bank.accountHolders.forEach(function(account){
        if (account.user === user){
          console.log(Bank.accountHolders);
          Bank.accountHolders.splice(i, 1);
          console.log(Bank.accountHolders);
          Bank.totalMoney -= money;
          $("#totalBankMoney").text("$" + Bank.totalMoney);
        }else{
          i++;
        };
      });
    },
    logout: function() {
      $("#adminContainer").hide();
      $("#login").show("ease");
      $(".row > input").val("");
      currentUser = undefined;
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
    if ($("input#username").val() === "Admin" && $("input#password").val() === "Admin") {
      currentUser = Admin;
      currentUser.showAdmin();
    } else if (Bank.logIn($("input#username").val(),$("input#password").val())){
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

    var accountNotExists = true;

    var checkIfAccountNotExists = function(user) {
      Bank.accountHolders.forEach(function(account) {
        if (account.user === user) {
          accountNotExists = false;
          alert("Username already exists. please input a new username!")
          $("#newUser").val('');
        };
      });
    };

    checkIfAccountNotExists(user);

    if (money >= 0 && (pass === confirm) && accountNotExists) {
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

  $(".logout").click(function(){
    $(this).parent().hide("ease");
    $("#account").hide("ease");
    $("#login").show("ease");
    $(".row > input").val("");
    currentUser = undefined;
  });
  $("#adminContainer").find("button").click(function() {
    Admin.logout();
  })
});
