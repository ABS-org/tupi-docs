// Gruntfile.js
//
//

module.exports = function (grunt) {
  'use strict';

  // Project configuration
  grunt.initConfig({

    // Metadata
    pkg: grunt.file.readJSON('package.json'),

    /************************************
     * grunt-contrib-concat
     * Concatenate files
     ************************************/
    concat: {
      tupi: {
        src: [
          'bower_components/tupi/dist/js/tupi.min.js'
        ],
        dest: 'js/tupi.min.js'
      }
    },

    /************************************
     * grunt-contrib-watch
     * Watch some files and tasks
     ************************************/
    watch: {
      html: {
        files: '*.html',
        options: {
          livereload: true
        }
      },
      stylesheets: {
        files: '/css/**/*.css',
        tasks: ['dist-css'],
        options: {
          livereload: true
        }
      },
      javascripts: {
        files: '/js/**/*.js',
        tasks: ['dist-js'],
        options: {
          livereload: true
        }
      }
    },

    /************************************
     * grunt-contrib-connect
     * Start a connect web server
     ************************************/
    connect: {
      server: {
        options: {
          port: 9001,
          open: true,
          livereload: true
        }
      }
    },

    /************************************
     * grunt-shell
     * Run shell commands
     ************************************/
    shell : {
      jekyll : {
        options: {
          stdout: true
        },
        command : 'jekyll serve --baseurl "" --w'
      },
      deployDocs : {
        command: 'git checkout gh-pages && git merge master && git checkout master && git push'
      }
    },

    /************************************
     * grunt-bump
     * Bump package version, create tag, commit, push...
     ************************************/
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: '%VERSION%',
        commitFiles: ['package.json', 'bower.json'], // '-a' for all files
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: '%VERSION%',
        push: true,
        pushTo: 'master',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    }

  });


  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Displays the execution time of grunt tasks
  require('time-grunt')(grunt);

  // Jekyll task
  grunt.registerTask('jekyll', ['shell:jekyll']);

  // Deploy task
  grunt.registerTask('deploy', ['shell:deployDocs']);

  // Server task
  grunt.registerTask('server', ['connect', 'watch']);

  // Default task
  grunt.registerTask('default', ['server']);

};
