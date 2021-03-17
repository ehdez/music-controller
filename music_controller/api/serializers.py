from rest_framework import serializers
from .models import Room

#Serializers define the API representation
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'