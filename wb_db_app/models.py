from django.db import models

class Timeline(models.Model):
    name = models.CharField(max_length=50, default='n/a')

    def __str__(self):
        return self.name


class Event(models.Model):
    name = models.CharField(max_length=25, default='n/a')
    description = models.CharField(max_length=150, default='n/a')
    coordinate = models.IntegerField(default=0)
    timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE, related_name="events")

    def __str__(self):
        return self.name


class Note(models.Model):
    title = models.CharField(max_length=50, default='n/a')
    article = models.TextField(default='n/a')
    event  = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='notes')
    # event = models.ManyToManyField(Event)
    
    def __str__(self):
        return self.article
