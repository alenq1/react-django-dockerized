from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer, AsyncJsonWebsocketConsumer
import asyncio
import json


class TestConsumer(AsyncJsonWebsocketConsumer):


    async def connect(self):
        #self.room_name = self.scope['url_route']['kwargs']['room_name']
        #self.room_name = self.scope['url_route']
        self.room_group_name = 'app'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name)

        await self.accept()

        # while self.channel_layer:
            
        #     await self.channel_layer.group_send(
        #     self.room_group_name,
        #     {
        #         'type': 'message',
        #         'message': message
        #     }
        # )

        #     await self.send_json({
        #     #     'message': f'YOUR {message} WAS RECEIVED'
        #     #    'message': response,
        #         'task_status': taskk_result.get(),
        #         })
        

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        self.close()

    # Receive message from WebSocket

    async def receive_json(self, content, **kwargs):
        #text_data_json = json.loads(text_data)
        ##message = text_data_json['message']
        resp = content.get('message')
        print(resp, "message from client")

        ## Send message to room group
        # await self.channel_layer.group_send(
        #     self.room_group_name,
        #     {
        #         'type': 'send.broadcast',
        #         'to_send': 'OK'
        #     }
        # )

    # Receive message from room group
    async def send_broadcast(self, event):
        #print(type(event), "EVENT RECEIVED")
        #to_send = event['to_send']
        to_send = event

        # Send message to WebSocket
        await self.send_json({
            'message': to_send
        })
