import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Flashlight } from '@ionic-native/flashlight';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public photos : any;
  public base64Image : string;
  


  constructor(public navCtrl: NavController,private camera: Camera,
    private alertCtrl : AlertController,private flash: Flashlight) {
    
      
  }
  ngOnInit() {
    this.photos = [];
  }

  deletePhoto(index){
    let confirm = this.alertCtrl.create({
      title: 'Sure you want to delete this photo? There is NO undo!',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.photos.splice(index, 1);
          }
        }
      ]
    });
  confirm.present();
  }


  takePhoto(){
    const options : CameraOptions = {
      quality: 100, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true,
       saveToPhotoAlbum:true
    }
      
   

    this.camera.getPicture(options) .then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();
    }, (err) => {
      console.log(err);
    });

    }
  
    accessGallery(){
      const options : CameraOptions = {
        quality: 100, 
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation:true,
        saveToPhotoAlbum:true
      }
       //    it does not retrieve the photo selected on the gallery
      // this.camera.getPicture({
      //   sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      //   destinationType: this.camera.DestinationType.DATA_URL
      //  }).then((imageData) => {
      //    this.base64Image = 'data:image/jpeg;base64,'+imageData;
      //   }, (err) => {
      //    console.log(err);
      //  });

      this.camera.getPicture(options) .then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
      }, (err) => {
        console.log(err);
      });
      }


     toggleMethod(){
    this.flash.toggle();
 
  }
    
}
    
    
  
 