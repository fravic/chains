var app = app || {};

$(function($) {
    'use strict';

    // Set up utilities
    app.utils = {
        SECONDS_PER_DAY: 86400,
    }

    var chainSet, view;

    document.addEventListener("webworksready", function() {
        var ele = document.createElement("div");
        ele.innerHTML = "uuid: " + blackberry.identity.uuid;
        document.documentElement.appendChild(ele);
    }, false);
    
    chainSet = new app.ChainSet;
    view = new app.ChainsView({
        set: chainSet
    });
});
