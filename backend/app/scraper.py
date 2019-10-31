import requests
import requests.exceptions as ex
import time
import json
import re
import logging
import random
from bs4 import BeautifulSoup


browsers = ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.36 Safari/537.36',
            'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:59.0) Gecko/20120101 Firefox/59.0'
]


def get_page(url, scrap=True):


    response = []

    try:
        headers = {
            'user-agent': random.choice(browsers)
        }
        #print(url, "REQUEST APIKEY")
        
        page = requests.get(url, headers=headers, timeout=1)

        if page.status_code != 200:
            response = [{'error_code': page.status_code}]

            return response
    except (ex.RequestException, ex.Timeout, ex.ConnectionError, ex.ConnectTimeout, ex.InvalidURL) as e:
        response = [{'error': str(e)}]
        return response
    
    #print(page, 'PAGE RESULT')
    
    if scrap:
        #print("SCRAPING")
        soup = BeautifulSoup(page.text, 'html.parser')
        soup.prettify()
        return soup
    else:
        #print("JUST REQUEST")
        return page.json()
    


def get_site_content(to_scrap, keyword):

    
    try:
        
        selection = to_scrap.find_all('a', href=re.compile(keyword))[1:6]
        
        response = [{'url': content.get(
            'href'), 'title': " ".join(content.getText().split())} for content in selection]
        # filter_title = " ".join(content.getText().split()) fo
        # print(filter_title, "Filter title")
        return response

    except (AttributeError, KeyError) as ex:
        return [{'error': str(ex)}]



def get_google_search(to_scrap):
    
    
    response = []
    try:
        for items in to_scrap.find_all('div', {'class': 'rc'}):
            response.append(
                {'searchUrl': (items.a)['href'], 'searchName': (items.a).text})
        return response

    except (AttributeError, KeyError) as ex:
        return [{'error': str(ex)}]
    


if __name__ == "__main__":
    pass
