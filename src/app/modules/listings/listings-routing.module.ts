import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListContainerComponent } from './components/list-container/list-container.component';
import { ListingsComponent } from './listings.component';

const routes: Routes = [
  {
    path: '',
    component: ListContainerComponent,

    children: [
      {
        path: 'main',
        component: ListContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingsRoutingModule {}
