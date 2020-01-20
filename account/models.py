from django.db import models
from django.contrib.auth.models import User
from order.models import Order

class Account(User):
    phone = models.CharField(max_length=12, blank=True, verbose_name='Номер телефону', unique=True)

    def __str__(self):
        return self.first_name

class FastCostumer(Order):
    def __str__(self):
        return '{0} {1}'.format(self.name, self.surname)
    
    class Meta:
        verbose_name = 'Тимчасовий покупець'
        verbose_name_plural = 'Тимчасові покупці' 

