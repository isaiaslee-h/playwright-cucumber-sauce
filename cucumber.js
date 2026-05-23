module.exports = {
    default: {
        parallel: 3,
        format: ['html:reports/cucumber-report.html', 'summary'],
        paths: ['features/**/*.feature'],
        require: ['step_definitions/**/*.js']
    }
};