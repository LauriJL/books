from django.db import models


class Books(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return str('{} by {}.'.format(self.name, self.author))

    class Meta:
        managed = False
        db_table = 'books'
