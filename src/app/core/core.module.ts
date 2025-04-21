import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of as observableOf } from 'rxjs';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';


export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    const security = NbSecurityModule.forRoot({
      accessControl: {
        guest: {
          view: '*',
        },
        user: {
          parent: 'guest',
          create: '*',
          edit: '*',
          remove: '*',
        },
      },
    });
    return {
      ngModule: CoreModule,
      providers: [
        ...(security.providers || []),
        {
          provide: NbRoleProvider,
          useClass: NbSimpleRoleProvider,
        },
      ],
    };
  }
}
