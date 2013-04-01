var app = app || {};

$(function($) {
    'use strict';

    var chainSet, view;

    app.NewChainView = Backbone.View.extend({
        initialize: function(a) {
            _.bindAll(this);
            this.delegate = a["delegate"];
            $("#btnSubmitNewChain").click(function() {
                console.log("what");
                $("#new_chain form").submit();
            });
            $("#new_chain form").submit(this.onSubmit);
        },
        
        onSubmit: function() {
                console.log("wut");

            var name, verifier, stakes, form;
            form = $("#new_chain form");
            name = $("input[name='name']", form).val();
            verifier = $("input[name='verifier']", form).val();
            stakes = $("input[name='stakes']", form).val()
            this.delegate(name, verifier, stakes);

            bb.popScreen();
            this.remove();

            return false;
        }
    });
});
