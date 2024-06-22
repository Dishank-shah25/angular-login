import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData = { username: '', password: '' };

  constructor(private http: HttpClient) {}

  onSubmit() {
    console.log("Login data being sent:", this.loginData);  // Debugging

    this.http.post<any>('http://127.0.0.1:8000/login/', this.loginData)
      .subscribe({
        next: response => {
          console.log(response);
          alert(response.message);
        },
        error: error => {
          console.error(error);
          alert(error.error.error || 'Invalid credentials');
        }
      });
  }
}