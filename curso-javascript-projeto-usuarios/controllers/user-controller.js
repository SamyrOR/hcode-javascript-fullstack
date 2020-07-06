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
            let btn = this.formEl.querySelector("[type=submit]");
            btn.disabled = true
            this.getPhoto().then(content => {
                value.photo = content;
                this.addLine(value);
                this.formEl.reset();
                btn.disabled = false;
            }, e => {
                console.error(e);
            })
        })
    }

    getValues () {
        let user = {}
        this.formArray.forEach(field => {
            if(field.name == "gender") {
                if(field.checked){
                    user[field.name] = field.value;
                }
            } else if (field.name == "admin") {
                user[field.name] = field.checked;
            }else {
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

    getPhoto () {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
    
            let elements = this.formArray.filter( item => {
                if (item.name === 'photo'){
                    return item
                }
            });
            let file = elements[0].files[0];
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (e) => {
                reject(e);
            }
            if (file) {
                fileReader.readAsDataURL(file);
            } else {
                resolve('dist/img/boxed-bg.jpg');
            }
        });
    };

    addLine (dataUser) {
        let tr = document.createElement('tr');
        tr.innerHTML =
     `
        <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
        <td>${dataUser.register}</td>
        <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
      
      `;
      this.tableEl.appendChild(tr);
    };
}