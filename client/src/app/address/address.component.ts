import { RestApiService } from './../rest-api.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  btnDisabled = false;

  currentAddress: any;

  constructor(public data: DataService, private rest: RestApiService) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get(
        'http://localhost:3030/api/accounts/address'
      );

      if(
        JSON.stringify(data['address']) === '{}' &&
        this.data.message === ''
      ) {
        this.data.warning(
          'You have not entered your shipping address. Please enter your shipping address'
        );
      }
      this.currentAddress = data['address'];
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  async updateAddress(){
    this.btnDisabled = true;
    try {
      const res = await this.rest.post(
        //currentAddress will be posted in the above URL
        'http://localhost:3030/api/accounts/address',
        this.currentAddress
      )

      // check res success is true ?
      res['success']
      ? (this.data.success(res['message']), await this.data.getProfile())
      : this.data.error(res['message']);
    } catch (error) {
      this.data.error(error['message']);;
    }
    this.btnDisabled = false
  }


}
