var app = app || {};

$(function($) {
    'use strict';

    var chainSet, view;

    document.addEventListener("webworksready", function() {
        var ele = document.createElement("div");
        ele.innerHTML = "uuid: " + blackberry.identity.uuid;
        document.documentElement.appendChild(ele);
    }, false);
    
    chainSet = new app.ChainSet([
        {name: "Go to the Gym", pay: 1}
    ]);

    view = new app.ChainsView({
        set: chainSet
    });
});
