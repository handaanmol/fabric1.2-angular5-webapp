import { TradeService } from './../trade.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  public orgTypes;
  constructor(private tradeService: TradeService,
    private router: Router) { }

  orgranizationChanged(value) {
    console.log(value);
    this.tradeService.getAuthToken(value).subscribe(
      (response) => {
        sessionStorage.setItem('Authorization', 'Bearer '+response.token);
        console.log('session', response);
        this.router.navigate(['/trade/list',value]);
      },
      (exception) => {
        console.log('error', exception);
      });
  }

  ngOnInit() {
    this.orgTypes = ['Please select option','IM1', 'EB1', 'EB2'];
    
  }

}
