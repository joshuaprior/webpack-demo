var child_process = require('child_process');

function exec() {
    var args = Array.prototype.join.call(arguments, ' ');
    console.log('exec:', args);
    var buffer = child_process.execSync.apply(child_process, arguments);
    console.log(buffer.toString());
}

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
        exec('rm -rf public/dist/');
    });

    grunt.registerTask('build', function() {
        exec('mkdir public/dist');
        exec('webpack');
    });

    grunt.registerTask('default', ['clean', 'build', 'connect:server']);
};