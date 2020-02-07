from account.models import Account, FastCostumer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import AccountSerializer, FastCostumerSerializer


class FastCostumerList(APIView):

    def get(self, request, format=None):
        fastCostumers = FastCostumer.objects.all()
        serializer = FastCostumerSerializer(fastCostumers, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = FastCostumerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AccountList(APIView):

    def get(self, request, format=None):
        accounts = Account.objects.all()
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)