var app = app || {};

$(function($) {
    'use strict';

    var chainSet, view;

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
            var newChain;

            newChain = $(".chain.template").clone();
            newChain.removeClass("template");
            $(".name", newChain).html(chain.name);
            $(".stakes", newChain).html("$" + chain.stakes);

            _(this.NUM_CIRCLES_TO_DISPLAY).times(_.bind(function(d) {
                this.addCircle(newChain, chain, Date.today().add(-d).days());
            }, this));

            $("#chains").append(newChain);
        },

        removeChain: function(chain) {
            $("#chains .chain").remove();
        },

        btnNewChain: function() {
            bb.pushScreen("newchain.html", "newchain");
        },

        createNewChain: function(name, verifier, stakes) {
            var c, form;

            form = $("#new_chain form");
            c = new app.Chain({
                name: name,
                stakes: stakes,
                referee_email: verifier
            });
            this.set.add(c);
            c.save();

            return false;
        },

        addCircle: function(e, chain, d) {
            var newCircle = $("<DIV>");
            newCircle.addClass("circle");
            if (chain.isDayComplete(d)) {
                newCircle.addClass("complete");
            }
            newCircle.data("chain", chain);
            newCircle.data("day", d);
            newCircle.click(this.markX);
            $(".circles", e).append(newCircle);
            
            var span = $("<DIV>");
            span.html(d.toString("ddd"));
            span.css({fontWeight:"bold"});
            newCircle.append(span);
            newCircle.append(d.toString("M/d"));
        },

        markX: function(e) {
            var chain, circle, d;
            circle = $(e.target);
            chain = circle.data("chain");
            circle.toggleClass("complete");
            d = circle.data("day");
            chain.toggleDayComplete(d);
            
            if (chain.isDayComplete(d)) {
                bb.pushScreen('proof.html', 'proof');
            }
        },
    });
});
