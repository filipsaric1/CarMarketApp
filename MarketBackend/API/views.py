# views.py
from rest_framework import viewsets, generics
import django_filters.rest_framework
from .serializers import (
    AdvertismentSerializer,
    MakeSerializer,
    TypeSerializer,
    RegionSerializer,
    ImageSerializer,
    RegionSerializerBasic,
    MakeSerializerBasic,
    AdvertismentSerializerRead,
)
from .models import Make, Type, User, Advertisement, Image, Region


class AdvertisementViewSet(viewsets.ModelViewSet):
    queryset = Advertisement.objects.all().order_by("id")
    serializer_class = AdvertismentSerializer


class AdvertisementViewSetRead(viewsets.ModelViewSet):
    queryset = Advertisement.objects.all().order_by("id")
    serializer_class = AdvertismentSerializerRead
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = [
        "location",
        "id",
        "price",
        "carType",
        "shifterType",
        "km",
        "productionYear",
        "engineType",
    ]

    def get_queryset(self):
        queryset = Advertisement.objects.all().order_by("id")
        minPrice = self.request.query_params.get("minprice")
        maxPrice = self.request.query_params.get("maxprice")
        if minPrice:
            queryset = queryset.filter(price__gt=minPrice)
        if maxPrice:
            queryset = queryset.filter(price__lt=maxPrice)
        minKm = self.request.query_params.get("minkm")
        maxKm = self.request.query_params.get("maxkm")
        if minKm:
            queryset = queryset.filter(km__gt=minKm)
        if maxKm:
            queryset = queryset.filter(km__lt=maxKm)
        carTypeId = self.request.query_params.get("type")
        regionId = self.request.query_params.get("region")
        makeId = self.request.query_params.get("make")
        if makeId:
            try:
                makeTypes = Type.objects.all().filter(make=Make.objects.get(id=makeId))
                queryset = queryset.filter(carType__in=makeTypes)
            except:
                queryset = None
        minYear = self.request.query_params.get("minyear")
        maxYear = self.request.query_params.get("maxyear")
        if minYear:
            queryset = queryset.filter(
                productionYear__gt=minYear
            )
        if maxYear:
            queryset = queryset.filter(
                productionYear__lt=maxYear
            )

        return queryset


class MakeViewSet(viewsets.ModelViewSet):
    queryset = Make.objects.all().order_by("id")
    serializer_class = MakeSerializer


class MakeViewSetBasic(viewsets.ModelViewSet):
    queryset = Make.objects.all().order_by("id")
    serializer_class = MakeSerializerBasic


class TypeViewSet(viewsets.ModelViewSet):
    queryset = Type.objects.all().order_by("id")
    serializer_class = TypeSerializer


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all().order_by("id")
    serializer_class = ImageSerializer


class RegionViewSet(viewsets.ModelViewSet):
    queryset = Region.objects.all().order_by("name")
    serializer_class = RegionSerializer


class RegionViewSetBasic(viewsets.ModelViewSet):
    queryset = Region.objects.all().order_by("name")
    serializer_class = RegionSerializerBasic
