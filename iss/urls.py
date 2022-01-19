from django.urls import path

from iss import views

urlpatterns = [
    path('', views.iss, name='iss'),
]