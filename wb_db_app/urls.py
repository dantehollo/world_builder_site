from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('timeline/', views.TimelineList.as_view(), name='timeline_list'),
    path('timeline/<int:pk>', views.TimelineDetail.asview(), name='timeline_detail'),
    path('event/', views.EventList.as_view(), name='event_list'),
    path('event/<int:pk>', views.EventDetatil.as_view(), name='event_detail'),
    path('note/', views.NoteList.as_view(), name='note_list'),
    path('note/<int:pk>', views.NoteDetail.as_view(), name='note_detail')
]