import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of as observableOf } from 'rxjs';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbFirebasePasswordStrategy } from '@nebular/firebase-auth';


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
    CoreRoutingModule,
    AngularFireAuthModule,
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
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        NbAuthModule.forRoot({
          strategies: [
            NbPasswordAuthStrategy.setup({
              name: 'email',
              baseEndpoint: '',
              login: {
                redirect: {
                  success: '/pages/dashboard',
                  failure: null,
                },
              },
              register: {
                redirect: {
                  success: '/auth/login',
                  failure: null,
                },
              },
            }),
          ],
          forms: {
            login: {
              redirectDelay: 0,
              strategy: 'email',
            },
            register: {
              redirectDelay: 0,
              strategy: 'email',
            },
          },
        }).providers,
        NbSecurityModule.forRoot().providers,
      ],
    };
  }
}
