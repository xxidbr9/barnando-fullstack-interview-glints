import 'reflect-metadata';
import { NotifierApplicationService } from "@app/notifier/service/notifier.service";
import { KEYS } from "@core/keys";
import { inject, injectable } from "inversify";
import { ConnectedSocket, Controller, OnConnect, OnDisconnect, OnMessage, Payload, SocketIO } from "inversify-socket-utils";
import { Socket } from "socket.io";
import { DataSource } from "typeorm";
import { AccountEntity } from '@app/account/domain';
import { FavoriteRestaurantEntity } from '@app/favorites/domain';

@injectable()
@Controller("/favorite")
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

  // listen to user adding new item
  @OnMessage("update_total")
  async updatesTotal(@Payload() payload: FavoriteWSPayload, @SocketIO() socket: Socket,) {
    const repoFav = this.db.getRepository(FavoriteRestaurantEntity)
    const total = await repoFav.createQueryBuilder()
      .where("favorite_id = :id", { id: payload.favorite_id })
      .getCount()

    socket.emit(payload.favorite_id, { total });
  }

  // listen to user adding new item on list
  @OnMessage("update_list")
  async updateList(@Payload() payload: FavoriteWSPayload, @SocketIO() socket: Socket,) {
    const repoFav = this.db.getRepository(FavoriteRestaurantEntity)
    const resp = await repoFav.createQueryBuilder()
      .where("favorite_id = :id", { id: payload.favorite_id })

    socket.emit(payload.favorite_id, resp);
  }
}

type FavoriteWSPayload = {
  favorite_id: string
  total: number
  hightLighted: string
}