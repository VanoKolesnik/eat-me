from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from order.models import Order
from menu.models import Dish, Cuisine, Category, Institution, CategoryEstablishment
from .serializers import CuisineListSerializer, CategoryListSerializer, DishListSerializer, InstitutionListSerializer, EstablishmentCategoryListSerializer


class CuisineList(APIView):

    def get(self, request, format=None):
        cuisines = Cuisine.objects.all()
        serializer = CuisineListSerializer(
            cuisines, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CuisineListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryList(APIView):

    def get(self, request, format=None):
        categories = Category.objects.all()
        serializer = CategoryListSerializer(
            categories, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CategoryListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DishList(APIView):

    def get(self, request, format=None):
        dishes = Dish.objects.all()
        serializer = DishListSerializer(
            dishes, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = DishListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EstablishmentList(APIView):

    def get(self, request, format=None):
        establishments = Institution.objects.all()
        serializer = InstitutionListSerializer(
            establishments, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = InstitutionListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EstablishmentCategoryList(APIView):

    def get(self, request, format=None):
        establishmentCategory = CategoryEstablishment.objects.all()
        serializer = EstablishmentCategoryListSerializer(
            establishmentCategory, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = EstablishmentCategoryListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetEstablishment(APIView):
    def get(self, request, id, format=None):
        establishment = Institution.objects.get(id=id)
        serializer = InstitutionListSerializer(establishment)
        return Response(serializer.data)
