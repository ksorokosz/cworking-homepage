from django.conf.urls import include, url

from . import views
import sys

app_name = 'main'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^contact/$', views.contact, name='contact'),
    url(r'^blog/$', views.blog, name='blog'),
]
