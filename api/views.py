from django.conf import settings
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from tokenapi.http import JsonResponse

import stripe

def login_facebook(request):
    return JsonResponse({
        'pk': 3,
        'has_stripe': False,
    })

def stripe_info(request):
    user = get_object_or_404(User, pk=request.POST.get('pk'))

    stripe_token = request.POST.get('stripe_token')

    stripe.api_key = settings.STRIPE_SECRET_KEY

    if stripe_token:
        customer = stripe.Customer.create(
            card=stripe_token,
            description=request.user.email,
        )

        user.get_profile().customer_id = customer.id
        user.get_profile().save()

    return JsonResponse({})

