var app = app || {};

$(function($) {
    'use strict';

    app.ProofView = Backbone.View.extend({
        initialize: function(a) {
            _.bindAll(this);

            document.getElementById('picture').addEventListener('change', this.displayImage, false);
            document.getElementById('upload').addEventListener('click', this.upload, false);
        },

        displayImage: function(evt) {
            files = evt.target.files; // FileList object

            // Loop through all Images
            for (var i = 0, f; f = files[i]; i++) {
                var reader = new FileReader();
                // Closure to capture the file information.
                reader.onload = (function(theFile) {
                    return function(e) {
                        // Display Image
                        document.getElementById('photocontain').innerHTML = ['<img class="imageDisp" src="', e.target.result,
                                                                     '" title="', escape(theFile.name), '"width="280" height="440"/>'].join('');//Modify Image size as needed
                    };
                })(f);
                // Read in the image file as a data URL.           
                reader.readAsDataURL(f);
          }
        },

        upload: function() {
            bb.popScreen();
            this.remove();
        },
    });
});
