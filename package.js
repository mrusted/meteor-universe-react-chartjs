Package.describe({
  name: 'universe:react-chartjs',
  version: '1.0.2',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use([
    'chart:chart',
    'universe:modules@0.4.1'
  ]);
  api.addFiles('index.js');
  api.addFiles('index.import.jsx');
  api.addFiles('plugins/Chart.StackedBar.js', 'client');
  api.addFiles('lib/core.import.jsx');
});

