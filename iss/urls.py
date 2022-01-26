from django.urls import path

from iss import views

urlpatterns = [
    path('', views.iss, name='iss'),
    path('iss', views.getISS, name='getISS'),
]