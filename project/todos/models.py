from django.db import models

# Create your models here.
class TodoDB(models.Model):
    name = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)