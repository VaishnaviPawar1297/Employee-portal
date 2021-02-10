from django.urls import path, re_path
from . import views
urlpatterns = [
    path('', views.index, name='index'),
    path('save-employee', views.save_employee, name='save-employee'),
    # path('delete-employee/?P<emp_id>$', views.delete_employee, name='delete-employee'),
    path('delete-employee', views.delete_employee),
    path('update', views.update, name='update'),
    re_path('employee-details', views.employee_details),
    path('search', views.search, name='search'),
    path('searchId', views.search_id, name='searchId'),
    path('get_designations', views.employee_designation)
]
