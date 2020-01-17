from django.db import models
from django.contrib.auth.models import User

class Account(User):
    phone = models.CharField(max_length=12, blank=True, verbose_name='Phone', unique=True)
