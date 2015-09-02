import vars from './lib/core';
const Bar = vars.createClass('Bar', ['getBarsAtEvent']);
const StackedBar = vars.createClass('StackedBar', ['getBarsAtEvent']);
const Doughnut = vars.createClass('Doughnut', ['getSegmentsAtEvent']);
const Line = vars.createClass('Line', ['getPointsAtEvent']);
const Pie = vars.createClass('Pie', ['getSegmentsAtEvent']);
const PolarArea = vars.createClass('PolarArea', ['getSegmentsAtEvent']);
const Radar = vars.createClass('Radar', ['getPointsAtEvent']);
const createClass = vars.createClass;
export  {Bar, StackedBar, Doughnut, Line, Pie, PolarArea, Radar, createClass};

