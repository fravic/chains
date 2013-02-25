var app = app || {};

$(function($) {
    'use strict';

    app.Chain = Backbone.Model.extend({
        url: "/chain/", 
        initialize: function(a) {
            this.name = a["name"];
            this.pay = a["pay"];
            this.completeDays = a["complete"];
        },

        isDayComplete: function(d) {
            return this.completeDays[d];
        }
    });
});
