

// Useful Math Functions
// -------------------------- //
function monthToYear(value) { return parseInt(value * 12).toFixed(2); };
function monthly(value){ return parseInt(value / 12).toFixed(2); };
function weekly(value){ return parseInt(value / 52).toFixed(2); };
function daily(value){ return parseInt(value / 365).toFixed(2); };
function hourly(value){ return parseInt(value / 24).toFixed(2); };
function minutely(value){ return parseInt(value / 60).toFixed(2); };


function annualBreakdown(value){
  var annualBreakdown = {};
  annualBreakdown.Yearly = parseInt(value).toFixed(2);
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


function displayBreakdown(object){

  var container = elById('results');

  // No elements yet, create elements.
  if (container.children.length < 1){

    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        var el = document.createElement('div');
        var header = document.createElement('h3');
        var list_container = document.createElement('ol');

        header.innerHTML = key;
        el.appendChild(header);

        var breakdown_object = object[key];

        for (var breakdown_type in breakdown_object) {
          if (breakdown_object.hasOwnProperty(breakdown_type)) {
            var list_item = document.createElement('li');
            var value = '<strong>' + breakdown_object[breakdown_type] + '</strong>';
               
            list_item.innerHTML = breakdown_type + ' ' + value;
            list_container.appendChild( list_item );
          }
        }

        el.appendChild(list_container);
        container.appendChild(el);

      }
     
    }

    

  // Elements Exist, just set the inner html of values.  
  }else{
    var displayBoxes = container.getElementsByTagName('div');
    for (var i = 0, len = displayBoxes.length; i < len; i++){
      var displayBox = displayBoxes[i];
      var header = displayBox.getElementsByTagName('h3')[0];
      var headerText = header.innerHTML;
      var list_container = displayBox.getElementsByTagName('ol')[0];
      var breakdown_object = object[headerText];
      var breakdown_array = [];

      for (var breakdown_type in breakdown_object) {
        if (breakdown_object.hasOwnProperty(breakdown_type)) {
          var str = breakdown_object[breakdown_type];
          breakdown_array.push( (str) );
        }
      }

      var list_items = list_container.getElementsByTagName('strong');
      for (var j = 0, length = list_items.length; j < length; j++){
        var list_item = list_items[j];
        var value = breakdown_array[j];
        list_item.innerHTML = value;
      }
      
    }

  }
  
};



