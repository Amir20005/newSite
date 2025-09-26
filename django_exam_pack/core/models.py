from django.db import models


class Category(models.Model):
    name = models.CharField("Название", max_length=120)
    description = models.TextField("Описание", blank=True)

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Manufacturer(models.Model):
    name = models.CharField("Название", max_length=180)
    country = models.CharField("Страна", max_length=120, blank=True)
    website = models.URLField("Сайт", blank=True)

    class Meta:
        verbose_name = "Производитель"
        verbose_name_plural = "Производители"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField("Название", max_length=255)
    description = models.TextField("Описание", blank=True)
    price = models.DecimalField("Цена", max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField("Кол-во на складе", default=0)
    added_at = models.DateTimeField("Дата добавления", auto_now_add=True)

    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, related_name="products", verbose_name="Категория"
    )
    manufacturer = models.ForeignKey(
        Manufacturer, on_delete=models.PROTECT, related_name="products", verbose_name="Производитель"
    )

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"
        ordering = ["-added_at"]

    def __str__(self):
        return self.name


class Order(models.Model):
    number = models.CharField("Номер заказа", max_length=32, unique=True)
    created_at = models.DateTimeField("Дата оформления", auto_now_add=True)
    status = models.CharField("Статус", max_length=32, default="new")
    total = models.DecimalField("Общая сумма", max_digits=12, decimal_places=2, default=0)

    products = models.ManyToManyField(
        Product,
        through="OrderItem",
        related_name="orders",
        verbose_name="Товары",
    )

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"
        ordering = ["-created_at"]

    def __str__(self):
        return self.number


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items", verbose_name="Заказ")
    product = models.ForeignKey(Product, on_delete=models.PROTECT, verbose_name="Товар")
    quantity = models.PositiveIntegerField("Количество", default=1)
    price_at_order = models.DecimalField("Цена на момент заказа", max_digits=10, decimal_places=2)

    class Meta:
        verbose_name = "Позиция заказа"
        verbose_name_plural = "Позиции заказа"
        unique_together = ("order", "product")

    def __str__(self):
        return f"{self.order.number} — {self.product.name} × {self.quantity}"
