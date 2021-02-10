from rest_framework import serializers
from rest_framework.serializers import Serializer, ModelSerializer

from myapp.models import EmployeeDetails, EmployeeDesignation


class DesignationSerializer(ModelSerializer):

    class Meta:
        model = EmployeeDesignation
        fields = '__all__'


class EmployeeSerializer(ModelSerializer):
    designation_name = serializers.CharField(source="empRole.designation")

    class Meta:
        model = EmployeeDetails
        fields = '__all__'
