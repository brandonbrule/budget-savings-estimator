//-- Helper Functions
//---------------------------//

// Get Element By Id Function - Thanks Brett Tackaberry.
function elById(arg){ return document.getElementById(arg); };

// Return Value and Display to HTML Elements Round to nearest 0.00x
function round(arg){ return Math.round(arg * 100) / 100; };




//-- Global Variables
// --------------------- //
var rootURL = window.location.origin + window.location.pathname + window.location.hash;


// var User Inputs
var user_data = {
	annual_income: null,
	income: null,
	payments: null,
	savings: null,
	interest: null,
	initial_savings: null,
	length_of_savings: null,
	remaining: null
}


// Income Information
var input_paycheck = elById('paycheck');

var input_payments = elById('payments');

var input_savings = elById('savings');

var input_initial_savings = elById('initial-savings');

var input_interest = elById('interest');

var input_length_of_savings = elById('length-of-savings');



// Els
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