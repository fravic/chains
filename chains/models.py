from django.db.models.signals import post_save
from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
        user = models.OneToOneField(User)
        customer_id = models.CharField(max_length=256)

def create_profile(sender, **kw):
    user = kw["instance"]
    if kw["created"]:
        profile = UserProfile()
        profile.user = user
        profile.save()

post_save.connect(create_profile, sender=User)

class Chain(models.Model):
    name = models.CharField(max_length=255)
    stakes = models.PositiveIntegerField()
    referee_email = models.EmailField()
    # desc
    # skip

    def __unicode__(self):
        return self.name

class X(models.Model):
    chain = models.ForeignKey(Chain)
    day = models.DateField()
