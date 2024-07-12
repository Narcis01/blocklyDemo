import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BlocklyComponent } from './components/blockly/blockly.component';
import { HttpClientModule } from '@angular/common/http';
import { BlocklyGeneratorService } from './services/blockly-generator.service';
import { DataService } from './services/data.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BlocklyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [BlocklyGeneratorService,
              DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
