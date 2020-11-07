# Generated by Django 3.0.5 on 2020-09-06 08:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0005_merge_20200906_1016'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='advertisement',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ads', to='API.Advertisement'),
        ),
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(blank=True, max_length=30, verbose_name='first name'),
        ),
    ]
