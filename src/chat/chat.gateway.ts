// src/chat/chat.gateway.ts

import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
    path: '/chat',
    cors: {
        origin: '*',
    },
})
export class ChatGateway {
    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
        console.log('client', client);
        console.log('payload', payload);
        return 'Hello world!';
    }
}
