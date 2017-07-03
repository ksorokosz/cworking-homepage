# -*- coding: utf-8 -*-

import sys
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import permission_required
from django.shortcuts import get_object_or_404, render, redirect
from django.template import Context
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth import logout
from django.urls import reverse
from .forms import ContactForm
from django.core.mail import EmailMessage
from django.template import Context
from django.template.loader import get_template
from django.utils.translation import ugettext_lazy as _

# Create your views here.

# Main page of the service
def index(request):

    contact = ContactForm()
    context = { 'contact': contact }
    return render(request, 'main/index.html', context)

def blog(request):

    context = {}
    return render(request, 'main/blog.html', context)


def contact(request):

    # new logic!
    if request.method == 'POST':
        form = ContactForm(data=request.POST)

        if form.is_valid():
            
            contact_name = ' '.join([form.cleaned_data.get('first_name'), form.cleaned_data.get('last_name')])
            contact_email = form.cleaned_data.get('email')
            form_subject = form.cleaned_data.get('subject')
            form_content = form.cleaned_data.get('content')

            # Email the profile with the 
            # contact information
            template = get_template('main/contact_template.txt')
            context = Context({
                'contact_name': contact_name,
                'contact_email': contact_email,
                'form_content': form_content,
            })
            content = template.render(context)

            email = EmailMessage(
                form_subject,
                content,
                settings.SITE_URL,
                settings.RECIPIENTS_LIST,
                headers = {'Reply-To': contact_email }
            )
            email.send()
            return redirect(reverse('main:index'))

    return redirect('main:index')
