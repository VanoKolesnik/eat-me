from .models import Account, FastCostumer
from django.contrib import admin
from django.contrib.auth.models import User, Group
import hashlib

admin.site.unregister(User)
admin.site.unregister(Group)


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'first_name', 'last_name', 'phone', 'email')
    list_display_links = ('id', 'username', 'first_name', 'last_name', 'phone', 'email')
    fieldsets = (
        ('Загальна інформація', {
            'fields': ('first_name', 'last_name', 'phone')
        }),
        ('Авторизація', {
            'fields': ('username', 'email', 'password')
        }),
    )
    search_fields = ['id', 'username', 'first_name', 'last_name', 'phone', 'email']

    def save_model(self, request, obj, form, change):
        if len(obj.password) < 32:
            obj.password = hashlib.md5(obj.password.encode()).hexdigest()        
            obj.save()

@admin.register(FastCostumer)
class FastCostumerAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'surname', 'customerPhone']
    list_display_links = ['id', 'name', 'surname', 'customerPhone']
    fieldsets = (
        ('Загальна інформація', {
            'fields': ('name', 'surname', 'customerPhone')
        }),
    )
    search_fields = ['name', 'surname', 'customerPhone']


