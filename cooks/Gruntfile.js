'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('assemble-less');
grunt.initConfig({
    uglify: {
        all : {
            options: {
                preserveComments: 'some',
                mangle: {
                    except: [ "undefined" ]
                }
            },
            files: {
                'dist/footable.min.js': [ 'js/footable.js' ],
                'dist/footable.filter.min.js': [ 'js/footable.filter.js' ],
                'dist/footable.paginate.min.js': [ 'js/footable.paginate.js' ],
                'dist/footable.sort.min.js': [ 'js/footable.sort.js' ],
                'dist/footable.striping.min.js': [ 'js/footable.striping.js' ],
                'dist/footable.bookmarkable.min.js': [ 'js/footable.bookmarkable.js' ]
            }
        }
    },

    concat: {
        
        indexJs: {
           
            src: ['js/jquery.js','js/jquery.easing.min.js','js/supersized.3.2.7.js','js/supersized.shutter.js','js/superized-custom.js','js/custom.js'],
            dest: 'js/index.js'
        },

        indexCss: {
            src: ['css/reset.css','css/layout.css','css/supersized.css','css/supersized.shutter.css','css/menu.css','css/style.css','css/font-awesome.css','css/responsive.css'],
            dest: 'css/index.css'
        },

        footmenuJs: {
              
            src: ['js/jquery.js','js/jquery.easing.min.js','js/jquery.isotope.min.js','js/jquery.prettyPhoto.js','js/custom.js'],
            dest: 'js/footmenu.js'
        },

        footmenuCss: {
            src: ['css/reset.css','css/layout.css',"css/menu.css",'css/Isotope.css',"css/owl.carousel.css","css/prettyPhoto.css",'css/style.css','css/font-awesome.css','css/responsive.css'],
            dest: 'css/footmenu.css'
        },
        contactJs: {
            
         
            src: ['js/jquery.js','js/jquery.easing.min.js','js/contact_page.js','js/custom.js'],
            dest: 'js/contact_page.js'
        },



        specialCss: {
            src: ['css/reset.css','css/layout.css','css/menu.css','css/font-awesome.css',"css/owl.carousel.css","css/Isotope.css",
            "css/prettyPhoto.css","css/dtpicker.min.css",'css/style.css','css/responsive.css'],
            dest: 'css/special.css'
        },


          specialJs: {
            
        
       
            src: ['js/jquery.js','js/jquery.easing.min.js','js/owl.carousel.js','js/jquery.prettyPhoto.js',"js/dtpicker.js","js/contact.js","js/custom.js"],
            dest: 'js/special.js'
        },

        contactCss: {
            src: ['css/reset.css','css/layout.css','css/menu.css','css/style.css','css/font-awesome.css','css/responsive.css'],
            dest: 'css/concat.css'
        },

          blogCss: {
            src: ['css/reset.css','css/layout.css','css/menu.css','css/font-awesome.css',"css/blog.css",
            'css/style.css','css/responsive.css'],
            dest: 'css/blog_page.css'
        },


          blogJs: {
            
          
            src: ['js/jquery.js','js/jquery.easing.min.js','js/custom.js'],
            dest: 'js/blog.js'
        }
       
    },

    less: {

        components: {
            options: {
                paths: ['lesses'],
                imports: {
                    // Use the new "reference" directive, e.g.
                    // @import (reference) "variables.less";
                    reference: [
                        "bs_variables.less"

                    ]
                }
            },
            files:
                {"css/index/index.css":["css/index/index.less"]}

            }

    },
    processhtml: {
        dist: {
            options: {
                includeBase:'.',
                data: {
                    message: 'This is development environment'
                }
            },
            files: {
                "../application/views/index/index.phtml": ['../application/views/index/index.phtml']
            }
        }
    },
//    jshint: {
//        options: {
//            curly: true,
//            eqeqeq: false,
//            eqnull: true,
//            browser: true,
//            globals: {
//                jQuery: true
//            },
//            eqeq:false
//
//        },
//        dev: {
//            src: ['js/common/header.js']
//        }
//    },
    watch: {
        // gruntfile: {
        //     files: '<%= jshint.gruntfile.src %>',
        //     tasks: ['jshint:gruntfile']
        // },
        // src: {
        //     files: '<%= jshint.src.src %>',
        //     tasks: ['jshint:src']
        // },
        // less: {
        //     files: 'less/*.less',
        //     tasks: ['less:development']
        // },
        // csslint: {
        //     files: 'css/*.css',
        //     tasks: ['csslint']
        // },
        // //加参数运行--debug,-vv可以看到检测的文件

        client: {
                files: ['../application/views/{*,/*,/*/*}.phtml',

                'admin/{*,/*,/*/*,/*/*/*}.{html,js,css}',
                'js/{*,/*,/*/*}.{js,html}','css/{*,/*,/*/*}.{css,less}'],
              //  tasks: ['jshint'],
                options: {
                        livereload:true
//                    livereload: {
//                        port: 35729
//                        key: grunt.file.read('/Users/chjade/niuspace.com.key'),
//                       cert: grunt.file.read('/Users/chjade/niuspace.com.cert')
//                    }
                }
        }
    }

});




    // 自定义任务
    grunt.registerTask('live', ['watch']);
    grunt.registerTask('html', ['processhtml']);
   // grunt.loadNpmTasks('grunt-contrib-csslint');
  //  grunt.loadNpmTasks('grunt-contrib-jshint');
   // grunt.task.registerTask('default', ['concat']);
};