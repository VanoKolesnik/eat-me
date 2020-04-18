from rest_framework import serializers
from menu.models import Dish, Cuisine, Category, Institution, CategoryEstablishment


class CategoryListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', ]


class CuisineListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Cuisine
        fields = ['id', 'name', ]


class DishListSerializer(serializers.HyperlinkedModelSerializer):
    cuisine = CuisineListSerializer()
    category = CategoryListSerializer()

    class Meta:
        model = Dish
        fields = ['id', 'name', 'cuisine', 'category', 'image',
                  'price', 'weight', 'composition', 'calorie', 'state']


class DishNameListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dish
        fields = ['id', 'name', ]


class EstablishmentCategoryListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CategoryEstablishment
        fields = ['id', 'name']


class InstitutionListSerializer(serializers.HyperlinkedModelSerializer):
    category = EstablishmentCategoryListSerializer()
    cuisine = CuisineListSerializer(many=True)
    menu = DishListSerializer(many=True)

    class Meta:
        model = Institution
        fields = ['id', 'name', 'phone', 'image', 'cuisine', 'menu',
                  'about', 'category', 'timeFrom', 'timeBefore', 'position']

