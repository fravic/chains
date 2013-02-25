from tastypie.authorization import Authorization
from tastypie.resources import ModelResource, fields

from chains.models import Chain, X

class XResource(ModelResource):
    class Meta:
        queryset = X.objects.all()
        authorization = Authorization()

class ChainResource(ModelResource):
    xs = fields.ToManyField(XResource, 'x_set', full=True,)

    class Meta:
        queryset = Chain.objects.all()
        allowed_methods = ('post', 'get', 'put')
        authorization = Authorization()