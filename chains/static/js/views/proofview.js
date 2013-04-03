var app = app || {};

$(function($) {
    'use strict';

    app.ProofView = Backbone.View.extend({
        initialize: function(a) {
            _.bindAll(this);

            document.getElementById('picture').addEventListener('change', this.findPhoto, false);
            document.getElementById('upload').addEventListener('click', this.upload, false);
        },

        findPhoto: function(evt) {
            this.file = evt.target.value; // FileList object
            // Loop through all Images
            if (this.file)
                var reader = new FileReader();
                // Closure to capture the file information.
                reader.onload = (function(theFile) {
                    return function(e) {
                        // Display Image
                        document.getElementById('list').innerHTML = ['<img class="imageDisp" src="', e.target.result,
                                                                     '" title="', escape(theFile.name), '"width="280" height="440"/>'].join('');//Modify Image size as needed
                    };
                })(this.file);
                // Read in the image file as a data URL.           
                reader.readAsDataURL(this.file);
            }
        },

        upload: function() {
            // Source: https://github.com/blackberry/BB10-WebWorks-Samples/blob/master/camera/app/index.html
            var url = 'http://dontbreakthechain.herokuapp.com/api/v1/upload/';//Place server ip here NOTE: Keep the port and folder consistant with server :8080/upload
            //Check if user has taken a picture
            if (this.file){
                //Create form and append picutre
                var formData = new FormData();
                formData.append('image', this.file);
                //initiate and send via XHR2
                var xhr = new XMLHttpRequest();
                xhr.open('POST', url, false);
                xhr.onload = function(e) {
                };
                //Upload Image
                xhr.send(formData);  // multipart/form-data
                alert(xhr.responseText);
            }
            else{
                alert("No Picture to Upload");
            }

            bb.popScreen();
            this.remove();
        }
    });
});
