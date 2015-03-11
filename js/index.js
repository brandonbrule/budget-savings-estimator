//-- Helper Functions
//---------------------------//

// Get Element By Id Function - Thanks Brett Tackaberry.
function elById(arg){ return document.getElementById(arg); }

// Return Value and Display to HTML Elements Round to nearest 0.00x
function round(arg){ return Math.round(arg * 100) / 100; }

// Useful Math Functions
// -------------------------- //
function monthToYear(value) { return round(value * 12) ; }
function monthly(value){ return round(value / 12); }
function weekly(value){ return round(value / 52); }
function daily(value){ return round(value / 365); }


function annualBreakdown(type,value){
  var years = 'Yearly';
  var months = 'Monthly';
  var weeks = 'Weekly';
  var days = 'Daily';

  var annualBreakdown = {};
  annualBreakdown[years] = value;
  annualBreakdown[months] = monthly(value);
  annualBreakdown[weeks] = weekly(value);
  annualBreakdown[days] = daily(value);
  
  return annualBreakdown;
}

function yearlyBreakdown(label, value, length_of_savings){
  var yearsObj = {};
  var value = value;
  for(var i = 1, years = length_of_savings; i <= years; i++){
    var obj = {};
    yearsObj[label + '-' + i] = value * i;  
  }
  return yearsObj;
}


function displayBreakdown(heading, object){

  var container = elById('results');
  var el = document.createElement('div');
  var header = document.createElement('h3');
  var list_container = document.createElement('ol');

  // Heading
  header.innerHTML = heading;
  el.appendChild(header);

  for (var key in object) {
    if (object.hasOwnProperty(key)) {

      var list_item = document.createElement('li');
      var value = '<strong>' + object[key] + '</strong>';
         
      list_item.innerHTML = key + ' ' + value;
      list_container.appendChild( list_item );

    }
   
  }

  el.appendChild(list_container);
  container.appendChild(el);
};




