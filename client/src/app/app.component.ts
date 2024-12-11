import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  title = 'DatingApp';
  private accountService = inject(AccountService);
  users: any;
  url: string = 'https://localhost:5001';

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser()
  {
    const userString = localStorage.getItem('user');
    if(!userString)
    {
      return;
    }
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  getUsers() {
    this.http.get(`${this.url}/api/users`).subscribe({
      next: (response) => (this.users = response),
      error: (error) => console.log(error),
      complete: () => console.log('request completed'),
    });
  }
}
