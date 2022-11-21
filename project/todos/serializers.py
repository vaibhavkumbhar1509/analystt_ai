from rest_framework import serializers
from .models import TodoDB

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoDB
        fields = '__all__'