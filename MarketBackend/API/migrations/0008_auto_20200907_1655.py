# Generated by Django 3.1.1 on 2020-09-07 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0007_merge_20200907_1655'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='imagePath',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(blank=True, max_length=150, verbose_name='first name'),
        ),
    ]