var Investing = (function () {
  
  var investing_container = document.getElementById('investing-container');
  var data = {};
  
  var default_config = {
    principle_value : 5000,
    monthly_contribution: 100,
    annual_interest: 0.05,
    times_compounded_per_year: 12,
    length_of_investment: 10
  };
  
  var initialSavingsCompounded = function(P, base, exponent) {
    var result = 1;
    var arr = []

    for (var i = 0; i < exponent; i++){
      result *= base;
      arr.push( Math.round( result * P * 100 ) / 100 );
    }
    data['Starting-Savings-Compounded-Breakdown'] = arr;
    return arr;
  };

  var investmentsCompounded = function(PMT, base, exponent, r, n){
    //PMT * ( Math.pow( (1 + r / n),n * (t)) - 1 ) / (r/n)
    var result = 1;
    var arr = []

    for (var i = 0; i < exponent; i++){
      result *= base;
      arr.push( Math.round( ( result - 1 ) * PMT / (r/n) * 100 ) / 100 );
    }
    data['Contributions-Compounded-Breakdown'] = arr;
    // First savings is 0, then after the first month your savings per month
    arr.unshift(0);
    return arr;
  };
  
  var totalCompounded = function(arr1, arr2){
    var arr = [];
    for (var i = 0, len = arr1.length - 1; i < len; i++){
      arr.push( Math.round((arr1[i] + arr2[i])*100.0)/100.0 );
    }
    return arr;
    
  };


  var compounded_savings = function(config){
    var A; //the future value of the investment/loan, including interest
    var P = config.principle_value; //the principal investment amount (the initial deposit or loan amount)
    var PMT = config.monthly_contribution //the monthly payment
    var r = config.annual_interest; //the annual interest rate (decimal)
    var n =  config.times_compounded_per_year;//the number of times that interest is compounded per year
    var t = config.length_of_investment;//the number of years the money is invested or borrowed for
    
    // Starting Savings Compounded
    var present_value = P;
    var principal_compound_interest = P * Math.pow((1.0+r / n),n * (t));
    var total_interest_from_principal = principal_compound_interest - present_value;
    
    principal_compound_interest = Math.round(principal_compound_interest*100.0)/100.0;
    total_interest_from_principal  = Math.round(total_interest_from_principal*100.0)/100.0;
    
    
    //its.a( principal_compound_breakdown );
    
    // Startings Savings
    data['Starting-Investment'] = P;
    data['Monthly-Contributions'] = PMT;
    data['Years-Compounded'] = t;
    data['Compounded-Per-Year'] = n;
    
    data['Starting-Investment-Compounded'] = principal_compound_interest;
    
    // Breakdown of Savings Over Time of Initial Investment
    var principal_compound_breakdown = initialSavingsCompounded( P, (1.0+r / n), n * t );
    
    
    // Total Monthly Contributions Compounded
    var total_monthly_contributions = (  PMT * ( Math.pow( (1 + r / n),n * (t)) - 1 ) / (r/n)  );
    
    data['Total-Monthly-Contibutions'] = Math.round( total_monthly_contributions * 100) / 100;
    
    var principal_contributions_breakdown = investmentsCompounded( PMT, (1.0+r / n), n * t, r, n );
    
    
    // Interest of Monthly payments + Amount Saved
    var total_savings = principal_compound_interest + total_monthly_contributions;
    total_savings = Math.round( total_savings * 100 ) / 100;
    data['Total-Savings'] = total_savings;
    
    
    
    var test = totalCompounded(principal_contributions_breakdown, principal_compound_breakdown);
    data['Total-Compounded'] = test;
    
    return data;
    
  };

  var init = function (config) {
    var config = typeof config !== 'undefined' ? config : default_config;
    compounded_savings(config);
  };
  
  return {
    init: init,
    compounded_savings: compounded_savings
  };

})();









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
  overTime: function(heading, value, length_of_savings){
    var years = yearlyBreakdown(heading, value, length_of_savings);
    return years;
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
        initialSavings = elById('initial-savings').value;
        interest = elById('interest').value * 0.01,
        length_of_savings = elById('length-of-savings').value;
    
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
    displayBreakdown('Income', income);
    
    //Payments
    payments = this.payments(annualPayments);
    displayBreakdown('Payments', payments);
    
    // Savings
    annualSavings = (annualIncome - annualPayments) * savings;
    savings = this.savings(annualSavings);
    displayBreakdown('Savings', savings);
    
    // Left over
    leftover = (annualIncome - annualPayments);
    leftover = round(leftover - (leftover * elById('savings').value * 0.01));
    leftover = this.leftOver(leftover);
    displayBreakdown('Leftover', leftover);
    
    
    // Over Time
    incomeOverTime = this.overTime('Year', annualIncome, length_of_savings);
    displayBreakdown('Income', incomeOverTime);
    
    // Payments over time
    paymentsOverTime = this.overTime('Year', annualPayments, length_of_savings);
    displayBreakdown('Payments', paymentsOverTime);

    // Savings over time
    savingsOverTime = this.overTime('Year', annualSavings, length_of_savings);
    displayBreakdown('Savings', savingsOverTime);

    // Leftover over time
    leftoverOverTime = this.overTime('Year', leftover.Yearly, length_of_savings);
    displayBreakdown('Leftover', leftoverOverTime);


    

    // Savings with Interest
    var custom_config = {
      principle_value : initialSavings,
      monthly_contribution: savings.Yearly,
      annual_interest: interest,
      times_compounded_per_year: 1,
      length_of_investment: length_of_savings
    };

    // Don't do anything if there's no interest to compound
    if (interest > 0){
      var savingsWithInterest = Investing.compounded_savings(custom_config);
      displayBreakdown('With Interest', savingsWithInterest['Total-Compounded']);
    }
    
  }
};










    

// On Submit
elById("submit").onclick = function () {
  var container = elById('results');
  container.innerHTML = '';
  SimpleBudget.calculate();
};