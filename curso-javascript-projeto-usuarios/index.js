let user = {};
let fields = document.querySelectorAll('#form-user-create [name]');

function addLine (dataUser) {
    document.querySelector('#table-users').innerHTML =
     `
    
    <tr>
        <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin}</td>
        <td>${dataUser.birth}</td>
        <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
  </tr>
  
  `
};

document.querySelector('#form-user-create').addEventListener("submit", event => {
    event.preventDefault();
       
});