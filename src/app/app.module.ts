import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
//Services

//Pipes
import { SecuredomPipe } from './pipes/securedom.pipe';

//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    SecuredomPipe

  ],
  imports: [
    BrowserModule,
		AuthModule,
		ReactiveFormsModule,
		HttpClientModule,
		AppRoutingModule
  ],
  providers: [

	],
  bootstrap: [AppComponent]
})
export class AppModule { }
