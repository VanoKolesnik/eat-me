from order.models import Order
from rest_framework import serializers
from menu.models import Dish

class DishListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = '__all__'

class DishNameListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ['name',]

class OrderSerializer(serializers.HyperlinkedModelSerializer):
    orderList = DishListSerializer(many=True)
    order_list = DishNameListSerializer(many=True)
    class Meta:
        model = Order
        fields = ['id', 'name', 'surname', 'customerPhone', 'paymentMethod', 'orderTime', 'orderList', 'get_cost', 'order_list']


