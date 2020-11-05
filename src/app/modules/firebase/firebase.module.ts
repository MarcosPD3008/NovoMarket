import { environment } from './../../../environments/environment.prod';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';

//Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    AngularFireAnalyticsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    AngularFireAnalyticsModule,
    AngularFireModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FirebaseModule { }
