import { TradeService } from './../trade.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.css']
})
export class TradeListComponent implements OnInit {
  public tradeList;
  public orgName;
  constructor(private tradeService: TradeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((routeParams) => {
      this.orgName = routeParams['orgName']
      
    });
    this.tradeService.getTradeList(this.orgName).subscribe(
      (response) => {
        console.log('get trades', response);
        //this.tradeList.push(response);
        this.tradeList=response;

      },
      (exception) => {
        console.log('error', exception);
      });
  }

  addTrade(){
    console.log("trade will be added by org", this.orgName)
    this.tradeService.addTradeByOrg(this.orgName).subscribe(
      (response) => {
        console.log('added trades transaction Id is', response);
        this.tradeList.push(response);
        
      },
      (exception) => {
        console.log('error', exception);
      });
      this.ngOnInit();
  }

  matchTrade(){
    this.tradeService.getTradeList(this.orgName).subscribe(
      (response) => {
        console.log('get trades', response);
        this.tradeList.push(response);

      },
      (exception) => {
        console.log('error', exception);
      });
  }

}
