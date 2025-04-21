import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';

import { ThemeRoutingModule } from './theme-routing.module';
import { ThemeComponent } from './theme.component';
import { HeaderComponent } from './components/header/header.component';
import { DefaultLayoutComponent } from './layouts/default/default.layout';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { DARK_THEME } from './styles/theme.dark';

const NB_MODULES = [
  
];
const COMPONENTS = [
  
];

@NgModule({
  declarations: [
    ThemeComponent,
    HeaderComponent,
    DefaultLayoutComponent
  ],
  imports: [ 
    CommonModule, 
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbUserModule,
    NbActionsModule,
    NbSearchModule,
    NbSidebarModule.forRoot(),
    NbContextMenuModule,
    NbSecurityModule.forRoot(),
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbEvaIconsModule 
  ],
  exports: [
    CommonModule, 
    HeaderComponent,
    DefaultLayoutComponent
  ],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    const nbTheme = NbThemeModule.forRoot(
      {
        name: 'default',
      },
      [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME]
    );
    return {
      ngModule: ThemeModule,
      providers: [...(nbTheme.providers || [])],
    };
  }
}