from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

from chains.models import Chain, X, UserProfile, Image

admin.site.unregister(User)

class UserProfileInline(admin.StackedInline):
    model = UserProfile

class UserProfileAdmin(UserAdmin):
    inlines = [UserProfileInline]

admin.site.register(User, UserProfileAdmin)

class XInline(admin.StackedInline):
    model = X

class ChainAdmin(admin.ModelAdmin):
    inlines = [XInline,]

class ImageAdmin(admin.ModelAdmin):
    model = Image

admin.site.register(Chain, ChainAdmin)
