// Suma de dos numero utilizando el Javascript basico
const boton = document.getElementById('btn')
const text1 = document.getElementById('input1')
const text2 = document.getElementById('input2')
const resul = document.getElementById('resultados')

function suma(valor1, valor2){
   // Se necesita toda este codigo para validar los tipos de datos
   if(typeof valor1 === 'number' && typeof valor2 === 'number')
      return valor1 + valor2
   else{
      return 'Um dos dados não é um número.'
   }
}

boton.addEventListener('click', () => {
   let resultado
   document.querySelector('.container').style.height = '200px'

   resultado = suma(Number(text1.value), Number(text2.value))

   resul.innerText = `A soma é: ${resultado}`
})