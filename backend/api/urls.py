from django.conf.urls.defaults import patterns, include

from tastypie.api import Api

from api.resources import ChainResource


v1_api = Api(api_name='v1')
v1_api.register(ChainResource())

urlpatterns = patterns('api.views',
    (r'', include(v1_api.urls)),
)
