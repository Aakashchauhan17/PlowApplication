import { Component, OnInit, Inject, Injectable, ViewChild, ElementRef } from "@angular/core";
import { Directions } from "nativescript-directions";
import { Http, Headers, RequestOptions } from "@angular/http";
import * as ImageSource from "image-source";
import { fromFile } from "tns-core-modules/image-source";
import * as imagepicker from "nativescript-imagepicker";
import { Kinvey, CacheStore, NetworkStore, SyncStore} from 'kinvey-nativescript-sdk';
// Kinvey.init({
//     appKey: 'kid_Hkw1LWwCQ',
//     appSecret: '7ad50ce60ef740b4a1acf7b3efd82339'
// });
 
@Component({
	selector: "form",
	moduleId: module.id,
	templateUrl: "./form.component.html",
    styleUrls: ['./form.component.css'],
})
export class formComponent implements OnInit {
    private directions: Directions;
    @ViewChild("signature")
    public drawingPad: ElementRef;

    private pad: any;
    imageAssets = [];
    imageSrc: any;
    isSingleMode: boolean = true;
    thumbSize: number = 80;
    previewSize: number = 300;

    public onSelectMultipleTap() {
        this.isSingleMode = false;

        let context = imagepicker.create({
            mode: "multiple"
        });
        this.startSelection(context);
    }

    public onSelectSingleTap() {
        this.isSingleMode = true;

        let context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    }

    private startSelection(context) {
        let that = this;

        context
        .authorize()
        .then(() => {
            that.imageAssets = [];
            that.imageSrc = null;
            return context.present();
        })
        .then((selection) => {
            console.log("Selection done: " + JSON.stringify(selection));
            that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;

            // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
            selection.forEach(function (element) {
                element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
                element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
            });

            that.imageAssets = selection;
        }).catch(function (e) {
            console.log(e);
        });
    }
	constructor(private http: Http) {
        
        this.directions = new Directions();  
    }
    // onImage(){
    //     console.log("Image Tapped");
       
    // }
    onImage() {
        this.directions.navigate({
          to: {
            address: "950 Mason st, San Francisco, CA"
          },
        //   type: "transit"
        }).then(() => {
          console.log("Current location to address directions launched!");
        }, (err) => {
          alert(err);
        });
      }

	ngOnInit(): void {
        
                

}
public ngAfterViewInit() {
    this.pad = this.drawingPad.nativeElement;
}

public send() {
    this.pad.getDrawing().then(data => {
        let image = ImageSource.fromNativeSource(data);
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });
        let body = {
            "signature": image.toBase64String("png", 70)
        };
        this.http.post("http://example.com", JSON.stringify(body), options)
            .subscribe(result => {
                // Uploaded signature as a base64 string
            }, error => {
                console.dir(error);
            });
    }, error => {
        console.dir(error);
    });
}

public reset() {
    this.pad.clearDrawing();
}
 
       
}