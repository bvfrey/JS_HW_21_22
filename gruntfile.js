module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        babel: {
          options: {
             sourceMap: false,
             presets: ['es2015']
            },
          dist: {
             files: [{
               expand: true,
               cwd:    'src/js',
               src:    'script.main.js',
               dest:   'dest/js',
               ext:    '.js',
               extDot: 'first'
            }]
          }
        },

        // watch: {
        //     babel: {
        //         files: 'src/js/*.js',
        //         tasks: ['babel']
        //     }
        // },

        concat: {
            options: {
                separator: ';'
            },
            js: {
                src: ['src/js/*.js', '!src/js/script.main.js'],
                dest: 'src/js/script.main.js'
            },
            css: {
                src: 'src/css/*.css',
                dest: 'dest/css/styles.main.css'
            },
        },

        uglify: {
            js: {
                src: 'dest/js/script.js',
                dest: 'dest/js/script.min.js'
            },
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dest/img/'
                }]
            }
        },

    });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['concat', 'babel', 'uglify', 'imagemin']);

};
