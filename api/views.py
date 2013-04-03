from django.conf import settings
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django import forms
from django.core.mail import EmailMessage

from tokenapi.http import JsonResponse

from chains.models import Image, Chain

import stripe

class ImageForm(forms.ModelForm):
    class Meta:
        model = Image

def upload(request):
    form = ImageForm(request.POST, request.FILES)

    if form.is_valid():
        image = form.save()

        chain = Chain.objects.get(pk=1)

        # Upload successful, send referee email
        msg = EmailMessage("Verify your friend\'s progress!", "Hello! <p>Your friend has recently uploaded a picture associated with his chain '%s'.</p> <p>Please verify that the picture proves \
            your friend is completing his chain. <img src='%s'> <p>If the image above does not verify your friend's chain, click <a href='%s'>here</a> to notify us. Remember that they will be charged $%s if you click the link." % (
            chain.name,
            image.image.url,
            'http://dontbreakthechain.herokuapp.com/charge/%s' % image.pk,
            chain.stakes,
        ), settings.EMAIL_HOST_USER, [chain.referee_email,])
        msg.content_subtype = "html"  # Main content is now text/html
        msg.send()

    return JsonResponse({})

def login_facebook(request):
    user_id = request.REQUEST.get('userID')

    try:
        user = User.objects.get(username=user_id)
    except User.DoesNotExist:
        user = User.objects.create_user(user_id, "", "G")

    return JsonResponse({'pk': user.pk, 'has_stripe': bool(user.get_profile().customer_id)})

def stripe_info(request):
    user = get_object_or_404(User, pk=request.REQUEST.get('pk'))

    stripe_token = request.REQUEST.get('stripe_token')

    stripe.api_key = settings.STRIPE_SECRET_KEY

    if stripe_token:
        customer = stripe.Customer.create(
            card=stripe_token,
            description="broke the chain",
        )

        user.get_profile().customer_id = customer.id
        user.get_profile().save()

    return JsonResponse({})
