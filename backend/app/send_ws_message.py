from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


def send_ws_message(data, group_name):
    channel_layer = get_channel_layer()
    logger = logging.getLogger()
    #print("CHANNEL LAYER", channel_layer)

    return async_to_sync(channel_layer.group_send)(group_name, {
    'type': 'send.broadcast' ,
    #BELOW JUST PUST THE CONTENT WHAT YOU WANT TO SENT TO CHANNEL GROUP 
    'data': data,
    })