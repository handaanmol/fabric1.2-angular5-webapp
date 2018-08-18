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
    //const arrayVar='"IM1","EB1","AB1","ATP1302","ACC1001"'
    //const modifiedVar = "["+ arrayVar+"]"
    //const endURL = environment.getTradesURL+'?peer=peer0.'+orgName.toLowerCase()+'.blockchaindev12.com&fcn=getAllocationByID&args='+modifiedVar;
    //const endURL= 'http://localhost:4000/channels/trade-instruction-channel/chaincodes/trade-instruction2?peer=peer0.'+orgName.toLowerCase()+'.blockchaindev12.com&fcn=getAllocationByID&args=["IM1,"EB1","AB1","ATP1302","ACC1001"]'
    const endURL = environment.getTradesURL+'?peer=peer0.'+orgName.toLowerCase()+'.blockchaindev12.com&fcn=getTradesByPartialCompositeKey&args=["'+orgName+'"]';
    return this.http.get(endURL).map((res: any) => res);
  }
  addTradeByOrg(orgName): Observable<any> {
    console.log("orgName",orgName);
    //const endURL= 'http://localhost:4000/channels/trade-instruction-channel/chaincodes/trade-instruction2?peer=peer0.'+orgName.toLowerCase()+'.blockchaindev12.com&fcn=getAllocationByID&args=["IM1,"EB1","AB1","ATP1302","ACC1001"]'
    const endURL = environment.addTradeURL;
    const bodyParamaters={
      peers: [
        "peer0.im1.blockchaindev12.com",
    "peer0.eb1.blockchaindev12.com",
    "peer0.eb2.blockchaindev12.com"
      ],
      "fcn": "setTrade"
      
}
const argsIM_1= ["IM1","IM1","10030","EB1","","IM1","EB1","FO","FUTURES","08-14-2018","100","99.00","TVU7"]
const argsIM_2= ["IM1","IM1","10031","EB2","","IM1","EB2","FO","FUTURES","08-14-2018","80","98.00","TVU7"]
const argsIM_3= ["IM1","IM1","10032","EB2","","IM1","EB2","FO","FUTURES","08-14-2018","100","99.00","TVU7"]
const argsIM_4= ["IM1","IM1","10033","EB1","","IM1","EB2","FO","FUTURES","08-14-2018","120","99.00","TVU7"]

const argsEB_1= ["EB1","IM1","","EB1","a87660","IM1","EB1","FO","FUTURES","08-14-2018","300","99.00","TVU7"]
const argsEB_2= ["EB1","IM1","","EB1","a87661","IM1","EB1","FO","FUTURES","08-14-2018","100","99.00","TVU8"]

const argsEB2_1= ["EB2","IM1","","EB2","34-66-90112","IM1","EB2","FO","FUTURES","08-14-2018","300","99.00","TVU7"]
const argsEB2_2= ["EB2","IM1","","EB2","34-66-90113","IM1","EB2","FO","FUTURES","08-14-2018","100","99.00","TVU7"]

if(orgName=="IM1"){
  console.log("here----------IM1")
const imBodyParams=bodyParamaters
imBodyParams["args"]=argsIM_3
return this.http.post(endURL,imBodyParams).map((res: any) => res);

}else if(orgName == "EB1"){
  console.log("here----------EB1")
  const ebBodyParams=bodyParamaters
  ebBodyParams["args"]=argsEB_1
return this.http.post(endURL,ebBodyParams).map((res: any) => res);

}else {
  console.log("here----------EB2")
  const eb2BodyParams=bodyParamaters
  eb2BodyParams["args"]=argsEB2_2
return this.http.post(endURL,eb2BodyParams).map((res: any) => res);
}
    
  }
}
