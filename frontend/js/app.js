var app = app || {};

$(function($) {
    'use strict';

    var view;

    document.addEventListener("webworksready", function() {
        var ele = document.createElement("div");
        ele.innerHTML = "uuid: " + blackberry.identity.uuid;
        document.documentElement.appendChild(ele);
    }, false);
    
    view = new app.AppView({
    });
});
