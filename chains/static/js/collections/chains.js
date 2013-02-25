var app = app || {};

$(function($) {
    'use strict';

    app.ChainSet = Backbone.Collection.extend({
        model: app.Chain,
        url: '/api/v1/chain',
    });
});
