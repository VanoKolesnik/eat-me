# from django.db import models

# class Cuisine(models.Model):
#     name = models.CharField(max_length='30', blank=True, null='True', verbose_name='Назва')

#     class Meta:
#         verbose_name = 'Кухня'
#         verbose_name_plural='Кухни'

#     def __str__(self):
#         return self.name

# class FoodCategory(models.Model):
#     name = models.CharField(max_length='30', blank=True, null='True', verbose_name='Назва')

#     class Meta:
#         verbose_name = 'Категорія'
#         verbose_name_plural='Категорії'

#     def __str__(self):
#         return self.name

# class Dish(models.Model):
#     name = models.CharField(max_length='150', blank=True, null='True', verbose_name='Назва')
#     image = models.ImageField(upload_to='image', verbose_name='Зображення')

#     class Meta:
#         verbose_name = 'Страв'
#         verbose_name_plural = 'Страви'

#     def __str__(self):
#         return self.name