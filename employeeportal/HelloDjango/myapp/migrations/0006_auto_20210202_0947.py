# Generated by Django 2.2.4 on 2021-02-02 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0005_auto_20210201_0633'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employeedetails',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='employeedetails',
            name='empId',
            field=models.CharField(max_length=6, unique=True),
        ),
        migrations.AlterField(
            model_name='employeedetails',
            name='empNUmber',
            field=models.CharField(max_length=10, unique=True),
        ),
        migrations.AlterField(
            model_name='employeedetails',
            name='name',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]