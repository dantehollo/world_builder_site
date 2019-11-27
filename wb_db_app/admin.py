from django.contrib import admin
from .models import Event
from .models import Timeline
from .models import Note

admin.site.register(Event)
admin.site.register(Timeline)
admin.site.register(Note)