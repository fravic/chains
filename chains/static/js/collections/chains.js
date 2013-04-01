var app = app || {};

$(function($) {
    'use strict';

    app.ChainSet = Backbone.Collection.extend({
        model: app.Chain,
        url: 'http://dontbreakthechain.herokuapp.com/api/v1/chain',
    });
});
