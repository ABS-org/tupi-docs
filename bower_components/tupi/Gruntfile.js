// Gruntfile.js
//
//

module.exports = function (grunt) {
  'use strict';

  var appConfig = {

    // Default Paths
    path: {
      bower: 'bower_components',
      src: 'src',
      dist: 'dist',
      tests: 'tests',
    },

    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * Tupi v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Author: <%= pkg.author %>\n' +
            ' * Contributors: <%= pkg.contributors %>\n' +
            ' * Licensed under <%= pkg.license %>\n' +
            ' */\n',

    /************************************
     * grunt-contrib-clean
     * Clean files and folders
     ************************************/
    clean: {
      dist: ['<%= path.dist %>/css']
    },

    /************************************
     * grunt-contrib-less
     * LESS Task, compile and minify stylesheets
     ************************************/
    less: {
      compileCore: {
        files: {
          '<%= path.dist %>/css/tupi.css': '<%= path.src %>/less/build.less'
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          '<%= path.dist %>/css/tupi.min.css': '<%= path.dist %>/css/tupi.css'
        }
      }
    },

    /************************************
     * grunt-contrib-concat
     * Concatenate files
     ************************************/
    concat: {
      snapsvgPlugin: {
        src: [
          '<%= path.bower %>/snap.svg/dist/snap.svg.js'
        ],
        dest: '<%= path.dist %>/js/<%= pkg.name %>.snapsvg.js'
      },
      svgloaderPlugin: {
        src: [
          '<%= path.bower %>/svgLoader.js/svgLoader.js'
        ],
        dest: '<%= path.dist %>/js/<%= pkg.name %>.svgloader.js'
      },
      classiePlugin: {
        src: [
          '<%= path.bower %>/classie/classie.js'
        ],
        dest: '<%= path.dist %>/js/<%= pkg.name %>.classie.js'
      },
      navigatorComponent: {
        src: [
          '<%= path.src %>/js/navigator.js'
        ],
        dest: '<%= path.dist %>/js/<%= pkg.name %>.navigator.js'
      }
    },

    /************************************
     * grunt-contrib-copy
     * Copy files and folders to a destination path
     ************************************/
    copy: {
      fonts: {
        expand: true,
        cwd: '<%= path.src %>/fonts/',
        src: ['*.eot', '*.svg', '*.ttf', '*.woff'],
        dest: '<%= path.dist %>/fonts/'
      }
    },

    /************************************
     * grunt-contrib-jshint
     * Validate files with JSHint
     ************************************/
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', '<%= path.src %>/js/**/*.js']
    },

    /************************************
     * grunt-contrib-csslint
     * Lint CSS files
     ************************************/
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      strict: {
        options: {
          import: 2
        },
        src: ['<%= path.dist %>/css/tupi.css']
      }
    },

    /************************************
     * grunt-banner
     * Adds a simple banner to files
     ************************************/
    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: ['<%= path.dist %>/css/*.css',
              '<%= path.dist %>/js/*.js']
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
        commitFiles: ['package.json', 'bower.json', '<%= path.dist %>'], // '-a' for all files
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: '%VERSION%',
        push: true,
        pushTo: 'master',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    }

  };

  // Init grunt configurations
  grunt.initConfig(appConfig);

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Displays the execution time of grunt tasks
  require('time-grunt')(grunt);

  // JS and CSS dist task
  grunt.registerTask('dist-css', ['less']);
  grunt.registerTask('dist-js', ['concat', 'copy']);
  grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js', 'usebanner']);

  // Test task
  grunt.registerTask('test', ['jshint', 'csslint']);

  // Default task
  grunt.registerTask('default', ['test']);

};
