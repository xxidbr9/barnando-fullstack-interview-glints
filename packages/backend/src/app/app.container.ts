import { KEYS } from '@core/keys';
import { ContainerModule, interfaces } from 'inversify';
import { AccountApplicationService } from './account/service/account.service';
import { NotifierApplicationService } from './notifier/service/notifier.service';
import { RestaurantApplicationService } from './restaurant/services/restaurant.service';


export const applicationContainerModule = new ContainerModule(
  (
    bind: interfaces.Bind,
  ) => {
    bind<AccountApplicationService>(KEYS.AccountApplication).to(AccountApplicationService);
    bind<NotifierApplicationService>(KEYS.NotifierApplication).to(NotifierApplicationService);
    bind<RestaurantApplicationService>(KEYS.RestaurantApplication).to(RestaurantApplicationService);
  }
);