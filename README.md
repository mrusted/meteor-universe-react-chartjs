react-chartjs
============

rich interactive react charting components using [chart.js](http://www.chartjs.org/) including

* Line chart
* Bar chart
* Radar chart
* Polar area chart
* Pie chart
* Doughnut chart

*based on [jhudson8/react-chartjs](https://github.com/jhudson8/react-chartjs/edit/master/README.md)*

Installation
------------
This is a CommonJS component only (to be used with something like Webpack or Browserify)

```sh
meteor add universe:react-chartjs
```


Example Usage
-------------
```
import {Line} from '{universe:react-chartjs}'

var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(250,195,168,0.5)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(250,195,168,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

export default React.createClass({
    displayName: 'StatsWidget',
    render () {
        return (
            <div>
                <Line data={data} className='unichart' options={{responsive:true}}/>
            </div>
        );
    }
});
```

* ```data``` represents the chart data (see [chart.js](http://www.chartjs.org/) for details)
* ```options``` represents the chart options (see [chart.js](http://www.chartjs.org/) for details)
* all other parameters will be passed through to the ```canvas``` element
* if data passed into the component changes, points will animate between values using chart.js' ```.update()```. If you want the chart destroyed and redrawn on every change, pass in ```redraw``` as a prop. For example ```<LineChart data={this.state.chartData} redraw />```

Chart References
----------------
The ```canvas``` element can be retrieved using ```getCanvas``` and the ```chartjs object``` can be retrieved using ```getChart```.


