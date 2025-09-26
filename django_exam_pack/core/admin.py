from django.contrib import admin
from .models import Category, Manufacturer, Product, Order, OrderItem


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(Manufacturer)
class ManufacturerAdmin(admin.ModelAdmin):
    list_display = ("name", "country", "website")
    search_fields = ("name", "country")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "stock", "category", "manufacturer", "added_at")
    list_filter = ("category", "manufacturer", "added_at")
    search_fields = ("name", "description")
    autocomplete_fields = ("category", "manufacturer")


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("number", "created_at", "status", "total")
    list_filter = ("status", "created_at")
    search_fields = ("number",)
    inlines = [OrderItemInline]
