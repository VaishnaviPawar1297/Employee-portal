from django.db import models


class EmployeeDesignation(models.Model):
    designation = models.CharField(max_length=100)


class EmployeeDetails(models.Model):
    name = models.CharField(max_length=20, unique=True)
    email = models.EmailField(max_length=254, unique=True)
    empId = models.CharField(max_length=6, unique=True)
    empNumber = models.CharField(max_length=10, unique=True)
    empRole = models.ForeignKey(EmployeeDesignation, on_delete=models.DO_NOTHING)
    password = models.CharField(max_length=256)

