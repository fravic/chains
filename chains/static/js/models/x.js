var app = app || {};

$(function($) {
    'use strict';

    app.X = Backbone.Model.extend({
        initialize: function(a) {
            this.date = a["date"];
        },
    });
});
