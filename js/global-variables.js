//-- Helper Functions
//---------------------------//

// Get Element By Id Function - Thanks Brett Tackaberry.
function elById(arg){ return document.getElementById(arg); };

// Return Value and Display to HTML Elements Round to nearest 0.00x
function round(arg){ return Math.round(arg * 100) / 100; };




//-- Global Variables
// --------------------- //
var rootURL = window.location.origin + window.location.pathname + window.location.hash;


// Income Information
var paycheck;
var payFrequency;
var income;
var annualIncome;
var payments;
var annualPayments;
var annualSavings;
var savings;
var savingsOverTime;
var remaining;
var initialSavings;
var interest;
var length_of_savings;

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