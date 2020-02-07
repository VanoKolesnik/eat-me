from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from order.models import Order
from .serializers import OrderSerializer

class OrderList(APIView):

    def get(self, request, format=None):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)