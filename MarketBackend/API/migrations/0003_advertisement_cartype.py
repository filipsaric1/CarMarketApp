# Generated by Django 3.0.5 on 2020-09-04 09:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0002_auto_20200904_1141'),
    ]

    operations = [
        migrations.AddField(
            model_name='advertisement',
            name='carType',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='API.Type'),
        ),
    ]
