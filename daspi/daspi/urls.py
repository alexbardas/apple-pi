from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'daspi.views.home', name='home'),
    url(r'^login/$', 'daspi.apps.checkins.views.login', name='login'),
    url(r'^api/', include('daspi.apps.api.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
