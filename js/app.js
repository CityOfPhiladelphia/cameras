window.jQuery = window.jQuery || {};
window._ = window._ || {};
//window.Tabletop = window.Tabletop || {};
(function(window, $, _, Tabletop) {
    
    window.DEBUG = false;
    _.templateSettings.variable = "data"; // Namespace for template data
    
    var formatDate = function(input) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            ,parts = input ? input.split("-") : [];
        return parts.length === 3 ? months[(new Date(parts[0], parts[1]-1, parts[2])).getMonth()] : input; // months are 0-based
    };
    
    Tabletop.init({
        key: "0AlMaW-4cviLodG1XSGszdkNmdGlZVzMyWG1vOVlieEE"
        ,simpleSheet: true
        ,callback: function(data, tabletop) {
            if(window.DEBUG) console.log(data, tabletop);
            
            // Fill in "now" data
            $("#now").empty().append(_.template($("#tmpl-now").html(), data[data.length - 1]));
            
            // Restructure data for chart
            var chartData = [];
            _.each(data, function(row) {
                chartData.push([formatDate(row.date), Math.round(row.percent * 100)/100]);
            });
            
            // Create chart
            $('#chart').highcharts({
                chart: {
                    type: 'area'
                },
                title: {
                    text: ''
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
                    data: chartData
                }]
            });
        }
    });
})(window, window.jQuery, window._, window.Tabletop);