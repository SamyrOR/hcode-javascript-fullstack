class UserController {
    constructor (formId, tableId) {
        this.formEl = document.querySelector(formId)
        this.formArray = [...this.formEl.elements]
        this.tableEl = document.querySelector(tableId)
        this.onSubmit();
    }

    onSubmit () {
        this.formEl.addEventListener("submit", event => {
                event.preventDefault();
                let value = this.getValues();
                this.getPhoto((content) => {
                    value.photo = content;
                    this.addLine(value);
                })
        });
    }

    getValues () {
        let user = {}
        this.formArray.forEach(field => {
            if(field.name == "gender") {
                if(field.checked){
                    user[field.name] = field.value;
                }
            } else {
                user[field.name] = field.value;
            }
        });
        return new User(
            user.name,
            user.gender,
            user.birth,
            user.coutry,
            user.email,
            user.password,
            user.photo,
            user.admin
        );
    }

    getPhoto (callback) {
        let fileReader = new FileReader();

        let elements = this.formArray.filter( item => {
            if (item.name === 'photo'){
                return item
            }
        });
        let file = elements[0].files[0];
        fileReader.onload = () => {
            callback(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };

    addLine (dataUser) {
        this.tableEl.innerHTML =
         `
        
        <tr>
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
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
}