import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  articles: any;
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private newService: UserService,
  ) { }



  ngOnInit() {

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.getUser();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          // this.latitude = place.geometry.location.lat();

          this.latitude = 11.688;
          this.longitude = 79.615;
          // console.log("---------------",this.latitude);

          // this.longitude = place.geometry.location.lng();
          // console.log("-------------",this.longitude);

          this.zoom = 12;
        });
      });
    });
  }

  // Get Current Location Coordinates
  setCurrentLocation = function(number1, number2) {
    console.log("-------number1-----------", number1);
    console.log("-------number1-----------", number2);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.zoom = 10;
        this.latitude = number1;
        this.longitude = number2;
      });

    }
  }



  markerDragEnd($event: MouseEvent) {

    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  getUser = function() {
    this.newService.getCabs().subscribe((data: any[]) => {
      let x = data._body;
      let data1 = JSON.parse(x);
      this.articles = data1;
      for (var i = 0; i < data1.length; i++) {
        var final_data = data1[i];
        console.log("latitude: " + final_data.latitude + " longitude " + final_data.longitude);
        var number1 = final_data.latitude;
        var number2 = final_data.longitude;
        this.setCurrentLocation(number1, number2);
      }



    });
  }
  bookCab = function() {
    var num1 = ((document.getElementById("bookid") as HTMLInputElement).value);
    if (!num1) {
      alert("Please Enter the cab id to book");
    }
    this.newService.bookCabs(num1)
      .subscribe(data => {
        console.log("------", data);
        var object = data._body;
        this.articles = object;
        alert("YOUR CAB BOOKED SUCCESSFULLY");
        window.location.reload(true);



      }, error => console.log(error));


  }

  unbookCab = function() {
    var num1 = ((document.getElementById("bookid") as HTMLInputElement).value);
    if (!num1) {
      alert("Please Enter the cab id to unbook");
    }
    this.newService.unbookCabs(num1)
      .subscribe(data => {
        this.cab = data;
        var mydata = this.cab;

        alert("YOUR CAB UNBOOKED SUCCESSFULLY");
        window.location.reload(true);
      }, error => console.log(error));

  }
  numberofRides = function() {
    if (!num1) {
      alert("Please Enter the cab id to get the rides of a cab");
    }
    var num1 = ((document.getElementById("bookid") as HTMLInputElement).value);
    this.newService.ridesHistory(num1)
      .subscribe(data => {
        console.log(data)
        this.cab = data;

      }, error => console.log(error));

  }



}
