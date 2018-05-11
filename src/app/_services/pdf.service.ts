import { Injectable } from '@angular/core';

import  * as moment from "moment";

// import * as jsPDF from 'jspdf';
declare let html2pdf;
declare var jsPDF : any;

@Injectable()
export class PdfService {

  constructor() { }


  generatePDF(): void {
    let pdf = new jsPDF('p', 'pt', 'letter');
    let elem = document.getElementById('print-area');
    

    
    html2pdf(elem, pdf , function(pdf) {
            let iframe = document.createElement('iframe');
            iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:100%;');
            elem.appendChild(iframe);
            iframe.src = pdf.output('datauristring');

          //  var div = document.createElement('pre');
          //  div.innerText=pdf.output();
          //  document.body.appendChild(div);

          //  let blob = pdf.output("blob");
          //  window.open(URL.createObjectURL(blob));
        }
    );
  }

  generatePdfByAutotable(title : string,subtitle : string){
    let currentDate = moment(new Date()).format("MMMM Do, YYYY");
    let doc = new jsPDF();
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.setFontStyle('Times New Roman');
        doc.text(title,14,16);
        doc.setFontSize(10);
        doc.text(currentDate, 150, 16);
        doc.text(subtitle,14,22);
    let elem = document.getElementById('basic-table');
    let res = doc.autoTableHtmlToJson(elem);
        doc.autoTable(res.columns,res.data,{
          theme:'grid',
          startY: 25, 
          showHeader:'everyPage',
          styles: { font :'Times New Roman', fontSize: 10  },
          drawRow: function(row,data) {
            let tdClass = row.raw[0].className;
            let tdText  = row.raw[0].innerText;
            if(tdClass === 'category'){
              row.cells[0].styles.fontSize = 12;
              row.cells[0].styles.fontStyle = 'bold';
            }
            else if(tdClass === 'subCategory'){
              row.cells[0].styles.cellPadding = 3;
            }
            
          }
        });

        // console.log(res.data[0][0].className);

        let iframe = document.createElement('iframe');
        iframe.setAttribute('style','position:relative;right:0; top:0; bottom:0; height:100%; width:100%;');
        let childElem = document.getElementById('print-area').childNodes[0];
        document.getElementById('print-area').replaceChild(iframe,childElem);
        iframe.src = doc.output('datauristring');

  }



}
