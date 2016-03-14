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

    grunt.registerTask('create-dist', function() {
        exec('mkdir public/dist');
    });

    grunt.registerTask('build', function(transpiler) {
        if (transpiler === 'babel' || transpiler === undefined) {
            exec("./node_modules/.bin/babel src/demo.js -o public/dist/bundle.js --source-maps");

        } else if (transpiler === 'webpack') {
            exec('webpack');

        } else {
            grunt.log.error('Unknown transpiler.');
        }
    });

    grunt.registerTask('serve', function(transpiler) {
        var buildTask = (transpiler === 'babel' || transpiler === undefined) ? 'build:babel'
            : transpiler === 'webpack' ? 'build:webpack'
            : undefined;

        if (!buildTask) grunt.log.error('Unknown transpiler.');

        grunt.task.run(['clean', 'create-dist', buildTask, 'connect:server']);
    });

    grunt.registerTask('default', ['serve:babel']);
};