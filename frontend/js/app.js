var app = app || {};

$(function($) {
    'use strict';

    var view;

    $(document).on("webworksready", function() {
        var ele = document.createElement("div");
        ele.innerHTML = "uuid: " + blackberry.identity.uuid;
        document.documentElement.appendChild(ele);
        console.log("initbb");
    });
    
    view = new app.AppView({
    });
});
