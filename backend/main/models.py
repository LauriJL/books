from django.db import models


class Books(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return str('{} by {}.'.format(self.title, self.author))

    class Meta:
        managed = False
        db_table = 'main_books'
