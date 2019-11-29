from rest_framework import serializers
from .models import Timeline, Note, Event

class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = ('id', 'event', 'title', 'article')

class EventSerializer(serializers.ModelSerializer):
    notes = NoteSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = ('id', 'timeline', 'name', 'description', 'coordinate', 'notes')

class TimelineSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True, read_only=True)

    class Meta:
        model = Timeline
        fields = ('id', 'name', 'events')