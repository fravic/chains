var app = app || {};

$(function($) {
    'use strict';

    app.Chain = Backbone.Model.extend({
        initialize: function(a) {
            this.name = a["name"];
            this.stakes = a["stakes"];
            this.xs = a["xs"];
            this.referee_email = a["referee_email"];
        },

        isDayComplete: function(d) {
            return _.find(this.xs, function(xd) {
                var xdate = new Date(xd.day);
                xdate.setHours(0, 0, 0, 0); // Want date without time
                return xdate.getTime() == d.getTime();
            });
        }
    });
});
