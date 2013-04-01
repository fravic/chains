var app = app || {};

$(function($) {
    'use strict';

    var chainSet, view;

    app.PaymentInfoView = Backbone.View.extend({
        initialize: function(a) {
            _.bindAll(this);

            Stripe.setPublishableKey('pk_test_5CgaiRIGe5DpJcVKsm4AHYKf');
            var self = this;

            $('#submit-payment-info').click(function() {
                $('#payment-form').submit();
            });

            $('#payment-form').submit(function(event) {
                var $form = $(this);

                // Disable the submit button to prevent repeated clicks
                $form.find('button').prop('disabled', true);

                Stripe.createToken($form, self.stripeResponseHandler);

                // Prevent the form from submitting with the default action
                return false;
            });
        },
        
        stripeResponseHandler: function(status, response) {
            app.nav.showChains();
        }
    });
});
