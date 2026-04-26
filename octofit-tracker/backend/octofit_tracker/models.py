
from djongo import models
from django.contrib.auth.models import AbstractUser
from bson import ObjectId


class Team(models.Model):
    id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = 'teams'

    def __str__(self):
        return self.name


class User(AbstractUser):
    id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    email = models.EmailField(unique=True)
    team = models.ForeignKey('Team', on_delete=models.CASCADE, null=True, blank=True, db_column='team_id', to_field='id')

    class Meta:
        db_table = 'users'


class Activity(models.Model):
    id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    user = models.ForeignKey('User', on_delete=models.CASCADE, db_column='user_id', to_field='id')
    type = models.CharField(max_length=50)
    duration = models.IntegerField()  # in minutes

    class Meta:
        db_table = 'activities'


class Workout(models.Model):
    id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField()

    class Meta:
        db_table = 'workouts'


class Leaderboard(models.Model):
    id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    user = models.ForeignKey('User', on_delete=models.CASCADE, db_column='user_id', to_field='id')
    score = models.IntegerField()

    class Meta:
        db_table = 'leaderboard'
