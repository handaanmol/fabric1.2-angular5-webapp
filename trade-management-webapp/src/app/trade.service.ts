import { environment } from './../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TradeService {

  constructor(private http: HttpClient) { }

  getAuthToken(value): Observable<any> {
    const endURL = environment.getTokenURL;
    const authTokenParameters={
      username: "admin",
      orgName: value
  }

    return this.http.post(endURL,authTokenParameters).map((res: any) => res);
  }

  getTradeList(orgName): Observable<any> {
    const arrayVar='"IM1","EB1","AB1","ATP1302","ACC1001"'
    const modifiedVar = "["+ arrayVar+"]"
    const endURL = environment.getTradesURL+'?peer=peer0.'+orgName.toLowerCase()+'.blockchaindev12.com&fcn=getAllocationByID&args='+modifiedVar;
    //const endURL= 'http://localhost:4000/channels/trade-instruction-channel/chaincodes/trade-instruction2?peer=peer0.'+orgName.toLowerCase()+'.blockchaindev12.com&fcn=getAllocationByID&args=["IM1,"EB1","AB1","ATP1302","ACC1001"]'
    return this.http.get(endURL).map((res: any) => res);
  }

}
