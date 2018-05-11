import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';


import { Baptism } from './../baptism.model';
import { BaptismService } from './../baptism.service';




import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';
import { PdfService } from './../../../_services/pdf.service';
import { MasterDataService } from './../../../_services/master-data.service';


@Component({
  selector: 'app-baptism-print',
  templateUrl: './baptism-print.component.html',
  styleUrls: ['./baptism-print.component.scss']
})
export class BaptismPrintComponent implements OnInit {

  baptism : Baptism;
  currentDate : Date = new Date();
  activeMinister;

  constructor(private _route: ActivatedRoute, 
    private _service : BaptismService,
    private _loader : ProgressDialogService,
    private _errHandle : ErrorHandlerService,
    private _pdf : PdfService,
    private _master : MasterDataService ) { }

    ngOnInit() {
      this._loader.openSpinner();
      this.initDetails();
      
    }




    initDetails() {
      this._route.paramMap
          .switchMap((params : ParamMap) => this._service.getData(+params.get('id')))
          .subscribe((data) => { 
            this.baptism = data;  
            this.initActiveMinister();
            
            },
            (err) => { this._errHandle.errorHandler(err); this._loader.closeSpinner(); });

    }

    initActiveMinister() {

      this._master.getActiveMinister().subscribe( (res) => {
        this.activeMinister = res.data;
        setTimeout(() => { this._loader.closeSpinner(); this.generatePDF(); },300);
      },
      (err) => { this._errHandle.errorHandler(err); } )
    }

    generatePDF() {
      this._pdf.generatePDF();
    }

}
