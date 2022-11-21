from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import TodoDB

# Create your views here.




class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = TodoDB.objects.all()