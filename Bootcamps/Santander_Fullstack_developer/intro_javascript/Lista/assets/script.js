var texto = document.getElementById('texto');
var lista = document.getElementById('tareas');
var elementos = document.getElementById('ele');


function add(){
   var checkbox = document.createElement('input');
   checkbox.type = 'checkbox';
   checkbox.id = 'element';

   var label = document.createElement('label')
   label.htmlFor = 'element';
   label.appendChild(document.createTextNode(texto.value));

   
   elementos.appendChild(checkbox);
   elementos.appendChild(label);   
}