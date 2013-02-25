var app = app || {};

$(function($) {
    'use strict';

    // Set up utilities
    app.utils = {
        SECONDS_PER_DAY: 86400,
        daysSinceEpoch: function() {
            var t = (new Date()).getTime();
            return Math.floor(t / this.SECONDS_PER_DAY);
        }
    }

    var chainSet, view;

    document.addEventListener("webworksready", function() {
        var ele = document.createElement("div");
        ele.innerHTML = "uuid: " + blackberry.identity.uuid;
        document.documentElement.appendChild(ele);
    }, false);
    
    chainSet = new app.ChainSet([
        {name: "Go to the Gym", pay: 1, complete:{}}
    ]);

    view = new app.ChainsView({
        set: chainSet
    });
});
