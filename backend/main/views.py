# Packages
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
# Assets
from .models import Books
from .serializers import BooksSerializer


class BookList(viewsets.ModelViewSet):
    serializer_class = BooksSerializer
    queryset = Books.objects.all().order_by('name')

    # def get_object(self, queryset=None, **kwargs):
    #     item = self.kwargs.get('pk')
    #     return get_object_or_404(Books, id=item)

    # Custom queryset
    # def get_queryset(self):
    #     return Books.objects.all().order_by('name')
