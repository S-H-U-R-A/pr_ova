import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverSuggestionPage } from './popover-suggestion';

@NgModule({
  declarations: [
    PopoverSuggestionPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverSuggestionPage),
  ],
})
export class PopoverSuggestionPageModule {}
