'use strict';
/**
 * @ngdoc function
 * @name myNotesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myNotesApp
 */
angular.module('myNotesApp')
  .controller('MainCtrl', function ($rootScope,$scope, $window) {
    var vm = this;
    vm.notes = [];
    vm.note = {};
    vm.noteContent = "";
    vm.switchFooter = false;
    vm.getIndex;
    //private function
    function activate() {
      var a = JSON.parse(localStorage.getItem('notas'));
      for (var e in a) {
        vm.notes.push(a[e]);
      }
    }
    activate();

    // ==================
    // AGREGAR NOTA AL LOCALSTORAGE
    // ==================
    vm.addNote = function () {
      if (vm.note.note || vm.note.title) {
        vm.note.createdDate = new Date();
        vm.note.color = '#82589F';
        vm.notes.push(vm.note);
        // insertar en local storage
        localStorage.setItem('notas', JSON.stringify(vm.notes));
        // limpiar objeto en la vista
        vm.note = {};
        // alert success
        swal({
          title: "Agregado!",
          text: "la nota se agrego correctamente",
          icon: "success",
          button: false,
        });
        setTimeout(function () {
          swal.close()
        }, 1000);

      } else {
        swal("No has ingresado algo :(");
      }
    }

    vm.deleteNote = function (index) {
      vm.notes.splice(index, 1);
      localStorage.setItem('notas', JSON.stringify(vm.notes));
      swal({
        title: "Eliminada!",
        text: "se elimino nota correctamente",
        icon: "error",
        button: false,
      });
      setTimeout(function () {
        swal.close()
      }, 1000);

    };

    vm.showOptions = function (index) {
      vm.optionsNote = index;
    };

    // sirve para mostrar el container de colores
    vm.showContainerColors = function (index) {
      vm.containerColorIndex = index;
      vm.showContainerTagColors = !vm.showContainerTagColors;
    };

    vm.changeNoteColor = function (index, newColor) {
      vm.notes[index].color = newColor;
      localStorage.setItem('notas', JSON.stringify(vm.notes));
    };

    vm.noteToModal = function(item){
      vm.currentItem = item;
      vm.tituloModificable = vm.currentItem.title;
      vm.textoModificable = vm.currentItem.note;
      vm.fechaModificable = new Date(vm.currentItem.entregaDate);
    };

    vm.changeNote = function () {
      var index = vm.getIndex;
      if(vm.tituloModificable ||vm.textoModificable){
        vm.notes[index].title = vm.tituloModificable;
        vm.notes[index].note = vm.textoModificable;
        vm.notes[index].entregaDate = vm.fechaModificable;
        localStorage.setItem('notas', JSON.stringify(vm.notes));
      }
    };
    
    vm.getCurrentIndex = function(index){
      vm.getIndex = index;
    };

    // ===============================
    // CONVERTIDOR DE HTML A PDF
    // ===============================
    vm.convertHtmlToPdf = function (item) {
      vm.reporte = item;
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
    };

    vm.print = function(item) {
      vm.reporte = item;
      setTimeout(function(){
        var printContents = document.getElementById('imprimir').innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        $window.location.reload();
      },500);
      
 }
  });
