var app = app || {};

$(function($) {
    'use strict';

    app.Chain = Backbone.Model.extend({
        initialize: function(a) {
            this.name = a["name"];
            this.stakes = a["stakes"];
            this.xs = a["xs"];
            this.referee_email = a["referee_email"];

            if (!this.xs) {
                this.xs = [];
            }
        },

        isDayComplete: function(d) {
            return true; // TODO: Change this
        }
    });
});
