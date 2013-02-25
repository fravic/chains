from django.contrib import admin

from chains.models import Chain, X

class XInline(admin.StackedInline):
    model = X

class ChainAdmin(admin.ModelAdmin):
    inlines = [XInline,]

admin.site.register(Chain, ChainAdmin)
