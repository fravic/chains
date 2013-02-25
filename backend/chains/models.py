from django.db import models

class Chain(models.Model):
    name = models.CharField(max_length=255)

class X(models.Model):
    chain = models.ForeignKey(Chain)
    day = models.DateField()
