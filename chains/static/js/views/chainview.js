var app = app || {};

$(function($) {
    'use strict';

    app.ChainsView = Backbone.View.extend({
        NUM_CIRCLES_TO_DISPLAY: 6,

        initialize: function(a) {
            _.bindAll(this);

            this.set = a["set"];
            this.set.on("add", this.addChain);
            this.set.on("remove", this.removeChain);
            _.each(this.set.models, this.addChain);
            
            $("#btn_new").on("click", this.btnNewChain);
        },

        addChain: function(chain, idx) {
            var newChain, today;

            newChain = $(".chain.template").clone();
            newChain.removeClass("template");
            $(".name", newChain).html(chain.name);
            $(".pay", newChain).html("$" + chain.pay);

            today = app.utils.daysSinceEpoch();
            for (var d = today; d >= today - this.NUM_CIRCLES_TO_DISPLAY; d--) {
                this.addCircle(newChain, chain, d);
            }

            $("#chains").append(newChain);
        },

        removeChain: function(chain) {
            $("#chains .chain").remove();
        },

        btnNewChain: function() {
            $("#new_chain").show();
            $("#new_chain input[type='submit']").click(this.createNewChain);
        },

        createNewChain: function() {
            var c = new app.Chain({
                name: $("#name").val(),
                pay: $("#pay").val()
            });
            c.save();
        },

        addCircle: function(e, chain, d) {
            var newCircle = $("<DIV>");
            newCircle.addClass("circle");
            if (chain.isDayComplete(d)) {
                newCircle.addClass("complete");
            }
            $(".circles", e).append(newCircle);
        }
    });
});
