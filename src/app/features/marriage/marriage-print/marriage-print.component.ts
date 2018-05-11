import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';


import { Marriage } from './../marriage.model';
import { MarriageService } from './../marriage.service';




import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';
import { PdfService } from './../../../_services/pdf.service';
import { MasterDataService } from './../../../_services/master-data.service';

@Component({
  selector: 'app-marriage-print',
  templateUrl: './marriage-print.component.html',
  styleUrls: ['./marriage-print.component.scss']
})
export class MarriagePrintComponent implements OnInit {

  marriage : Marriage;
  currentDate: Date  = new Date();
  activeMinister;

  constructor(private _route: ActivatedRoute, 
    private _service : MarriageService,
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
            this.marriage = data;  
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

    getAge(dob : Date)
    {
      let birthdate = new Date(dob);
      let timeDiff = Math.abs( +Date.now() - +birthdate );
      let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      return age;
    }

}
