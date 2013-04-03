from django.shortcuts import get_object_or_404
from django.shortcuts import render_to_response
from django.template import RequestContext

from chains.models import Chain

def chain(request, pk, template_name="chain.html"):
    chain = get_object_or_404(Chain, pk=pk)

    context = {'chain': chain,}

    return render_to_response(
        template_name,
        context,
        context_instance = RequestContext(request)
    )


