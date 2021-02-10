from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from myapp.models import EmployeeDetails, EmployeeDesignation
from myapp.serializers import EmployeeSerializer
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from utills import pagination
from utills.pagination import Pagination


@csrf_exempt
@api_view(['POST'])
def save_employee(request):
    data = request.data
    err = validate(data)
    emp_role_id = data.get('empRole')
    if err:
        return Response({'msg':err}, 500)
    designation = EmployeeDesignation.objects.get(id=emp_role_id)
    employee = EmployeeDetails()
    employee.empId = data.get('empId')
    employee.name = data.get('name')
    employee.empNumber = data.get('empNumber')
    employee.email = data.get('email')
    employee.empRole = designation
    employee.password = data.get('password')
    employee.save()
    return Response({'msg': 'Success'}, 200)


@api_view(['GET'])
def index(request):
    data = EmployeeDetails.objects.select_related('empRole').all()[0:10]
    data = Pagination(EmployeeDetails, request.GET, EmployeeSerializer).paginate()
    return Response(data)


@api_view(['DELETE'])
def delete_employee(request):
    emp_id = request.query_params.get('employeeId')
    data = EmployeeDetails.objects.get(empId=emp_id)
    data.delete()
    return Response({'message': 'deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT'])
def update(request):
    data = request.data
    err = validate_update(data)
    emp_role_id = data.get('empRole')
    if err:
        return Response({'msg': err}, 500)
    designation = EmployeeDesignation.objects.get(id=emp_role_id)
    emp_id = data.get('empId')
    instance = EmployeeDetails.objects.get(empId=emp_id)
    instance.name = data.get('name', instance.name)
    instance.empId = data.get('empId', instance.empId)
    instance.empNumber = data.get('empNumber', instance.empNumber)
    instance.empRole = designation
    instance.email = data.get('email', instance.email)
    instance.save()
    return Response('Success', 200)


@api_view(['GET'])
def employee_details(request):
    emp_id = request.query_params.get('employeeId')
    data = EmployeeDetails.objects.get(empId=emp_id)
    serializer_data = EmployeeSerializer(data)
    return Response(serializer_data.data, 200)


def validate(data):
    fields = ['name', 'email', 'empId', 'empNumber']
    for field in fields:
        query = {}
        query[field] = data.get(field)
        if EmployeeDetails.objects.filter(**query).exists():
            return field + " already exists"


def validate_update(data):
    fields = ['name','email','empNumber']
    for field in fields:
        query = {}
        query[field] = data.get(field)
        if EmployeeDetails.objects.filter(**query).exists():
            return field + "already exists"


@api_view(['GET'])
def search(request):
    search_string = request.query_params.get('searchString')
    emp_details = EmployeeDetails.objects.filter(name__icontains=search_string)
    serializer_data = EmployeeSerializer(emp_details, many=True)
    return Response(serializer_data.data, 200)


@api_view(['GET'])
def search_id(request):
    search_id = request.query_params.get('searchId')
    emp_details = EmployeeDetails.objects.filter(empId__contains=search_id)
    serializer_data = EmployeeSerializer(emp_details, many=True)
    return Response(serializer_data.data, 200)


@api_view(['GET'])
def employee_designation(request):
    emp_designation = EmployeeDesignation.objects.all().values()
    return Response(emp_designation)
