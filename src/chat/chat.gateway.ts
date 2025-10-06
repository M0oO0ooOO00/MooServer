import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayConnection,
    WebSocketServer,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    namespace: 'chat',
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    handleConnection(socket: Socket) {
        console.log('client connected', socket.id);
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
        // this.server.emit('received_message', '서버에서 응답보냄');
        socket.broadcast.emit(
            'received_message',
            `(다른 사용자): ${data.message}`,
        );
        socket.emit('received_message', `(나): ${data.message}`);
    }
}
