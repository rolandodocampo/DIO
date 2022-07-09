var numero = document.getElementById('current_Number');
var b1 = document.getElementById('subtraer');
var b2 = document.getElementById('adicionar');
var x = 0;

function increment(){
   x = x + 1;
   numero.innerHTML = x;

   if(x >= 6)
   {
      numero.style.color = 'red';
      b2.disabled = true;
   }
   else if(x >= 0)
   {
      numero.style.color = 'black';
      b1.disabled = false;
   }
}

function decrement(){
   x = x - 1;
   numero.innerHTML = x;

   if(x < 0)
   {
      numero.style.color = 'red';
      b1.disabled = true;
   }
   else if(x < 6)
   {
      numero.style.color = 'black';
      b2.disabled = false;
   }
}