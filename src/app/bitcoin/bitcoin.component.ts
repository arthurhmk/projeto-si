import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type Time = {
  updated: string;
  updatedISO: string;
  updateduk: string;
};

type Coin = {
  code: string;
  description: string;
  rate: string;
  rate_float: number;
};

type Coins = 'BRL' | 'USD';

type Bpi = {
  [key in Coins]: Coin;
};

type Response = {
  time: Time;
  disclaimer: string;
  bpi: Bpi;
};
@Component({
  selector: 'app-bitcoin',
  templateUrl: './bitcoin.component.html',
  styleUrls: ['./bitcoin.component.css'],
})
export class BitcoinComponent implements OnInit {
  response: Response;

  coins: Coin[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Response>('https://api.coindesk.com/v1/bpi/currentprice/BRL.json')
      .subscribe((data) => {
        this.response = data;
        this.coins = Object.values(data.bpi);
      });
  }
}
