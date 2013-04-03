var app = app || {};

$(function($) {
    'use strict';

    app.X = Backbone.RelationalModel.extend({
        idAttribute: 'id',
        url: 'http://dontbreakthechain.herokuapp.com/api/v1/x/',

        initialize: function(a) {
            this.day = a["day"];
            this.chain = a["chain"];
        },
    });
});
