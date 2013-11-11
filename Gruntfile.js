module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    manifest: grunt.file.readJSON('src/manifest.json'),

    crx: {
      bigBadImage: {
        "src": "src/",
        "dest": "build/big-bad-image.crx",
        // "baseURL": "http://my.app.net/files/",
        "exclude": [ ".git", ".svn" ],
        "privateKey": "src.pem",
        "options": {
          "maxBuffer": 3000 * 1024 //build extension with a weight up to 3MB
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-crx');

  // Default task(s).
  grunt.registerTask('default', ['crx']);

};