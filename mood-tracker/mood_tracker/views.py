from django.views.generic.base import TemplateView

class BaseView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(BaseView, self).get_context_data(**kwargs)
        return context
