import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Kinvey, CacheStore} from 'kinvey-nativescript-sdk';
Kinvey.init({
    appKey: 'kid_Hkw1LWwCQ',
    appSecret: '7ad50ce60ef740b4a1acf7b3efd82339'
});
interface names {
    _id;
    address:string;
    distance: number;
}

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public contactName: Array<any> = [];
    public dataStore;
    standings: any;
    constructor(private _routerExtensions: RouterExtensions) {
        this.dataStore = Kinvey.DataStore.collection<names>('plowCollection', Kinvey.DataStoreType.Cache);

        this.standings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    }
    onClicked(){
        console.log("Goto Next component");
        this._routerExtensions.navigateByUrl('/form');
    }
    onItemSelected(){
        console.log("Congrats!");
    }
    ngOnInit(): void {
        if(Kinvey.User.getActiveUser()){
            console.log("Active user");
            const subscription = this.dataStore.find()
            .subscribe(data => {
                //console.log(data.length);
                //alert(data.length);
              this.contactName = data;
            }, (error) => {
              alert(error)
            }, () => {
              // ...
            })
            }
            else{
             Kinvey.User.login("admin","admin").then(()=>{
                 console.log("Will be active");
                 }).catch((e)=>{
                     alert(e);
                 });
             }
    }
}
