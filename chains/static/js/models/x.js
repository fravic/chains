var app = app || {};

$(function($) {
    'use strict';

    app.X = Backbone.RelationalModel.extend({
        idAttribute: 'id',
        url: '/api/v1/x/',

        initialize: function(a) {
            this.day = a["day"];
            this.chain = a["chain"];
        },
    });
});
