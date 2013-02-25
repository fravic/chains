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
                var xdate = new Date(xd.day).clearTime();
                return xdate.equals(d);
            });
        },

        toggleDayComplete: function(d) {
            /* TODO: MAKE THIS WORK
            var x;
            if (x = this.isDayComplete(d)) {
                this.xs.remove(x);
            } else {
                x = {id: 2, day: d.toString("yyyy-MM-dd")};
                this.xs.push(x);
                this.save();
            }*/
        },
    });
});
