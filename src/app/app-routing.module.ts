import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { MyNominationContainerComponent } from './my-nomination-container/my-nomination-container.component';
import { NominationComponent } from './nomination/nomination.component';
import { SetupProgramComponent } from './setup-program/setup-program.component';
import { MessageComponent } from './shared/message/message.component';
import { UserComponent } from './user/user.component';
import { ViewNominationsComponent } from './view-nominations/view-nominations.component';
import { ViewSetupComponent } from './view-setup/view-setup.component';


const routes: Routes = [
  { path: '', component: MyNominationContainerComponent ,
  children: [
    { path: 'nomination/:id', component: NominationComponent },
    { path: 'courses', component: CoursesComponent },
    { path: 'view', component: ViewNominationsComponent },
    { path: 'setup', component: SetupProgramComponent },
    { path: 'viewsetup', component: ViewSetupComponent },
    { path: 'users', component: UserComponent },
    { path: 'message', component: MessageComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
