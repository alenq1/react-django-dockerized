import os
from celery import Celery
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
celery_app = Celery('app')
celery_app.config_from_object('django.conf:settings', namespace='CELERY')
celery_app.autodiscover_tasks()


@celery_app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))


# SETTINGS FOR PERIODIC TASKS SCHEDULE

celery_app.conf.beat_schedule = {
     # Executes every 5 seconds to requests apis
#     'SCRAP_API_DATA': {
#         'task': 'app.scraper.get_api_data',
#         'schedule': 5,
#         'args': (),
#     },
}