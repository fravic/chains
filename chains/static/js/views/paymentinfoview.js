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
            var $form = $('#payment-form');

            if (response.error) {
                // Show the errors on the form
                $form.find('.payment-errors').text(response.error.message);
                $form.find('button').prop('disabled', false);
                app.nav.showChains();
            } else {
                // token contains id, last4, and card type
                var token = response.id;
                // Insert the token into the form so it gets submitted to the server
                $form.append($('<input type="hidden" name="stripeToken" />').val(token));
                console.log(token);
                // and submit
//                $form.get(0).submit();

                app.nav.showChains();
            }
        }
    });
});
