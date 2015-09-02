const Chart = Package['chart:chart'].Chart;

var dataKeys = {
    'Line': 'points',
    'Radar': 'points',
    'Bar': 'bars'
};

var updatePoints = function(nextProps, chart, dataKey) {
    var name = chart.name;

    if (name === 'PolarArea' || name === 'Pie' || name === 'Doughnut') {
        nextProps.data.forEach(function(segment, segmentIndex) {
            if (!chart.segments[segmentIndex]) {
                chart.addData(segment);
            } else {
                chart.segments[segmentIndex].value = segment.value;
            }
        });
    } else {
        while (chart.scale.xLabels.length > nextProps.data.labels.length) {
            chart.removeData();
        }
        nextProps.data.datasets.forEach(function(dSet, setIndex) {
            dSet.data.forEach(function(val, pointIndex) {
                if (typeof(chart.datasets[setIndex]) === "undefined" ||
                    typeof(chart.datasets[setIndex][dataKey]) === "undefined" ||
                    typeof(chart.datasets[setIndex][dataKey][pointIndex]) === "undefined") {
                    addData(nextProps, chart, setIndex, pointIndex);
                } else {
                    chart.datasets[setIndex][dataKey][pointIndex].value = val;
                }
            });
        });
    }
};

var addData = function(nextProps, chart, setIndex, pointIndex) {
    var values = [];
    nextProps.data.datasets.forEach(function(dSet) {
        values.push(dSet.data[pointIndex]);
    });
    chart.addData(values, nextProps.data.labels[setIndex]);
};

export default {
    createClass: function(chartType, methodNames, dataKey) {
        var classData = {
            displayName: chartType + 'Chart',
            getInitialState () { return {}; },
            render: function() {
                var _props = {
                    ref: 'canvass'
                };
                for (var name in this.props) {
                    if (this.props.hasOwnProperty(name)) {
                        if (name !== 'data' && name !== 'options') {
                            _props[name] = this.props[name];
                        }
                    }
                }
                return <canvas {..._props}/>;
            }
        };

        var extras = ['clear', 'stop', 'resize', 'toBase64Image', 'generateLegend', 'update', 'addData', 'removeData'];
        function extra(type) {
            classData[type] = function() {
                this.state.chart[name].apply(this.state.chart, arguments);
            };
        }

        classData.componentDidMount = function() {
            this.initializeChart(this.props);
        };

        classData.componentWillUnmount = function() {
            let chart = this.state.chart;
            chart && chart.destroy();
        };

        classData.componentWillReceiveProps = function(nextProps) {
            var chart = this.state.chart;
            if (nextProps.redraw) {
                chart && chart.destroy();
                this.initializeChart(nextProps);
            } else {
                dataKey = dataKey || dataKeys[chart.name];
                updatePoints(nextProps, chart, dataKey);
                chart.scale.xLabels = nextProps.data.labels;
                chart.scale.calculateXLabelRotation();
                chart.update();
            }
        };

        classData.initializeChart = function(nextProps) {
            var el = this.getDOMNode();
            var ctx = el.getContext("2d");
            var chart = new Chart(ctx)[chartType](nextProps.data, nextProps.options || {});
            this.setState({chart});
        };

        // return the chartjs instance
        classData.getChart = function() {
            return this.state.chart;
        };

        // return the canvass element that contains the chart
        classData.getCanvass = function() {
            return this.refs.canvass.getDOMNode();
        };

        classData.getCanvas = classData.getCanvass;

        var i;
        for (i=0; i<extras.length; i++) {
            extra(extras[i]);
        }
        for (i=0; i<methodNames.length; i++) {
            extra(methodNames[i]);
        }

        return React.createClass(classData);
    }
};