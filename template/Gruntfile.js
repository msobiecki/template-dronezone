module.exports = function (grunt) {
  // load all grunt tasks
  require('grunt-task-loader')(grunt);
  require('time-grunt')(grunt);

  //lista zewnetrznych skryptów
  var vendorScripts = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/slick-carousel/slick/slick.min.js',
    'node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
    'node_modules/hammerjs/hammer.min.js',
    'node_modules/jquery-hammerjs/jquery.hammer.js',
    'node_modules/wicg-focus-ring/dist/focus-ring.js',
    'node_modules/jarallax/dist/jarallax.min.js',
  ];

  grunt.initConfig({
    uglify: {
      dist: {
        src: [vendorScripts, 'source/*.js', 'source/**/*.js', '!scripts/main.min.js'],
        dest: 'scripts/main.min.js'
      },
      dev: {
        src: [vendorScripts, 'source/*.js', 'source/**/*.js', '!scripts/main.min.js'],
        dest: 'scripts/main.min.js',
        options: {
          beautify: true,
          compress: false,
          mangle: false,
          sourceMap: true
        }
      }
    },
    sass: {
      dist: {
        options: {
          outputStyle: 'compressed',
          lineNumbers: false
        },
        files: [{
          expand: true,
          cwd: 'source',
          src: ['*.scss', '*.sass'],
          dest: 'css',
          ext: '.css'
        }]
      },
      dev: {
        options: {
          outputStyle: 'expanded',
          lineNumbers: true,
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: 'source',
          src: ['*.scss', '*.sass'],
          dest: 'css',
          ext: '.css'
        }]
      },
      tasks: ['autoprefixer']
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        src: 'css/main.css',
        dest: 'css/main.css'
      }
    },
    pug: {
      dev: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: [{
          expand: true,
          cwd: 'source',
          src: ['*.pug', '!_*.pug'],
          dest: '',
          ext: '.html'
        }]
      },
      dist: {
        options: {
          data: {
            debug: false
          },
          pretty: false
        },
        files: [{
          expand: true,
          cwd: 'source',
          src: ['*.pug', '!_*.pug'],
          dest: '',
          ext: '.html'
        }]
      }
    },
    connect: {
      all: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          keepalive: true,
          livereload: true
        }
      }
    },
    watch: {
      scripts: {
        files: ['!scripts/main.min.js', 'source/*.js', 'source/**/*.js',],
        tasks: ['uglify:dev'],
        options: {
          spawn: false
        }
      },
      sass: {
        files: ['source/*.sass', 'source/**/*.sass'],
        tasks: ['sass:dev', 'autoprefixer'],
        options: {
          spawn: false
        }
      },
      pug: {
        files: ['source/*.pug', 'source/**/*.pug'],
        tasks: ['pug:dev'],
        options: {
          spawn: false,
          pretty: true
        }
      },
      reload: {
        files: ['source/**/src/*', '*.html', 'scripts/*', 'css/*'],
        options: {
          livereload: true
        }
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      front: {
        tasks: ['watch:scripts', 'watch:sass', 'watch:pug', 'watch:reload', 'connect']
      },
      dev: {
        tasks: ['watch:scripts', 'watch:sass']
      }
    }
  });

  //grunt task developerski po wdrożeniu, kompilacja js i sass
  grunt.registerTask('default', ['concurrent:dev']);
  //grunt task generujący zminimalizowany kod na produkcję
  grunt.registerTask('build', ['uglify:dist', 'sass:dist']);
  //grunt task do przeznaczony do tworzenia szablonu, uruchamia live reload server
  grunt.registerTask('server', ['concurrent:front']);
};