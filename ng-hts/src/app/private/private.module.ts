import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PrivateComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    PrivateRoutingModule
  ],
})
export class PrivateModule { }
