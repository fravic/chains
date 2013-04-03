from django.conf.urls.defaults import patterns, include, url

from tastypie.api import Api

from api.resources import ChainResource, XResource


v1_api = Api(api_name='v1')
v1_api.register(ChainResource())
v1_api.register(XResource())

urlpatterns = patterns('api.views',
    url(r'^v1/login/facebook/$', 'login_facebook', name='api_login_facebook'),
    url(r'^v1/stripe/info/$', 'stripe_info', name='api_stripe_info'),
    (r'', include(v1_api.urls)),
)
