from django.shortcuts import render

# Create your views here.
def iss(request):
    return render(request, 'iss.html')