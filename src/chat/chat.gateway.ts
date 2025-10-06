import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayConnection,
    OnGatewayDisconnect,
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
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    // 사용자별 닉네임 저장
    private users: Map<string, string> = new Map();

    handleConnection(socket: Socket) {
        console.log('client connected', socket.id);
    }

    handleDisconnect(socket: Socket) {
        const nickname = this.users.get(socket.id);
        if (nickname) {
            // 퇴장 알림
            socket.broadcast.emit('user_left', {
                nickname,
                message: `${nickname}님이 퇴장하셨습니다.`,
            });
            this.users.delete(socket.id);
        }
        console.log('client disconnected', socket.id);
    }

    @SubscribeMessage('join_room')
    handleJoinRoom(
        @MessageBody() data: { nickname: string },
        @ConnectedSocket() socket: Socket,
    ) {
        const { nickname } = data;

        // 닉네임 저장
        this.users.set(socket.id, nickname);

        // 본인에게 입장 성공 알림
        socket.emit('join_success', {
            message: `${nickname}님, 채팅방에 입장하셨습니다.`,
        });

        // 다른 사용자들에게 입장 알림
        socket.broadcast.emit('user_joined', {
            nickname,
            message: `${nickname}님이 입장하셨습니다.`,
        });

        console.log(`${nickname} joined the chat room`);
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
        const nickname = this.users.get(socket.id) || '익명';

        // 다른 사용자들에게 메시지 전송
        socket.broadcast.emit('received_message', {
            nickname,
            message: data.message,
            isOwn: false,
        });

        // 본인에게 메시지 전송
        socket.emit('received_message', {
            nickname: '나',
            message: data.message,
            isOwn: true,
        });
    }
}
