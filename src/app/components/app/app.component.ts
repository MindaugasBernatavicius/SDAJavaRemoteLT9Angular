import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main class="flex-shrink-0">
      <div class="container">
        <router-outlet></router-outlet>
      </div>
    </main>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SDAJavaRemoteLT9Angular';
}
