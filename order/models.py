from django.db import models
from menu.models import Dish
from datetime import datetime


class Order(models.Model):
    CASHTOCOURIER = 'cash'
    CASHLESSTOCOURIER = 'cashless'
    ONLINE = 'online'

    PAYMENT_CHOICES = [
        (CASHTOCOURIER, "Оплата готівкова кур'єру"),
        (CASHLESSTOCOURIER, "Оплата безготівкова кур'єру"),
        (ONLINE, 'Оплата онлайн'),
    ]


    name = models.CharField(max_length=30, verbose_name="Ім'я", blank=True, null=True)
    surname = models.CharField(max_length=50, verbose_name='Прізвище', blank=True, null=True)
    customerPhone = models.CharField(max_length=12, blank=True, default='', verbose_name='Номер телефону', unique=True)
    paymentMethod = models.CharField(max_length=50, choices=PAYMENT_CHOICES, default=ONLINE, verbose_name='Спосіб оплати', blank=True)
    orderList = models.ManyToManyField(Dish, verbose_name='Зміст замовлення', blank=True)
    orderTime = models.DateTimeField(auto_now_add=True, blank=True, null=True, verbose_name='Дата замовлення')
    paid = models.BooleanField(default=False, verbose_name='Оплата')

    class Meta:
        verbose_name = 'Замовлення'
        verbose_name_plural = 'Замовлення'

    def __str__(self):
        return '{0} {1}'.format(self.name, self.surname)
