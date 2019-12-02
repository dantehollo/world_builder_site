from rest_framework import serializers
from .models import Timeline, Note, Event

class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = ('id', 'title', 'article', 'timeline')

class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ('id', 'timeline', 'name', 'description', 'coordinate')

class TimelineSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True, read_only=True)
    notes = NoteSerializer(many=True, read_only=True)

    class Meta:
        model = Timeline
        fields = ('id', 'name', 'events', 'notes')