# Пакет для контрольной — ГОТОВЫЕ ФАЙЛЫ

Ниже — что и куда вставлять в вашем проекте Django (VS Code). На картинках-диаграммах показано расположение.

## 0. Куда скопировать папку `core/`
Скопируйте папку `core/` **рядом с** `manage.py` вашего проекта (обычно так и делают для приложений).
Если у вас уже есть своё приложение — можно перенести содержимое файлов по аналогии.

## 1. Подключить `core` в настройках
В `settings.py` проекта (папка с названием проекта, там ещё `urls.py`) добавьте в `INSTALLED_APPS`:
```python
INSTALLED_APPS = [
    # ...
    "core",
]
```
И настройте медиа (если не настроено):
```python
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"
```

## 2. Прописать URL'ы проекта
В `urls.py` проекта (не в приложении, а в корне проекта):
```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("core.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

## 3. Миграции и запуск
```bash
pip install Pillow
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser   # если нужно
python manage.py runserver
```
Админка: http://127.0.0.1:8000/admin/  
Публичная страница: http://127.0.0.1:8000/abexam/

## 4. Переименовать модель под ваши инициалы
В файлах `models.py`, `admin.py`, `views.py`, `urls.py`, `templates/core/abexam_list.html` везде упоминается `abexam`.
Замените `abexam` на, например, `keexam` (первая буква имени + фамилии). После замены — снова миграции:
```bash
python manage.py makemigrations
python manage.py migrate
```

## 5. Где какие файлы
- `core/models.py` — модели магазина + модель экзамена (ManyToMany к User, ImageField, is_public).
- `core/admin.py` — админка: поиск по названию и email, фильтры, date_hierarchy, M2M-виджет.
- `core/views.py` — вывод опубликованных экзаменов.
- `core/urls.py` — путь `/abexam/`.
- `core/templates/core/abexam_list.html` — шаблон страницы.

Смотрите картинки `img_*.png` для визуального расположения.

# python manage.py runserver
# http://127.0.0.1:8000/admin/
