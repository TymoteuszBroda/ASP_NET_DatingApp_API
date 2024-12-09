import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { NavComponent } from "./nav/nav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  title = 'DatingApp';
  users: any;
  url : string = 'https://localhost:5001';

  ngOnInit(): void {
    this.http.get(`${this.url}/api/users`).subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log("request completed")
    });
  }
}


