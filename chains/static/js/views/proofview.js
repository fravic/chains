var app = app || {};

$(function($) {
    'use strict';

    app.ProofView = Backbone.View.extend({
        initialize: function(a) {
            _.bindAll(this);

            takePicture();

            document.getElementById('upload').addEventListener('click', this.upload, false);
        },

        upload: function() {
            bb.popScreen();
            this.remove();
        },
    });
});
