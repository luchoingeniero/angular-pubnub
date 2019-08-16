import { PubNubAngular} from 'pubnub-angular2';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-pubnub';
  pubnub:any;
  mensaje: string;
  mensajes:Array<string> = [];

  constructor(pubnub: PubNubAngular){
    this.pubnub=pubnub;
  
}

  ngOnInit(){
    
    console.log("Configurando!!");
    this.pubnub.init({publishKey: 'pub-c-bccc2c5a-56c5-4dbe-9cf8-bc499aef5993', subscribeKey: 'sub-c-8bd4f49a-bfd8-11e9-ba36-02e0e0e0a6e1'});
    this.pubnub.subscribe({
      channels  : ['alertas'],
      triggerEvents: ['message']
    });
    
    this.pubnub.getMessage('alertas', (msg) => {
      console.log("recibido",msg);
      this.mensajes.push(msg);
    });
  }

  sendMessage(){
    console.log("eNVIANDO mENSAJE",this.mensaje);
    this.pubnub.publish({ channel: 'alertas', message: this.mensaje }, (response) => {
      console.log("response",response);
      if(response['error']===false){
        this.mensaje='';
      }else{
        alert('No se pudo enviar el mensaje ');
      }
    });
  }
}
