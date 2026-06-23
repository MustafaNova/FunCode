import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { WebsocketModule } from './websocket/websocket.module';


@Module({
    imports: [HttpModule, WebsocketModule]
})
export class ApiModule {}