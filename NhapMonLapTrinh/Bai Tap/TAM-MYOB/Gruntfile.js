var version = ['desktop'],
    viewPort = [[1200, 1200]],
    dir = 'test/css-regression-test/',
    testCssRegression = {};

for (var i = 0; i < version.length; i++) {
  var ver = version[i],
      view = viewPort[i];
  testCssRegression[ver] = {
    options: {
      screenshots: dir + 'stored/' + ver + '/screenshots/',
      results: dir + 'results/' + ver + '/',
      viewportSize: view
    },
    src: [
      dir + 'stored/' + ver + '/start.js',
      dir + 'stored/' + ver + '/components/*.js',
      dir + 'stored/' + ver + '/controllers/*.js',
      dir + 'stored/' + ver + '/run.js'
    ]
  }
};
module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - built on <%= grunt.template.today("dd-mm-yyyy") %> */\n',
      views: 'app/views/',
      styles: 'app/styles/',
      scripts: 'app/scripts/',
      assets: 'app/assets/',
      build: 'static/',
      doc: 'doc/'
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: '<%= meta.views %>',
          src: ['**/*.jade', '!blocks/**', '!layouts/**', '!mixins/**'],
          dest: '<%= meta.build %>',
          ext: '.html'
        }]
      }
    },
    less: {
      dev: {
        options: {
          compress: false
        },
        files: [{
          '<%= meta.build %>css/css/libs.css': '<%= meta.styles %>libs/libs.less',
          '<%= meta.build %>css/css/style.css': '<%= meta.styles %>style.less',
          '<%= meta.build %>css/css/print.css': '<%= meta.styles %>print.less'
        }]
      }
    },
    concat: {
      dist: {
        files: [{
          '<%= meta.build %>js/modernizr.js': ['<%= meta.scripts %>libs/modernizr.2.8.3.js','<%= meta.scripts %>libs/detectizr.js'],
          '<%= meta.build %>js/libs.js': ['<%= meta.scripts %>libs/jquery-2.1.4.js', '<%= meta.scripts %>libs/handlebars-v3.0.3.js', '<%= meta.scripts %>libs/angular.js', '<%= meta.scripts %>libs/plugins/*.js'],
          '<%= meta.build %>js/l10n.js': '<%= meta.scripts %>l10n.js',
          '<%= meta.build %>js/script.js': ['<%= meta.scripts %>site.js', '<%= meta.scripts %>app.module.js', '<%= meta.scripts %>plugins/*.js', '<%= meta.scripts %>components/*.js', '<%= meta.scripts %>controllers/*.js']
        }]
      }
    },
    copy: {
      data: {
        files: [{
          expand: true,
          cwd: '<%= meta.views %>data/',
          src: ['**', '!*.jade'],
          dest: '<%= meta.build %>data/'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>fonts/',
          src: '**',
          dest: '<%= meta.build %>fonts/'
        }]
      },
      icons: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>icons/',
          src: '**',
          dest: '<%= meta.build %>'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: '<%= meta.assets %>images/',
          src: '**',
          dest: '<%= meta.build %>images/'
        }]
      }
    },
    jscs: {
      src: ['<%= meta.scripts %>plugins/*.js', '<%= meta.scripts %>*.js', '<%= meta.scripts %>components/*.js', '<%= meta.scripts %>controllers/*.js'],
      options: {
        config: '.jscsrc',
        fix: true, // Autofix code style violations when possible.
        requireCurlyBraces: ['if']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['<%= meta.scripts %>plugins/*.js', '<%= meta.scripts %>*.js', '<%= meta.scripts %>components/*.js', '<%= meta.scripts %>controllers/*.js']
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      files: ['<%= meta.build %>css/style.css']
    },
    htmlhint: {
      options: {
        htmlhintrc: '.htmlhintrc'
      },
      files: ['<%= meta.build %>*.html']
    },
    jadelint: {
      options: {
        jadelintrc: '.jadelintrc'
      },
      files: ['<%= meta.views %>**/*.jade']
    },
    watch: {
      options: {
        spawn: false,
        interrupt: false,
        livereload: true
      },
      js: {
        files: ['<%= meta.scripts %>plugins/*.js', '<%= meta.scripts %>*.js', '<%= meta.scripts %>components/*.js', '<%= meta.scripts %>controllers/*.js'],
        tasks: ['jscs', 'jshint', 'concat']
      },
      jade: {
        files: ['<%= meta.views %>**/*.jade'],
        tasks: ['jadelint', 'jade', 'htmlhint']
      },
      data: {
        files: ['<%= meta.views %>data/**'],
        tasks: ['copy:data']
      },
      less: {
        files: ['<%= meta.styles %>**/*.less'],
        tasks: ['less', 'autoprefixer', 'csslint']
      },
      fonts: {
        files: ['<%= meta.assets %>fonts/**'],
        tasks: ['copy:fonts']
      },
      icons: {
        files: ['<%= meta.assets %>icons/**'],
        tasks: ['copy:icons']
      },
      images: {
        files: ['<%= meta.assets %>images/**'],
        tasks: ['copy:images']
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= meta.build %>images/',
          src: '**/*.{png,jpg,gif}',
          dest: '<%= meta.build %>images/'
        }]
      }
    },
    cssmin: {
      options: {
        advanced: false,
        keepSpecialComments: false,
        compatibility: 'ie8'
      },
      compress: {
        files: [{
          '<%= meta.build %>css/libs.css': '<%= meta.build %>css/libs.css',
          '<%= meta.build %>css/style.css': '<%= meta.build %>css/style.css',
          '<%= meta.build %>css/print.css': '<%= meta.build %>css/print.css'
        }]
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        compress: true,
        beautify: false,
        preserveComments: false
      },
      dist: {
        files: [{
          '<%= meta.build %>js/modernizr.js': ['<%= meta.scripts %>libs/modernizr.2.8.3.js','<%= meta.scripts %>libs/detectizr.js'],
          '<%= meta.build %>js/libs.js': ['<%= meta.scripts %>libs/jquery-2.1.4.js', '<%= meta.scripts %>libs/handlebars-v3.0.3.js', '<%= meta.scripts %>libs/angular.js', '<%= meta.scripts %>libs/plugins/*.js'],
          '<%= meta.build %>js/l10n.js': '<%= meta.scripts %>l10n.js',
          '<%= meta.build %>js/script.js': ['<%= meta.scripts %>site.js', '<%= meta.scripts %>app.module.js', '<%= meta.scripts %>plugins/*.js', '<%= meta.scripts %>components/*.js', '<%= meta.scripts %>controllers/*.js']
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 3 versions']
      },
      files: {
        expand: true,
        src: '<%= meta.build %>css/*.css'
      }
    },
    markdownpdf: {
      files: {
        src: ['<%= meta.doc %>/*.md'],
        dest: '<%= meta.doc %>'
      }
    },
    nodemon: {
      dev: {
        options: {
          ignore: ['node_modules/**', '<%= meta.scripts %>**'],
          ext: 'js',
          watch: ['server'],
          delay: 1
        },
        script: 'app/server.js'
      }
    },
    concurrent: {
      options: {
        limit: 2
      },
      dev: {
        options: {
          logConcurrentOutput: true
        },
        tasks: ['nodemon', 'watch']
      }
    },
    qunit: {
      all: ['test/**/*.html']
    },
    clean: {
      options: {
        force: true
      },
      build: ['static']
    },
    'gh-pages': {
      options: {
        base: '<%= meta.build %>'
      },
      src: ['**']
    },
    phantomcss: testCssRegression
  });
  grunt.file.expand('./node_modules/grunt-*/tasks').forEach(grunt.loadTasks);
  require('time-grunt')(grunt);
  grunt.registerTask('build', ['clean', 'concat', 'less', 'jadelint', 'jade', 'copy', 'autoprefixer', 'htmlhint', 'jscs', 'jshint', 'csslint']);
  grunt.registerTask('default', ['build', 'concurrent']);
  grunt.registerTask('qunittest', ['jscs', 'jshint', 'qunit']);
  grunt.registerTask('csstest', ['phantomcss']);
  grunt.registerTask('doc', ['markdownpdf']);
  grunt.registerTask('release', ['build', 'qunittest', 'uglify', 'imagemin', 'cssmin', 'gh-pages']);
};
