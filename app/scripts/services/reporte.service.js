angular.module('myNotesApp')
.factory('ReporteService', function(){
    let currentValue; 
    return{
        convertPDF: function(item){
            html2canvas(document.getElementById('imprimir'), {
                onrendered: function (canvas) {
                  var data = canvas.toDataURL();
                  var docDefinition = {
                    content: [{
                      image: data,
                      width: 500,
                    }]
                  };
                  pdfMake.createPdf(docDefinition).download(item.title+".pdf");
                }
              });
        }
        
    }

})
