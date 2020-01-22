from django.contrib import admin
from .models import Order
from account.models import FastCostumer

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Замовник', {
            'fields': [('name', 'surname'), 'customerPhone']
        }),
        ('Інформація про замовлення', {
            'fields': ['paymentMethod', 'orderList']
        }),
        ('Статус оплати', {
            'fields': ['paid']
        }),
    )
    list_display = ['id', 'name', 'surname', 'customerPhone', 'paid']
    list_display_links = ['name', 'surname', 'customerPhone', 'paid']
    search_fields = ['name', 'surname', 'customePhone']
    list_filter = ['paid']

        