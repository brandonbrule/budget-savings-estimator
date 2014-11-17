//-- Helper Functions
//---------------------------//

// Get Element By Id Function - Thanks Brett Tackaberry.
function elById(arg){ return document.getElementById(arg); }

// Return Value and Display to HTML Elements Round to nearest 0.00x
function round(arg){ return Math.round(arg * 100) / 100; }

// Display Print
function dp(context){
  var container = elById('results');
  var el = document.createElement('div');     
  el.innerHTML = context;
  container.appendChild( el );
}

// Useful Math Functions
// -------------------------- //
function monthToYear(value) { return round(value * 12) ; }
function monthly(value){ return round(value / 12); }
function weekly(value){ return round(value / 52); }
function daily(value){ return round(value / 365); }


function annualBreakdown(type,value){
  var years = 'Yearly ' + type;
  var months = 'Monthly ' + type;
  var weeks = 'Weekly ' + type;
  var days = 'Daily ' + type;

  var annualBreakdown = {};
  annualBreakdown[years] = value;
  annualBreakdown[months] = monthly(value);
  annualBreakdown[weeks] = weekly(value);
  annualBreakdown[days] = daily(value);
  
  return annualBreakdown;
}

function yearlyBreakdown(label, value){
  var yearsObj = new Array();
  for(var i = 1, years = 10; i < years; i++){
    var obj = {};
    obj.label = label + ' - Yr ' + i + ' - ';
    obj.value = value * i;
    yearsObj.push(obj);    
  }
  return yearsObj;
}


function displayBreakdown(breakdown){
  var keysArr = [];
  for (var key in breakdown) {
     if (breakdown.hasOwnProperty(key)) {
       
       var together = '';
       var b = breakdown[key];
       var flag = false;
       
       for( var k in b){
          if (b.hasOwnProperty(k)) {
             var label = k;
             var keyNOT = b[k];
            together =  together + keyNOT + '';
            flag = true;
          }
       }

       if (!flag) {
         var keys = key;
         var value = '<strong>' + breakdown[key] + '</strong>';
         together = key + value;
       }
       
       keysArr.push('<p>' + together + '</p>');
     }
  }
  keysArr = keysArr.join("");
  return keysArr;
}

// Simple Budget Object
var SimpleBudget = {
  frequencyOfPay: function(payFrequency){
    // Radio button selection, once or twice a month (returns 1 or 2)
    for (var i = 0, length = payFrequency.length; i < length; i++) {
      if (payFrequency[i].checked) {
          break;
      }
    }
    return payFrequency[i].value;
  },
  income: function(annualIncome){
    var income = annualBreakdown('Income', annualIncome);
    return income;
  },
  payments: function(monthlyPayments){
    var payments = annualBreakdown('Payments', monthlyPayments);
    return payments;
  },
  savings: function(savings){
    var savings = annualBreakdown('Savings',savings);
    return savings;
  },
  leftOver: function(leftovers){
    var leftover = annualBreakdown('Leftovers', leftovers)
    return leftover;
  },
  overTime: function(heading, value){
    var yearLabel = 'Year';
    var years = yearlyBreakdown(heading, value);
    return years;
  },
  display: function(heading, object){
    var income = object,
        heading = '<h3>' + heading + '</h3>'
        income = displayBreakdown(income);
    dp(heading + income);
  },
  calculate: function(){
      
    // Income Information
    var paycheck = elById("paycheck").value,
        payFrequency = document.getElementsByName('frequency-of-pay'),
        income,
        annualIncome = this.frequencyOfPay(payFrequency),
        incomeOverTime,
        payments,
        annualPayments = monthToYear(elById('monthly-payments').value),
        annualSavings,
        savings = elById('savings').value * 0.01,
        savingsOverTime,
        leftover,
        interest = elById('interest').value * 0.01;
    
    // How often you get paid
    if(annualIncome == 'once-month'){
      annualIncome = monthToYear(paycheck);
    }
    if(annualIncome == 'twice-month'){
      annualIncome = monthToYear(paycheck) * 2
    }
    if(annualIncome == 'two-weeks'){
      annualIncome = round(paycheck * 26);
    }
    
    income = this.income(annualIncome);
    this.display('Income Breakdown', income);
    
    //Payments
    payments = this.payments(annualPayments);
    this.display('Payment Breakdown', payments);
    
    // Savings
    annualSavings = (annualIncome - annualPayments) * savings;
    savings = this.savings(annualSavings);
    this.display('Savings Breakdown', savings);
    
    // Left over
    leftover = (annualIncome - annualPayments);
    leftover = round(leftover - (leftover * elById('savings').value * 0.01));
    leftover = this.leftOver(leftover);
    this.display('Leftover Breakdown', leftover);
    
    
    // Over Time
    incomeOverTime = this.overTime('Income', annualIncome);
    this.display('Income Over Time', incomeOverTime);
    
    // Savings over time
    savingsOverTime = this.overTime('Contributions', annualSavings);
    this.display('Contributions Over Time', savingsOverTime);
    
    
    
    
    //console.log(income);
    //console.log(payments);
    //console.log(savings);
    //console.log(leftover);
    
  }
};

// On Submit
elById("submit").onclick = function () {
  var container = elById('results');
  container.innerHTML = '';
  SimpleBudget.calculate();
};