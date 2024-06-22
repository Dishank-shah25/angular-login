import { Component, KeyValueDiffers } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sourceMapsEnabled } from 'node:process';
import { DebugTracingFeature } from '@angular/router';
import { error } from 'node:console';
import { subscribe } from 'node:diagnostics_channel'; 
import { errorMonitor } from 'node:events';
import { networkInterfaces } from 'node:os';
import { every } from 'rxjs';
import { normalize } from 'node:path';
import { DiffieHellmanGroup, verify } from 'node:crypto';
import { validateHeaderName } from 'node:http';
import { response } from 'express';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  userData = { username: '', password: '', email: '' };

  constructor(private http: HttpClient) {}

  onSubmit() {
    console.log("Submitting registration form with data:", this.userData);

    this.http.post<any>('http://127.0.0.1:8000/create-user/', this.userData)
      .subscribe({
        next: response => {
          console.log("Response from server:", response);
          if (response && response.message) {
            alert(response.message); // Show a success message
          } else {
            alert('User creation failed'); // Show a generic error message
          }
        },  
        error: error => { 
          console.error("Error from server:", error);
          alert(error.error.error || 'An error occurred while creating the user'); 
        }
      });
  }
}