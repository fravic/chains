var app = app || {};

$(function($) {
    'use strict';

    app.Chain = Backbone.RelationalModel.extend({
        relations: [{
            type: Backbone.HasMany,
            key: 'xs',
            relatedModel: 'app.X',
            reverseRelation: {
                key: 'chain_id',
            }
        }],

        initialize: function(a) {
            this.name = a["name"];
            this.stakes = a["stakes"];
            this.xs = a["xs"];
            console.log(this.xs);
            this.referee_email = a["referee_email"];
        },

        isDayComplete: function(d) {
            return _.find(this.xs, function(xd) {
                var xdate = new Date(xd.day).clearTime();
                return xdate.equals(d);
            });
        },

        toggleDayComplete: function(d) {
            var x;
            if (x = this.isDayComplete(d)) {
                this.xs.remove(x);
            } else {
                x = new app.X({date: d.toString("yyyy-MM-dd"), chain: this.id});
                this.xs.push(x);
                x.save();
                this.save();
            }
        },
    });
});
