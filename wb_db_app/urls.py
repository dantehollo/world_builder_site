from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('timeline', views.TimelineView)
router.register('event', views.EventView)
router.register('note', views.NoteView)

urlpatterns = [
    path('', include(router.urls))
]