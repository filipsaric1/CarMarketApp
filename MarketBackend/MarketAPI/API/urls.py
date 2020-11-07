# myapi/urls.py
from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r"makes", views.MakeViewSet)
router.register(r"types", views.TypeViewSet)
router.register(r"ads", views.AdvertisementViewSet)
router.register(r"regions", views.RegionViewSet)
router.register(r"images", views.ImageViewSet)
router.register(r"regionsBasic", views.RegionViewSetBasic, basename="regionsBasic")
router.register(r"makesBasic", views.MakeViewSetBasic)
router.register(r"adsRead", views.AdvertisementViewSetRead)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]