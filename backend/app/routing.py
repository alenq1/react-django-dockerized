# websocket endpoint for client 

from django.urls import path
from django.conf.urls import url
from . import wsconsumer

websocket_urlpatterns = [
    url('ws/test', wsconsumer.TestConsumer),
]

