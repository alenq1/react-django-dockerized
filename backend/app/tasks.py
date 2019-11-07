import random
import json
from celery import shared_task
from backend.celery import celery_app
from celery.utils.log import get_logger



@shared_task
def test_task():
    
    data = random.randint(0, 100) 

    return {'data': data}
