import 'reflect-metadata';
import { NotifierApplicationService } from "@app/notifier/service/notifier.service";
import { KEYS } from "@core/keys";
import { inject, injectable } from "inversify";
import { ConnectedSocket, Controller, OnConnect, OnDisconnect, OnMessage, Payload, SocketIO } from "inversify-socket-utils";
import { Socket } from "socket.io";
import { DataSource } from "typeorm";
import { AccountEntity } from '@app/account/domain';

@injectable()
@Controller("")
export class WebSocketController {
  constructor(
    @inject(KEYS.PostgresDB) private readonly db: DataSource,
    @inject(KEYS.NotifierApplication) private readonly notifierService: NotifierApplicationService
  ) {

  }
  @OnConnect("connection")
  connection() {
    console.log("Client connected");
  }

  @OnDisconnect("disconnect")
  disconnect() {
    console.log("Client disconnected");
  }

  @OnMessage("message")
  async message(@Payload() payload: FavoriteWSPayload, @ConnectedSocket() socket: Socket) {
    // const repo = this.db.getRepository(AccountEntity)

    // const b = await repo.createQueryBuilder()
    //   .where('full_name ILIKE :searchQuery', { searchQuery: `%barnando%` })
    //   .getOne()

    // console.log(b)

    socket.emit(payload.room_id, { ...payload });
  }

  @OnMessage("updates")
  updates(@Payload() payload: FavoriteWSPayload, @SocketIO() socket: Socket) {
    console.group("========== ok")
    console.log(payload)
    console.groupEnd()
    socket.emit(payload.room_id, { ...payload });
    socket.emit("hello", { ...payload });
  }
}

type FavoriteWSPayload = {
  room_id: string
  total: number
  hightLighted: string
}