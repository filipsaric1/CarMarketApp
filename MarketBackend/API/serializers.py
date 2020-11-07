# serializers.py
from rest_framework import serializers
from .models import Make, Type, User, Advertisement, Image, Region


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = "__all__"


class MakeSerializer(serializers.ModelSerializer):
    types = TypeSerializer(many=True, read_only=True)

    class Meta:
        model = Make
        fields = ("id", "name", "types")


class MakeSerializerBasic(serializers.ModelSerializer):
    class Meta:
        model = Make
        fields = ["name"]


class RegionSerializer(serializers.ModelSerializer):
    ads = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Region
        fields = ("id", "name", "ads")


class RegionSerializerBasic(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ("id", "name")


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"


class AdvertismentSerializer(serializers.ModelSerializer):
    # location = RegionSerializer(read_only=True)
    # type = serializers.StringRelatedField()
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Advertisement
        fields = (
            "id",
            "location",
            "carType",
            "heading",
            "productionYear",
            "km",
            "images",
            "enginePowerInKw",
            "contactNumber",
            "shifterType",
            "description",
            "engineCapacity",
            "owner",
            "price",
            # "type",
            "engineType",
        )


class AdvertismentSerializerRead(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    class Meta:
        model = Advertisement
        depth = 2
        fields = (
            "id",
            "location",
            "carType",
            "heading",
            "productionYear",
            "km",
            "images",
            "enginePowerInKw",
            "contactNumber",
            "shifterType",
            "description",
            "engineCapacity",
            "owner",
            "price",
            # "type",
            "engineType",
        )