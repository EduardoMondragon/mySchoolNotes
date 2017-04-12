'use strict';

/**
 * @ngdoc function
 * @name myNotesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myNotesApp
 */
angular.module('myNotesApp')
  .controller('MainCtrl', function ($rootScope, noteService) {
    var vm = this;
    vm.notes = [];
    vm.note = {};
    vm.noteContent = "";
    vm.switchFooter = false;
    vm.showIcons = "deleteIcon";
    vm.hideIcons = "hideIcons";

//public function
    vm.addNote = addNote;
    vm.deleteNote = deleteNote;
    vm.showFooter = showFooter;
 //private function
    function activate(){
      noteService.getNotes()
      .then(function(response){
        vm.notes = response.data;
      })
    }
    activate();


    function addNote(){
      vm.note.createDate = new Date();
      noteService.addNote(vm.note)
      .then(function(response){
        vm.notes.push(vm.note); 
        vm.note = {};
      })
      
    }
    
    function deleteNote(index){
      vm.notes.splice(index,1);
    }

    function  showFooter(){
      vm.trashIcons = "deleteIcon";
    }

    function hideIconsFooter(){
      vm.hideIcons = "hideIcons";
    }


  });
