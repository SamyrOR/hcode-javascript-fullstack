let nome = document.querySelector('#exampleInputName');
let gender = document.querySelectorAll('#form-user-create [name=gender]:checked');
let birth = document.querySelector('#exampleInputBirth');
let country = document.querySelector('#exampleInputCountry');
let email = document.querySelector('#exampleInputEmail');
let password = document.querySelector('#exampleInputPassword');
let photo = document.querySelector('#exampleInputFile');
let admin = document.querySelector('#exampleInputAdmin')

let fields = document.querySelectorAll('#form-user-create [name]');
fields.forEach(field => {
    console.log(field.name)
})
