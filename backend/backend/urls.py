"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
from django.contrib import admin
from django.urls import path, include, re_path
from backend.apiroutes import router


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    
]


## FOR HEROKU DEPLOY
if os.environ['HEROKU_DEPLOY'] == 'Y':
    from django.views.generic import TemplateView
    from django.conf import settings
    from django.conf.urls.static import static
    urlpatterns.append(re_path('.*', TemplateView.as_view(template_name="index.html"), name="home"))
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
