System.config({
    packages: {
        '{universe:react-chartjs}': {
            main: 'index',
            format: 'register',
            map: {
                '.': System.normalizeSync('{universe:react-chartjs}')
            }
        }
    }
});