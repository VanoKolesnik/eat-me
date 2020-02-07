from django.urls import path, include
from . import views


urlpatterns = [
    path('orders/', views.OrderList.as_view(), name='order-list'),
]