var savings_invesments_overtime_chart = new Highcharts.Chart({
      chart: {
        renderTo: 'savings-investments-overtime-graph'
      },

      title: {
        text: 'Hypothetical Investments',
        style:{
          color: '#fff'
        }
      },

      xAxis: {
        categories: [],
        title: {
          text: 'Years',
          style:{
            color: '#fff'
          }
        }
      },

      yAxis: {
        title: {
          text: 'Savings',
          style:{
            color: '#fff'
          }
        }
      },

      series: [
        {
          name: 'Savings With Interest',
          style:{
            color: '#fff'
          },
          data: [0]
        },
        {
          name: 'Savings Without Interest',
          style:{
            color: '#fff'
          },
          data: [0]
        }
      ]


    });




// Stats Chart
var daily_breakdown_stats_chart = new Highcharts.Chart({
        chart: {
            renderTo: 'daily-breakdown-stats'
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.percentage:.1f} %'
                },
                showInLegend: true
            }
        },
        series: [
        {
            type: 'pie',
            name: 'Daily',
            data: [

            {
                    y: 0,
                    color: '#e54d42'
                },
                {
                    y: 0,
                    color: '#f1aa2a'
                },
                {
                    y: 0,
                    color: '#2d7eb6'
                }
                
            ]
        }

        ]
    });


// Stats Chart



var weekly_breakdown_stats_chart = new Highcharts.Chart({
        title: {
            text: ''
        },
        chart: {
        	renderTo: 'weekly-breakdown-stats',
            type: 'column'
        },
        xAxis: {
            categories: ['Income', 'Payments', 'Savings', 'Remaining']
        },
        yAxis:{
        	gridLineWidth: 0,
            minorGridLineWidth: 0
        },
        tooltip: {
            pointFormat: '${point.y:.1f}</b>'
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                showInLegend: false,
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            data: [
            	{
            		name: 'Income',
                    y: 0,
                    color: '#21a08f'
                },
            	{
            		name: 'Payments',
                    y: 0,
                    color: '#e54d42'
                },
                {
                	name: 'Savings',
                    y: 0,
                    color: '#f1aa2a'
                },
                {
                	name: 'Remaining',
                    y: 0,
                    color: '#2d7eb6'
                }
            ]
        }]
    });


var monthly_breakdown_stats_chart = new Highcharts.Chart({
        title: {
            text: ''
        },
        chart: {
        	renderTo: 'monthly-breakdown-stats',
            type: 'bar',
            lineWidth: 0,
   minorGridLineWidth: 0,
   lineColor: 'transparent',
        },
        xAxis: {
            categories: ['Income', 'Payments', 'Savings', 'Remaining'],
        },
        yAxis:{
        	labels: {
                enabled: false
            },
            gridLineWidth: 0,
            minorGridLineWidth: 0
        },
        tooltip: {
            pointFormat: '${point.y:.1f}</b>'
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                showInLegend: false,
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            data: [
            	{
            		name: 'Income',
                    y: 0,
                    color: '#21a08f'
                },
            	{
            		name: 'Payments',
                    y: 0,
                    color: '#e54d42'
                },
                {
                	name: 'Savings',
                    y: 0,
                    color: '#f1aa2a'
                },
                {
                	name: 'Remaining',
                    y: 0,
                    color: '#2d7eb6'
                }
            ]
        }]
    });





var yearly_breakdown_stats_chart = new Highcharts.Chart({

		chart: {
            type: 'area',
            renderTo: 'yearly-breakdown-stats'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Billions'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000;
                }
            }
        },
        tooltip: {
            shared: true,
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [
	        {
	            name: 'Income',
	            data: [0],
	            color: '#21a08f'
	        }, 
	        {
	            name: 'Payments',
	            data: [0],
	            color: '#e54d42'
	        }, 
	        {
	            name: 'Savings',
	            data: [0],
	            color: '#f1aa2a'
	        }, 
	        {
	            name: 'Remaining',
	            data: [0],
	            color: '#2d7eb6'
	        }
        ]
});










// var yearly_breakdown_stats_chart = new Highcharts.Chart({
//         title: {
//             text: ''
//         },
//         chart: {
//         	renderTo: 'yearly-breakdown-stats',
//             type: 'column'
//         },
//         xAxis: {
//             categories: ['Income', 'Payments', 'Savings', 'Remaining']
//         },
//         yAxis:{
//         	gridLineWidth: 0,
//             minorGridLineWidth: 0
//         },
//         tooltip: {
//             pointFormat: '${point.y:.1f}</b>'
//         },
//         plotOptions: {
//             series: {
//                 allowPointSelect: true,
//                 showInLegend: false,
//                 dataLabels: {
//                     enabled: true
//                 }
//             }
//         },
//         series: [{
//             data: [
//             	{
//             		name: 'Income',
//                     y: 0,
//                     color: '#21a08f'
//                 },
//             	{
//             		name: 'Payments',
//                     y: 0,
//                     color: '#e54d42'
//                 },
//                 {
//                 	name: 'Savings',
//                     y: 0,
//                     color: '#f1aa2a'
//                 },
//                 {
//                 	name: 'Remaining',
//                     y: 0,
//                     color: '#2d7eb6'
//                 }
//             ]
//         }]
//     });


// var weekly_breakdown_stats_chart = new Highcharts.Chart({
//         chart: {
//             renderTo: 'weekly-breakdown-stats'
//         },
//         title: {
//             text: ''
//         },
//         tooltip: {
//             pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//         },
//         plotOptions: {
//             pie: {
//                 allowPointSelect: true,
//                 cursor: 'pointer',
//                 dataLabels: {
//                     enabled: true,
//                     format: '{point.percentage:.1f} %'
//                 },
//                 showInLegend: true
//             }
//         },
//         series: [
//         {
//             type: 'pie',
//             name: 'Daily',
//             data: [

//             {
//                     y: 23.4,
//                     color: '#e54d42'
//                 },
//                 {
//                     y: 13.4,
//                     color: '#f1aa2a'
//                 },
//                 {
//                     y: 63.4,
//                     color: '#2d7eb6'
//                 }
                
//             ]
//         }

//         ]
//     });