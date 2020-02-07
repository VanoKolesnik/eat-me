from django.urls import path, include
from . import views


urlpatterns = [
    path('accounts/', views.AccountList.as_view(), name='accounts'),
    path('fast-costumers/', views.FastCostumerList.as_view(), name='fast-costumers'),
]