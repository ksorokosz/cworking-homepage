
function plotChart(obj, values, labels, reversed) {

    Chart.defaults.global.defaultFontColor = '#cfc8c5';
    var myChart = null;
    var ctx = obj.getContext("2d");
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Values',
                data: values,
                backgroundColor: "#ff5400", 
                borderWidth: 0,
            }]
        },
        options: {
            scales: {
                yAxes: [{
		            display: false,
                    ticks: {
                        beginAtZero:true,
                        max: 100,
                    },
                    beginAtZero:true,
		            gridLines: {
    		            display: false,
		                drawBorder: false,
		            },
                }],
		        xAxes: [{
                    ticks: {
                        beginAtZero:true,
                        reverse: reversed,
                    },
		            display: false,
                    gridLines: {
                        display: false,
                    }, 
               }],
            },
            "hover": {
                "animationDuration": 0,
            },
            "animation": {
                "duration": 1000,
                "onComplete": function() {
                    var chartInstance = this.chart;
                    ctx = chartInstance.ctx;

                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 
                                                    Chart.defaults.global.defaultFontStyle, 
                                                    Chart.defaults.global.defaultFontFamily);
                    ctx.fillStyle = this.chart.config.options.defaultFontColor;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    var labels = this.data.labels;
                    this.data.datasets.forEach(function(dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function(bar, index) {
                            var data = labels[index];
                            ctx.fillText(data, bar._model.x, bar._model.y - 10);
                            ctx.fillText(dataset.data[index] + " %", bar._model.x, bar._model.y + 20);
                        });
                    });
                }
            },
            legend: {
                display: false
            },
            tooltips: {
                "enabled": false,
            },
        }
    }); 
};

$(document).ready(function() {

    $(window).on("hashchange", function(e) {

        target = window.location.hash + "-section";
        if ( target ) {
            $('html, body').stop().animate(
                { scrollTop: $(target).offset().top },
                2000
            );
        }

        window.history.replaceState({}, document.title, ".");
        return false;
    });

    var interests_chart = document.getElementById("interests");
    plotChart(interests_chart, [20, 30, 50], ['embedded', 'ai', 'dsp'], false)
});
