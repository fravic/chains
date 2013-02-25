var app = app || {};

$(function($) {
    'use strict';

    app.ChainsView = Backbone.View.extend({
        NUM_CIRCLES_TO_DISPLAY: 7,

        initialize: function(a) {
            _.bindAll(this);

            this.set = a["set"];
            this.set.on("add", this.addChain);
            this.set.on("remove", this.removeChain);
            this.set.fetch({success: this.chainsFetched});
            
            $("#btn_new").on("click", this.btnNewChain);
        },

        chainsFetched: function() {
            this.set.map(this.addChain);
        },

        addChain: function(chain) {
            var newChain, today;

            newChain = $(".chain.template").clone();
            newChain.removeClass("template");
            $(".name", newChain).html(chain.name);
            $(".stakes", newChain).html("$" + chain.stakes);

            today = new Date();
            today.setHours(0, 0, 0, 0); // Want date without time
            _(this.NUM_CIRCLES_TO_DISPLAY).times(_.bind(function(d) {
                today.setDate(today.getDate() - 1);
                this.addCircle(newChain, chain, today);
            }, this));

            $("#chains").append(newChain);
        },

        removeChain: function(chain) {
            $("#chains .chain").remove();
        },

        btnNewChain: function() {
            $("#new_chain").show();
            $("#new_chain form").submit(this.createNewChain);
        },

        createNewChain: function(e) {
            var c, form;

            form = $("#new_chain form");
            c = new app.Chain({
                name: $("input[name='name']", form).val(),
                stakes: $("input[name='stakes']", form).val()
            });
            this.set.add(c);
            c.save();

            $("#new_chain").fadeOut();
            e.preventDefault();
            return false;
        },

        addCircle: function(e, chain, d) {
            var newCircle = $("<DIV>");
            newCircle.addClass("circle");
            if (chain.isDayComplete(d)) {
                newCircle.addClass("complete");
            }
            $(".circles", e).append(newCircle);
        },

        markX: function(e) {
        },
    });
});
