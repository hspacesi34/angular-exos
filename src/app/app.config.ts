import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),]
};