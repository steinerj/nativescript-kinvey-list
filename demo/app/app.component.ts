import { Component, OnInit } from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";

@Component({
    selector: "ns-app",
    template: `
    <GridLayout class="page">
        <StackLayout>
            <Label text="it works"></Label>
            <Label *ngIf="show" text="logged in"></Label>
            <List *ngIf="show"></List>
        </StackLayout>
    </GridLayout>`
})

export class AppComponent implements OnInit {
    show = false;

    ngOnInit(): void {
       this.login();
    }
    login(): Promise<any>{
        Kinvey.init({
            appKey: "kid_SyiyiVK_X",
            appSecret: "16ce8459c15a4b3892728f3465bddbe8"
        });
        return Kinvey.User.login('admin', 'admin')
                .then(() => {
                    this.show = true;
                })
                .catch((e) => {
                    console.log('login failed', e);
                })
       
    }
}
