const latam = {cor: 'azul', lado: 'amarelo'}
let companhias = ['Gol', 'Avianca' , latam , 'Azul']

companhias.forEach( (value, index) => {
    console.log(value, index, typeof(value))
})
console.log(companhias[2]?.lado)
