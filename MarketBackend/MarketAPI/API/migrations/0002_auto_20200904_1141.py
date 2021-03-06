# Generated by Django 3.0.5 on 2020-09-04 09:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='advertisement',
            name='location',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='API.Region'),
        ),
        migrations.AddField(
            model_name='advertisement',
            name='status',
            field=models.CharField(choices=[('AKTIVAN', 'A'), ('PRODAN', 'P'), ('NEAKTIVAN', 'N')], default='AKTIVAN', max_length=10),
        ),
    ]
