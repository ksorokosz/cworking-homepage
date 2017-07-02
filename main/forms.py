# -*- coding: utf-8 -*- 
# Reference:
#  http://johnparsons.net/index.php/2013/06/28/creating-profiles-with-django-registration/

from __future__ import unicode_literals

from django import forms
from django.contrib.auth.models import User
import datetime, sys
from django.utils.translation import ugettext_lazy as _

class ContactForm(forms.Form):
    first_name = forms.CharField(required=True, label=_("First Name"), )
    last_name = forms.CharField(required=True, label=_("Last Name"), )
    email = forms.CharField(required=True, label=_("Email"), )
    subject = forms.CharField(required=True, label=_("Subject"), )    
    content = forms.CharField(required=True, widget=forms.Textarea, label=_("Message"),)
