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
    
    var loading = function(status) {
        $("body").toggleClass("loading", status);
    };
    
    loading(true);
    
    Tabletop.init({
        key: "0AlMaW-4cviLodG1XSGszdkNmdGlZVzMyWG1vOVlieEE"
        ,simpleSheet: true
        ,callback: function(data, tabletop) {
            if(window.DEBUG) console.log(data, tabletop);
            
            loading(false);
            
            // Fill in "now" data
            var now = _.clone(data[data.length - 1]);
            now.date = formatDate(now.date);
            $("#now").empty().append(_.template($("#tmpl-now").html(), now));
            
            // Restructure data for chart
            var chartData = [];
            _.each(data, function(row) {
                chartData.push([formatDate(row.date), Math.round(row.percent * 100)/100]);
            });
            
            // Create gauge chart
            $("#gauge").highcharts({
                chart: {
                    type: "gauge"
                    ,plotBackgroundColor: null
                    ,plotBackgroundImage: null
                    ,plotBorderWidth: 0
                    ,plotShadow: false
                }
                ,title: {
                    text: ""
                }
                ,pane: {
                    startAngle: -90
                    ,endAngle: 90
                    ,size: "120%"
                    ,center: ["50%", "100%"]
                    ,background: [{
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1}
                            ,stops: [
                                [0, "#fff"]
                                ,[1, "#333"]
                            ]
                        }
                        ,borderWidth: 0
                        ,outerRadius: "109%"
                    }, {
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1}
                            ,stops: [
                                [0, "#333"]
                                ,[1, "#fff"]
                            ]
                        }
                        ,borderWidth: 1
                        ,outerRadius: "107%"
                    }, {
                        // default background
                    }, {
                        backgroundColor: "#ddd"
                        ,borderWidth: 0
                        ,outerRadius: "105%"
                        ,innerRadius: "103%"
                    }]
                }
                ,plotOptions: {
                    gauge: {
                        dial: {
                            baseWidth: 4
                            ,backgroundColor: "#c33"
                            ,borderColor: "#900"
                            ,borderWidth: 1
                            ,rearLength: 20
                            ,baseLength: 10
                            ,radius: 80
                        }
                    }
                }
                ,yAxis: {
                    min: 0
                    ,max: 100
                    
                    ,minorTickInterval: "auto"
                    ,minorTickWidth: 1
                    ,minorTickLength: 10
                    ,minorTickPosition: "inside"
                    ,minorTickColor: "#666"
                    
                    ,tickPixelInterval: 60
                    ,tickWidth: 4
                    ,tickPosition: "inside"
                    ,tickLength: 20
                    ,tickColor: "#666"
                    
                    ,labels: {
                        step: 2
                        ,rotation: "auto"
                        ,distance: -35
                        ,style: {
                            size: "140%"
                            ,fontWeight: "bold"
                        }
                    }
                    ,title: {
                        text: "Percent Operational"
                    }
                    ,plotBands: [{
                        from: 0
                        ,to: 33
                        ,color: "#df5353" // red
                    }, {
                        from: 33
                        ,to: 66
                        ,color: "#dddf0d" // yellow
                    }, {
                        from: 66
                        ,to: 100
                        ,color: "#55bf3b" // green
                    }]
                }
                ,series: [{
                    name: "Operating"
                    ,data: [Math.round(data[data.length - 1].percent)]
                    ,tooltip: {
                        valueSuffix: "%"
                    }
                }]
            });
            
            // Create timeline chart
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