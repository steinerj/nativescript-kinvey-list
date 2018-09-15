import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ListComponent } from "./list.component";
import { ItemService } from "./item.service";

@NgModule({
	imports: [
		NativeScriptCommonModule
	],
	declarations: [
		ListComponent
	],
	exports: [
		ListComponent
	],
	providers: [
		ItemService
	],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class ListModule { }