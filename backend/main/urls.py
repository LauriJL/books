from rest_framework.routers import DefaultRouter
from .views import BookList

app_name = 'main'

router = DefaultRouter()

router.register('', BookList, basename='book')
urlpatterns = router.urls
