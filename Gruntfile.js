var child_process = require('child_process');

module.exports = function(grunt) {
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    hostname: '*',
                    port: 8080,
                    keepalive: true,
                    base: 'public'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('clean', function() {
        child_process.execSync('rm -rf public/dist/');
    });

    grunt.registerTask('build', function() {
        child_process.execSync('mkdir public/dist');
        child_process.execSync('./node_modules/.bin/babel src -o public/dist/bundle.js --source-maps');
    });

    grunt.registerTask('copyjs', function() {
        child_process.execSync('mkdir public/dist');
        child_process.execSync('cp src/demo.js public/dist/bundle.js');
    });

    grunt.registerTask('default', ['clean', 'build', 'connect:server']);
    grunt.registerTask('no-babel', ['clean', 'copyjs', 'connect:server']);
};