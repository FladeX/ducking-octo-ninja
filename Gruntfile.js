module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            main: {
                files: {
                    'css/style.css': 'css/style.less'
                }
            }
        },
        coffee: {
            main: {
                files: {
                    'js/data.js': 'js/data.coffee',
                    'js/main.js': 'js/main.coffee'
                }
            }
        },
        copy: {
            main: {
                files: {
                    'js/underscore.js': 'bower_components/underscore/underscore.js',
                    'js/backbone.js': 'bower_components/backbone/backbone.js',
                    'js/jquery.js': 'bower_components/jquery/dist/jquery.js',
                    'js/he.js': 'bower_components/he/he.js',
                    'js/markdown.js': 'bower_components/markdown/lib/markdown.js',
                    'js/to-markdown.js': 'bower_components/to-markdown/src/to-markdown.js'
                }
            }
        },
        concat: {
            main: {
                src: ['js/data.js', 'js/main.js'],
                dest: 'js/scripts.js'
            }
        },
        uglify: {
            main: {
                files: {
                    'js/scripts.min.js': 'js/scripts.js'
                }
            }
        },
        watch: {
            less: {
                files: ['css/*.less'],
                tasks: ['less']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['less', 'copy', 'coffee', 'concat', 'uglify']);
};
