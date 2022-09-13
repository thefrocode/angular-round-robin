import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatDialogModule} from "@angular/material/dialog";
import { MatFormFieldModule} from "@angular/material/form-field"
import { MatInputModule} from "@angular/material/input"
import { CreateSavingsGroupComponent } from './shared/ui/create-savings-group/create-savings-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SavingsGroupComponent } from './components/savings-group/savings-group.component';
import { HomeComponent } from './components/home/home.component';
import { AddMemberComponent } from './shared/ui/add-member/add-member.component';
import { MakeContributionComponent } from './shared/ui/make-contribution/make-contribution.component';
import { ViewSavingsGroupComponent } from './shared/ui/view-savings-group/view-savings-group.component';
import { ShortenAddressPipe } from './utils/shortenAddress.pipe';
import { ProgressDialogComponent } from './shared/ui/dialogs/progress-dialog/progress-dialog.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ParseEtherPipe } from './utils/parseEther.pipe';
import { ShortenAddressWithAsyncPipe } from './utils/shortenaddressWithAsync.pipe';
@NgModule({
  declarations: [
    AppComponent,
    CreateSavingsGroupComponent,
    SavingsGroupComponent,
    HomeComponent,
    AddMemberComponent,
    MakeContributionComponent,
    ViewSavingsGroupComponent,
    ShortenAddressPipe,
    ShortenAddressWithAsyncPipe,
    ProgressDialogComponent,
    ParseEtherPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[CreateSavingsGroupComponent]
})
export class AppModule { }
