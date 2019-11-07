import requests
import requests.exceptions as ex
import time
import json
import re
import logging
import concurrent.futures

## Celery libraries

#from celery import shared_task
#from backend.celery import celery_app
#from celery.utils.log import get_logger



#@shared_task <--- activate if you want to be executed as a celery task
def get_api_data():

    '''
    This function make concurrent api requests , just add a field and url and you can make multiple requests
    '''
    
    sites_to_get_data = [{'page': 'examplePage', 'url':'https://api.publicapis.org/entries'},
                        #{'page': 'otherExample', 'url':'https://jsonplaceholder.typicode.com/posts'},
                        ]
    
    #SET FUCNTIONS FOR EXECUTING CONCURRENT REQUESTS
    
    def get_site(url):
        #print("CONNECTING SITES", url)
        return requests.get(url, timeout=5)
    
    def get_all_sites(urls):
        with concurrent.futures.ThreadPoolExecutor(max_workers=len(sites_to_get_data)) as executor:
            return list(executor.map(get_site, urls))

    only_sites = [urls['url'] for urls in sites_to_get_data ]
    data_to_client = [responses.json() for responses in get_all_sites(only_sites)]

    return data_to_client