function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}













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
    user_data.savings = parseInt( input_savings.value );
    user_data.initial_savings = parseInt( input_initial_savings.value );
    user_data.interest = parseInt( input_interest.value );
    user_data.length_of_savings = parseInt( input_length_of_savings.value );
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
    var paycheck = input_paycheck.value;
    var payFrequency = document.getElementsByName('frequency-of-pay');
    user_data.pay_frequency = this.frequencyOfPay(payFrequency);
    
    // How often you get paid
    if(user_data.pay_frequency == 'once-month'){
      user_data.annual_income = parseInt( monthToYear(paycheck) );
    }
    if(user_data.pay_frequency == 'twice-month'){
      user_data.annual_income = monthToYear(paycheck) * 2
    }
    if(user_data.pay_frequency == 'two-weeks'){
      user_data.annual_income = round(paycheck * 26);
    }

    return user_data.annual_income;
  },
  overTime: function(value){
    var yearsObj = [];
    var value = value;
    for(var i = 0, years = user_data.length_of_savings; i <= years; i++){
      yearsObj.push( (value * i) + user_data.initial_savings );  
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
    var dailySum = parseInt( user_data.savings[time_period] + user_data.payments[time_period] + user_data.remaining[time_period] );
    var chart_data =[
        [
          'Payments $' + user_data.payments[time_period], parseInt( (user_data.payments[time_period] * 100) / dailySum )
        ],
        [
          'Savings $' + user_data.savings[time_period], parseInt( (user_data.savings[time_period] * 100) / dailySum )
        ],
        [
        'Remaining $' + user_data.remaining[time_period], parseInt( (user_data.remaining[time_period] * 100) / dailySum )
        ]
    ];

    chart.series[0].setData( chart_data, true );
    chart.series[0].options.color = "#008800";
    chart.series[0].update(chart.series[0].options);

  },

  updateSavingsOverTime: function(){
    var savingsOverTime;
    // Reset
    this.resetMainChart(savings_invesments_overtime_chart);

    // // Savings over time
    savingsOverTime = this.overTime(user_data.savings.Yearly, user_data.length_of_savings);

    // Savings with Interest
    var custom_config = {
      principle_value : user_data.initial_savings,
      monthly_contribution: user_data.savings.Yearly,
      annual_interest: user_data.interest * 0.01,
      times_compounded_per_year: 1,
      length_of_investment: user_data.length_of_savings
    };

    // Don't do anything if there's no interest to compound
    var savingsWithInterest;
    if (user_data.interest > 0){
      savingsWithInterest = Investing.compounded_savings(custom_config);
    } else {
      savingsWithInterest = ['0']
    }
  
    // Update Savings and Savings With Interest Chart Information
    savings_invesments_overtime_chart.series[0].setData( savingsOverTime, true );
    savings_invesments_overtime_chart.series[1].setData( savingsWithInterest['Total-Compounded'], true );
  },

  calculate: function(){
      
    // Income Information From Forms
    this.getIncomeInformation();

    // Income
    user_data.annual_income = this.annualIncome();
    user_data.income = annualBreakdown(user_data.annual_income);

    // Payments
    user_data.payments = annualBreakdown( monthToYear( input_payments.value ) );
    
    // Remaining
    user_data.remaining = user_data.income.Monthly - user_data.payments.Monthly;
    input_savings.max = user_data.remaining;
    user_data.remaining = annualBreakdown( ( user_data.remaining * 12 ) - ( input_savings.value * 12 ) );
   
    // Savings
    user_data.savings = annualBreakdown(input_savings.value * 12);

    
    //  Display Boxes  //
    // ---------------- //
    var user_data_display_boxes = {
      Income: user_data.income,
      Payments: user_data.payments,
      Savings: user_data.savings,
      Remaining: user_data.remaining
    }
    displayBreakdown(user_data_display_boxes);



    //  Graph Settings  //
    // ---------------- //
    // Savings Over Time
    this.updateSavingsOverTime();

    // Daily Stats
    this.updateStatsChart(daily_breakdown_stats_chart, 'Daily');

    stats_daily_remaining.innerHTML = user_data.remaining.Daily;
    stats_daily_payments.innerHTML = user_data.payments.Daily;
    stats_daily_income.innerHTML = user_data.income.Daily;
    stats_daily_savings.innerHTML = user_data.savings.Daily;

    // Weekly Stats
    weekly_breakdown_stats_chart.series[0].setData( [
      parseInt( user_data.income.Weekly ), 
      parseInt( user_data.payments.Weekly ), 
      parseInt( user_data.savings.Weekly ), 
      parseInt( user_data.remaining.Weekly )
    ], true );

    stats_weekly_remaining.innerHTML = user_data.remaining.Weekly;
    stats_weekly_savings.innerHTML = user_data.savings.Weekly;
    stats_weekly_payments.innerHTML = user_data.payments.Weekly;
    stats_weekly_income.innerHTML = user_data.income.Weekly;

    // Monthly Breakdown
    monthly_breakdown_stats_chart.series[0].setData( [
      parseInt( user_data.income.Monthly ), 
      parseInt( user_data.payments.Monthly ), 
      parseInt( user_data.savings.Monthly ), 
      parseInt( user_data.remaining.Monthly )
    ], true );

    stats_monthly_remaining.innerHTML = user_data.remaining.Monthly;
    stats_monthly_savings.innerHTML = user_data.savings.Monthly;
    stats_monthly_payments.innerHTML = user_data.payments.Monthly;
    stats_monthly_income.innerHTML = user_data.income.Monthly;

    // Yearly Stats
    yearly_breakdown_stats_chart.series[0].setData( annualBreakdownArray(user_data.income.Yearly), true );
    yearly_breakdown_stats_chart.series[1].setData( annualBreakdownArray(user_data.payments.Yearly), true );
    yearly_breakdown_stats_chart.series[2].setData( annualBreakdownArray(user_data.savings.Yearly), true );
    yearly_breakdown_stats_chart.series[3].setData( annualBreakdownArray(user_data.remaining.Yearly), true );

    stats_yearly_remaining.innerHTML = user_data.remaining.Yearly;
    stats_yearly_savings.innerHTML = user_data.savings.Yearly;
    stats_yearly_payments.innerHTML = user_data.payments.Yearly;
    stats_yearly_income.innerHTML = user_data.income.Yearly;

  }


};



var ChartingUpdates = (function () {

  var questions_container = document.getElementById('questions-container');

  var feesCompounded = function(interest_data_value){

    // Savings with Interest
    var custom_config = {
      principle_value : user_data.initial_savings,
      monthly_contribution: user_data.savings.Yearly,
      annual_interest: ( user_data.interest - interest_data_value ) * 0.01,
      times_compounded_per_year: 1,
      length_of_investment: user_data.length_of_savings
    };

    // Don't do anything if there's no interest to compound
    var savingsWithInterest;
    if (user_data.interest > 0){
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
    input_length_of_savings.value = years;
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




// On Submit
// Resets the Investments Graphs Data when new data is submitted

function startParty(){
  SimpleBudget.calculate();
};

elById("submit").onclick = function () {
  startParty();
  //return false;
};



function updateRange(){

  var savings_range = document.getElementById('savings-range');
  var savings_range_value = document.getElementById('savings-range-value');
  var savings_input = document.getElementById('savings');
  var savings = parseInt( savings_input.value );
  var savings_max = parseInt( savings_input.getAttribute('max') );
  var savings_percent = (savings / savings_max ) * 100;

  savings_range.value = savings_percent;
  savings_range_value.innerHTML = savings_percent.toFixed(2) + '%';
}

(function(){
  var inputs = document.getElementsByTagName('input');

  for (var i = 0, len = inputs.length; i < len; i++){
    var input = inputs[i];
    var type = input.getAttribute('type');

    if ( type === 'radio' || type === 'number' ){
      input.addEventListener('change', function(){
        startParty();
        updateRange();
      });
      input.addEventListener('keyup', debounce(function (e) {
        // do the Ajax request
        startParty();

        if (e.target.id === 'savings'){
          updateRange();
        }
      }, 550) );

    } else if (type === 'range') {
      input.addEventListener('change', function(e){
        var savings_input = document.getElementById('savings');
        var savings = savings_input.value;
        var savings_max = savings_input.getAttribute('max');
        var savings_range = e.target;
        var savings_percent = (e.target.value * 0.01).toFixed(2);
        document.getElementById('savings-range-value').innerHTML = e.target.value + '%';
        savings_input.value = parseInt(savings_max * savings_percent).toFixed(2);
        startParty();
      });
    } else if (type === 'text'){

      

    }
  }
})();




