from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.models import User
from django.conf import settings

import stripe

from chains.models import Chain


def charge(request, image_id, template_name="charge.html"):
    chain = Chain.objects.get(pk=5)

    stripe.api_key = settings.STRIPE_SECRET_KEY

    stripe.Charge.create(
        amount=int(chain.stakes * 100), # in cents
        currency="cad",
        customer=User.objects.get(pk=3).get_profile().customer_id,
    )

    context = {}

    return render_to_response(
        template_name,
        context,
        context_instance = RequestContext(request)
    )


