from rest_framework import viewsets
from .serializers import TimelineSerializer, EventSerializer, NoteSerializer
from .models import Timeline, Event, Note

class TimelineView(viewsets.ModelViewSet):
    queryset = Timeline.objects.all()
    serializer_class = TimelineSerializer

class EventView(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class NoteView(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer