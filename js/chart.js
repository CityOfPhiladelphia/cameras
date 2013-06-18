$(function () {
    $('#chart').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: '',
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: ''
            },
            allowDecimals: false,
            min: 0,
            max: 100,
            labels: {
                formatter: function() { return this.value + "%"; }
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                fillOpacity: 0.1
            }
        },
        series: [{
            name: 'Operating',
            data: [['Jan', 75.5], ['Feb', 76.73], ['Mar', 78.71], ['Apr', 84.16], ['May', 89.16], ['Jun', 86.70]]
        }]
    });
});