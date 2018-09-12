import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
// import { NgRedux, NgReduxModule } from '@angular-redux/store';
// import { IAppState, rootReducer, INITIAL_STATE } from '../../store/store';
import { ViewerRoutingModule } from './viewer-routing.module';
import { ViewerComponent } from './viewer.component';
// import { ParameterViewerComponent } from './components/param-viewer/param-viewer.component';

@NgModule({
  declarations: [
    ViewerComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    SharedModule,
    ViewerRoutingModule
  ],
  entryComponents: [ ],
  providers: [ ]
})
export class ViewerModule {
    constructor () { }
}
