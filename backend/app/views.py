from django.shortcuts import render, HttpResponse
from django.urls import reverse_lazy
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination
from rest_framework import status
from .requests import get_api_data


# Create your views here.

class TestApi(APIView):

    def get(self, request, *args, **kwargs):

        print(request, "REQUEST DESDE EL BROWSER")
        
        try:
            response = get_api_data()
            return Response(response, status=status.HTTP_200_OK)

        except:
            return Response('error on request', status=status.HTTP_503_SERVICE_UNAVAILABLE)


    def post(self, request, *args, **kwargs):
        
        #print(request.data, "REQUEST DATA")
        
        #resp = get_site_content(page_to_scrap, keyword=request.data['keyword'])
        
        return Response('OK', status=status.HTTP_200_OK)

