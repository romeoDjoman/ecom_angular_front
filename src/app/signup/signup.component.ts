import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(12),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$%\\^&\\*]).{12,}$')
        ]
      ],
      confirmPassword: [null, [Validators.required]]
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.snackBar.open('Veuillez corriger les erreurs dans le formulaire.', 'Fermer', {
        duration: 5000,
        panelClass: 'error-snackbar'
      });
      return;
    }

    const password = this.signupForm.get('password')!.value;
    const confirmPassword = this.signupForm.get('confirmPassword')!.value;

    if (password != confirmPassword) {
      this.snackBar.open('Les mots de passe ne correspondent pas.', 'Fermer', {duration: 5000, panelClass: 'error-snackbar'});
      return;
    }
    this.authService.register(this.signupForm.value).subscribe(
      (response) => {
        this.snackBar.open('Inscription réussie !', 'Fermer', {duration: 5000});
        this.router.navigateByUrl("/login");
      },
      (error) => {
        this.snackBar.open('Échec de l\'inscription. Veuillez réessayer.', 'Fermer', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });

      }
    )
  }


  protected readonly faEyeSlash = faEyeSlash;
  protected readonly faEye = faEye;
}
