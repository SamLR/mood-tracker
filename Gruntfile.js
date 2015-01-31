module.exports = function(grunt) {
    grunt.initConfig({
        ngtemplates: {
            main: {
                src: 'mood-tracker/templates/partials/**/*.html',
                dest: 'tmp/js/templates.js',
                options: {
                    htmlmin: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    }
                }
            }
        },
        uglify: {
            main: {
                files: {
                    'tmp/js/scripts.js': [
                        'mood-tracker/static/js/app.js',
                        'mood-tracker/static/js/controllers/*.js',
                        'mood-tracker/static/js/directives/*.js',
                        'mood-tracker/static/js/services/*.js',
                        'tmp/js/templates.js',
                    ]
                }
            }
        },
        concat: {
            main: {
                src: [
                    'mood-tracker/static/js/lib-min/angular.min.js',
                    'mood-tracker/static/js/lib-min/lodash.min.js',
                    'mood-tracker/static/js/lib-min/moment.min.js',
                    'mood-tracker/static/js/lib-min/select.min.js',
                    'mood-tracker/static/js/lib-min/angular-sanitize.min.js',
                    'mood-tracker/static/js/lib-min/angular-ui-router.min.js',
                    'mood-tracker/static/js/lib-min/ui-bootstrap-tpls-0.12.0.min.js',
                    'tmp/js/scripts.js'
                ],
                dest: 'dist/static/js/scripts.js'
            }
        },
        less: {
            main: {
                options: {
                    compress: true
                },
                files: {
                    'dist/static/css/main.css': [
                        'mood-tracker/static/css/*.css',
                        'mood-tracker/static/less/main.less'
                    ]
                }
            }
        },
        shell: {
            main: {
                command: 'mood-tracker/manage.py collectstatic --noinput --settings=mood_tracker.settings.collect_static'
            }
        },
        copy: {
            fonts: {
                files: [{
                    expand: true,
                    cwd: 'mood-tracker/static/fonts/',
                    src: ['*'],
                    dest: 'dist/static/fonts/'
                }]
            },
            index: {
                files:[{
                    expand: true,
                    cwd: 'mood-tracker/templates/',
                    src: '*.html',
                    dest: 'dist/templates/'
                }]
            },
            python: {
                files:[{
                    expand: true,
                    cwd: 'mood-tracker/',
                    src: ['mood_tracker/**/*.py', 'tracker/**/*.py'],
                    dest: 'dist/'
                }]
            },
            requirements: {
                files: [{
                    expand: true,
                    src: 'requirements.txt',
                    dest: 'dist/'
                }]
            }
        },
        clean: {
            dist: ['dist/'],
            tmp: ['tmp/']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('makeJS',  ['ngtemplates', 'uglify', 'concat']);

    grunt.registerTask('default', [
        'clean:dist',
        'makeJS',
        'less',
        'copy',
        'shell',
        'clean:tmp'
    ]);
};