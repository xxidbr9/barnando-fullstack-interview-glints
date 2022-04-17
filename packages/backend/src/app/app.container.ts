import { KEYS } from '@core/keys';
import { ContainerModule, interfaces } from 'inversify';
import { AccountApplicationService } from './account/service/account.service';


export const applicationContainerModule = new ContainerModule(
  (
    bind: interfaces.Bind,
  ) => {
    // bind<ApplicationApplication>(TYPES.ApplicationApplication).to(ApplicationApplication);
    bind<AccountApplicationService>(KEYS.AccountApplication).to(AccountApplicationService);
    // bind<PropertyApplication>(TYPES.PropertyApplication).to(PropertyApplication);
  }
);