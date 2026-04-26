from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from octofit_tracker.models import Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):

        User = get_user_model()
        # Clear existing data (workaround for Djongo bulk delete bug)
        for obj in User.objects.all():
            if getattr(obj, 'id', None) is not None:
                obj.delete()
        for obj in Team.objects.all():
            if getattr(obj, 'id', None) is not None:
                obj.delete()
        for obj in Activity.objects.all():
            if getattr(obj, 'id', None) is not None:
                obj.delete()
        for obj in Leaderboard.objects.all():
            if getattr(obj, 'id', None) is not None:
                obj.delete()
        for obj in Workout.objects.all():
            if getattr(obj, 'id', None) is not None:
                obj.delete()

        # Teams
        marvel = Team.objects.create(name='Team Marvel')
        dc = Team.objects.create(name='Team DC')

        # Users
        tony = User.objects.create_user(username='ironman', email='tony@marvel.com', password='pass', team=marvel)
        steve = User.objects.create_user(username='captain', email='steve@marvel.com', password='pass', team=marvel)
        bruce = User.objects.create_user(username='hulk', email='bruce@marvel.com', password='pass', team=marvel)
        clark = User.objects.create_user(username='superman', email='clark@dc.com', password='pass', team=dc)
        bruce_dc = User.objects.create_user(username='batman', email='bruce@dc.com', password='pass', team=dc)

        # Activities
        Activity.objects.create(user=tony, type='run', duration=30)
        Activity.objects.create(user=steve, type='cycle', duration=45)
        Activity.objects.create(user=bruce, type='swim', duration=60)
        Activity.objects.create(user=clark, type='fly', duration=120)
        Activity.objects.create(user=bruce_dc, type='drive', duration=50)

        # Workouts
        Workout.objects.create(name='Morning Cardio', description='Run and cycle combo')
        Workout.objects.create(name='Strength', description='Weight lifting and pushups')

        # Leaderboard
        Leaderboard.objects.create(user=tony, score=100)
        Leaderboard.objects.create(user=steve, score=90)
        Leaderboard.objects.create(user=clark, score=110)
        Leaderboard.objects.create(user=bruce_dc, score=95)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))
