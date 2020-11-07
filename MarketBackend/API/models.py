from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

# Create your models here.


class User(AbstractUser):
    class Role(models.TextChoices):
        USER = "USER", _("User")
        ADMIN = "ADMIN", _("Admin")

    role = models.CharField(
        max_length=10,
        choices=Role.choices,
        default=Role.USER,
    )
    email = models.EmailField(unique=True, blank=False, null=False)
    registered = models.DateTimeField(auto_now=True)


class Make(models.Model):
    name = models.CharField(max_length=25, blank=False, null=False)

    def __str__(self):
        return "%s: %d, %s: %s" % ("id", self.id, "name", self.name)


class Type(models.Model):
    name = models.CharField(max_length=40, blank=False, null=False)
    make = models.ForeignKey(
        Make, related_name="types", on_delete=models.CASCADE, blank=False, null=False
    )

    def __str__(self):
        return "%s: %d, %s: %s" % ("id", self.id, "name", self.name)


class Region(models.Model):
    name = models.CharField(max_length=30, blank=False, null=False)

    def __str__(self):
        return "%s: %d, %s: %s" % ("id", self.id, "name", self.name)


class Advertisement(models.Model):
    carType = models.ForeignKey(
        Type,
        on_delete=models.CASCADE,
        related_name="type",
        null=False,
    )
    heading = models.CharField(max_length=25, blank=False, null=False)
    productionYear = models.IntegerField(blank=False, null=False)
    publisher = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    km = models.IntegerField(blank=False, null=False)
    enginePowerInKw = models.IntegerField(blank=False, null=False)
    price = models.IntegerField(null=False, blank=False)

    class EngineType(models.TextChoices):
        DIESEL = "DIZEL", _("Dizel")
        PETROL = "BENZIN", _("Benzin")
        PETROLLPG = "BENZIN+LPG", _("Benzin + LPG")

    engineType = models.CharField(
        choices=EngineType.choices, default=EngineType.PETROL, max_length=10
    )
    engineCapacity = models.IntegerField(null=False, blank=False)

    class ShifterType(models.TextChoices):
        AUTOMATIC = "AUTOMATSKI", _("Automatski")
        MANUAL = "RUCNI", _("Rucni")

    shifterType = models.CharField(
        choices=ShifterType.choices, default=ShifterType.MANUAL, max_length=10
    )
    contactNumber = models.CharField(max_length=20)
    description = models.TextField(max_length=500)
    owner = models.IntegerField()
    published = models.DateField(auto_now=True)

    class Status(models.TextChoices):
        ACTIVE = "AKTIVAN", _("Aktivan")
        SOLD = "PRODAN", _("Prodan")
        INACTIVE = "NEAKTIVAN", _("Neaktivan")

    status = models.CharField(
        choices=Status.choices, max_length=10, default=Status.ACTIVE
    )
    location = models.ForeignKey(
        Region, on_delete=models.CASCADE, null=True, blank=True, related_name="ads"
    )


class Image(models.Model):
    imagePath = models.ImageField(upload_to="images", null=True, blank=True)
    advertisement = models.ForeignKey(
        Advertisement,
        on_delete=models.CASCADE,
        related_name="images",
        null=True,
        blank=True,
    )
