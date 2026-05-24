module.exports = {
    default: {
        parallel: 3,
        format: ['html:reports/cucumber-report.html', 'summary'],
        paths: ['features/**/*.feature'],
        requireModule: ['dotenv/config'],
        require: ['step_definitions/**/*.js'],
        timeout: 30000 // Global timeout implementation
    }
};