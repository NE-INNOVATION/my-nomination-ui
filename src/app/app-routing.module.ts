import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyNominationContainerComponent } from './my-nomination-container/my-nomination-container.component';
import { NominationComponent } from './nomination/nomination.component';
import { SetupProgramComponent } from './setup-program/setup-program.component';
import { MessageComponent } from './shared/message/message.component';
import { ViewNominationsComponent } from './view-nominations/view-nominations.component';


const routes: Routes = [
  { path: '', component: MyNominationContainerComponent ,
  children: [
    { path: 'nomination/:id', component: NominationComponent },
    { path: 'view', component: ViewNominationsComponent },
    { path: 'setup', component: SetupProgramComponent },
    { path: 'message', component: MessageComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
