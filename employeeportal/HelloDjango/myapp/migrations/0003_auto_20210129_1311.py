# Generated by Django 2.2.4 on 2021-01-29 13:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_auto_20210129_1236'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employeedetails',
            name='empNUmber',
            field=models.IntegerField(max_length=10),
        ),
    ]
