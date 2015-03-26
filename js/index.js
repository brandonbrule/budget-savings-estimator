//-- Helper Functions
//---------------------------//

// Get Element By Id Function - Thanks Brett Tackaberry.
function elById(arg){ return document.getElementById(arg); };

// Return Value and Display to HTML Elements Round to nearest 0.00x
function round(arg){ return Math.round(arg * 100) / 100; };

// Useful Math Functions
// -------------------------- //
function monthToYear(value) { return round(value * 12); };
function monthly(value){ return round(value / 12); };
function weekly(value){ return round(value / 52); };
function daily(value){ return round(value / 365); };
function hourly(value){ return round(value / 24); };
function minutely(value){ return round(value / 60); };


function annualBreakdown(type,value){
  var annualBreakdown = {};
  annualBreakdown.Yearly = value;
  annualBreakdown.Monthly = monthly(value);
  annualBreakdown.Weekly = weekly(value);
  annualBreakdown.Daily = daily(value);
  annualBreakdown.Hourly = hourly( daily(value) );
  annualBreakdown.Minutely = minutely( hourly( daily(value) ) );
  
  return annualBreakdown;
};

function annualBreakdownArray(yearly_value){
  var yearlyArray = [];
  var monthly_value = monthly(yearly_value);

  for (var i = 0; i < 12; i++){
    var count = 1 + i;
    yearlyArray.push(monthly_value * count);
  }

  return yearlyArray;
};


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
      var value = '<strong>' + round(object[key]) + '</strong>';
         
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
    return arr;
  };
  
  var totalCompounded = function(arr1, arr2){
    var arr = [];
    for (var i = 0, len = arr1.length; i < len; i++){
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
    
    
    // Total Compounded
    var total_compounded = totalCompounded(principal_contributions_breakdown, principal_compound_breakdown);
    total_compounded.unshift(P);

    data['Total-Compounded'] = total_compounded;
    
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
  getIncomeInformation: function(){
    annualPayments = monthToYear( parseInt( elById('monthly-payments').value ) );
    savings = parseInt( elById('savings').value * 0.01 );
    initialSavings = parseInt( elById('initial-savings').value );
    interest = elById('interest').value * 0.01;
    length_of_savings = parseInt( elById('length-of-savings').value );
  },
  frequencyOfPay: function(payFrequency){
    // Radio button selection, once or twice a month (returns 1 or 2)
    for (var i = 0, length = payFrequency.length; i < length; i++) {
      if (payFrequency[i].checked) {
          break;
      }
    }
    return payFrequency[i].value;
  },
  annualIncome: function(){
    paycheck = elById("paycheck").value;
    payFrequency = document.getElementsByName('frequency-of-pay');
    annualIncome = this.frequencyOfPay(payFrequency);
    
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

    return annualIncome;

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
  leftOver: function(remaining){
    var leftover = annualBreakdown('Leftovers', remaining)
    return leftover;
  },
  overTime: function(value){
    var yearsObj = [];
    var value = value;
    for(var i = 0, years = length_of_savings; i <= years; i++){
      yearsObj.push( (value * i) + initialSavings );  
    }
    return yearsObj;
  },
  resetMainChart: function(chart){
    var seriesLength = chart.series.length;
    var navigator;
    for(var i = seriesLength - 1; i > -1; i--) {
      if (i > 1){
        if(chart.series[i].name.toLowerCase() == 'navigator') {
            navigator = chart.series[i];
        } else {
            chart.series[i].remove();
        }
      }
    }
  },
  updateStatsChart: function(chart, time_period){

    // Daily Breakdown Stats
    var dailySum = parseInt( savings[time_period] + payments[time_period] + remaining[time_period] );
    var chart_data =[
        [
          'Payments $' + payments[time_period], parseInt( (payments[time_period] * 100) / dailySum )
        ],
        [
          'Savings $' + savings[time_period], parseInt( (savings[time_period] * 100) / dailySum )
        ],
        [
        'Remaining $' + remaining[time_period], parseInt( (remaining[time_period] * 100) / dailySum )
        ]
    ];

    chart.series[0].setData( chart_data, true );
    chart.series[0].options.color = "#008800";
    chart.series[0].update(chart.series[0].options);

  },
  calculate: function(){

    document.getElementById('results').innerHTML = '';
      
    // Income Information From Forms
    this.getIncomeInformation();

    // Reset
    this.resetMainChart(savings_invesments_overtime_chart);



    // Income
    annualIncome = this.annualIncome();
    income = this.income(annualIncome);
    displayBreakdown('Income', income);


    //Payments
    payments = this.payments(annualPayments);
    displayBreakdown('Payments', payments);


    // Savings
    annualSavings = ( (elById('savings').value * 0.01) * ( annualIncome - annualPayments) ) ;
    savings = this.savings(annualSavings);
    displayBreakdown('Savings', savings);

    
    
    // Left over
    remaining = (annualIncome - annualPayments);
    remaining = remaining - (remaining * elById('savings').value * 0.01);
    remaining = this.leftOver(remaining);
    displayBreakdown('Remaining', remaining);



    // // Savings over time
    savingsOverTime = this.overTime(annualSavings, length_of_savings);


    // Savings with Interest
    var custom_config = {
      principle_value : initialSavings,
      monthly_contribution: savings.Yearly,
      annual_interest: interest,
      times_compounded_per_year: 1,
      length_of_investment: length_of_savings
    };

    // Don't do anything if there's no interest to compound
    var savingsWithInterest;
    if (interest > 0){
      savingsWithInterest = Investing.compounded_savings(custom_config);
    } else {
      savingsWithInterest = ['0']
    }
  
    // Update Savings and Savings With Interest Chart Information
    savings_invesments_overtime_chart.series[0].setData( savingsWithInterest['Total-Compounded'], true );
    savings_invesments_overtime_chart.series[1].setData( savingsOverTime, true );



    
    // Stats Text
    var stats_daily_remaining = elById('daily-remaining');
    var stats_daily_payments = elById('daily-payments');
    var stats_daily_income = elById('daily-income');
    var stats_daily_savings = elById('daily-savings');

    var stats_weekly_remaining = elById('weekly-remaining');
    var stats_weekly_savings = elById('weekly-savings');
    var stats_weekly_payments = elById('weekly-payments');
    var stats_weekly_income = elById('weekly-income');

    var stats_monthly_remaining = elById('monthly-remaining');
    var stats_monthly_savings = elById('monthly-savings');
    var stats_monthly_payments = elById('stat-monthly-payments');
    var stats_monthly_income = elById('monthly-income');

    var stats_yearly_remaining = elById('yearly-remaining');
    var stats_yearly_savings = elById('yearly-savings');
    var stats_yearly_payments = elById('stat-yearly-payments');
    var stats_yearly_income = elById('yearly-income');

    // Daily Breakdown
    this.updateStatsChart(daily_breakdown_stats_chart, 'Daily');

    stats_daily_remaining.innerHTML = remaining.Daily;
    stats_daily_payments.innerHTML = payments.Daily;
    stats_daily_income.innerHTML = income.Daily;
    stats_daily_savings.innerHTML = savings.Daily;

    // Weekly Stats

    weekly_breakdown_stats_chart.series[0].setData( [income.Weekly, payments.Weekly, savings.Weekly, remaining.Weekly], true );

    stats_weekly_remaining.innerHTML = remaining.Weekly;
    stats_weekly_savings.innerHTML = savings.Weekly;
    stats_weekly_payments.innerHTML = payments.Weekly;
    stats_weekly_income.innerHTML = income.Weekly;
    

    // Monthly Breakdown
    monthly_breakdown_stats_chart.series[0].setData( [income.Monthly, payments.Monthly, savings.Monthly, remaining.Monthly], true );

    stats_monthly_remaining.innerHTML = remaining.Monthly;
    stats_monthly_savings.innerHTML = savings.Monthly;
    stats_monthly_payments.innerHTML = payments.Monthly;
    stats_monthly_income.innerHTML = income.Monthly;

    // Yearly Stats

    var income_annually_array = annualBreakdownArray(income.Yearly);
    var payments_annually_array = annualBreakdownArray(payments.Yearly);
    var savings_annually_array = annualBreakdownArray(savings.Yearly);
    var remaining_annually_array = annualBreakdownArray(remaining.Yearly);

    yearly_breakdown_stats_chart.series[0].setData( income_annually_array, true );
    yearly_breakdown_stats_chart.series[1].setData( payments_annually_array, true );
    yearly_breakdown_stats_chart.series[2].setData( savings_annually_array, true );
    yearly_breakdown_stats_chart.series[3].setData( remaining_annually_array, true );

     //yearly_breakdown_stats_chart.series[0].setData( [income_annually_array, payments_annually_array, savings_annually_array, remaining_annually_array], true );

    stats_yearly_remaining.innerHTML = remaining.Yearly;
    stats_yearly_savings.innerHTML = savings.Yearly;
    stats_yearly_payments.innerHTML = payments.Yearly;
    stats_yearly_income.innerHTML = income.Yearly;





  }


};



var ChartingUpdates = (function () {

  var questions_container = document.getElementById('questions-container');

  var feesCompounded = function(interest_data_value){
    // Savings with Interest
    var custom_config = {
      principle_value : initialSavings,
      monthly_contribution: savings.Yearly,
      annual_interest: interest - interest_data_value,
      times_compounded_per_year: 1,
      length_of_investment: length_of_savings
    };

    // Don't do anything if there's no interest to compound
    var savingsWithInterest;
    if (interest > 0){
      var savingsWithInterestFees = Investing.compounded_savings(custom_config);
    } else {
      savingsWithInterestFees = ['0']
    }
    savings_invesments_overtime_chart.addSeries({                        
        name: (100 * interest_data_value) + '% fees',
        data: savingsWithInterestFees['Total-Compounded']
    }, false);
    savings_invesments_overtime_chart.redraw();

  };

  var overTime = function(years){
    var length_of_savings = document.getElementById('length-of-savings');
    document.getElementById('length-of-savings').value = years;
    SimpleBudget.calculate();
  };


  var actionEvents = function(event){
    var action_data_type = event.target.getAttribute('data-action');
    var action_data_value = event.target.getAttribute('data-action-value');

    switch(action_data_type) {
        case 'fees':
            feesCompounded(action_data_value);
            break;
        case 'time':
            overTime(action_data_value);
            break;
        default:
            break;
    }

  };


  var init = function () {
    var questions_container = elById('questions-container');
    var question_section_buttons = questions_container.getElementsByTagName('button');

    for (var i = 0, len = question_section_buttons.length; i < len; i++){
      question_section_buttons[i].addEventListener('click', actionEvents);
    }

  };
  
  return {
    init: init,
    actionEvents: actionEvents
  };

})();

// Set up all the events
ChartingUpdates.init();


// Load Default Form Values
//SimpleBudget.calculate();


// On Submit
// Resets the Investments Graphs Data when new data is submitted

function startParty(){
  var container = elById('results');
  container.innerHTML = '';
  RememberForm.init();
  SimpleBudget.calculate();
};

elById("submit").onclick = function () {
  startParty();
};