angular.module('myNotesApp')
.factory('noteService', function($http){
     
    return{
        getNotes: function(){
            // return $http.get('http://localhost:3000/notes');
        },

        addNote: function(noteObject){
            
        }
    }

})
