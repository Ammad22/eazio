import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GlobalState } from '../app/state/global.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eazio-task';
  @Select(GlobalState.isLoading) isLoading$: Observable<boolean>;
  @Select(GlobalState.currentTask) currentTask$: Observable<string>;
}
