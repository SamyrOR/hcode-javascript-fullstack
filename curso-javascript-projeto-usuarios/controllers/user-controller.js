class UserController {
    constructor (formId, tableId) {
        this.formEl = document.querySelector(formId);
        this.formArray = [...this.formEl.elements];
        this.tableEl = document.querySelector(tableId);
        this.panelCreate = document.querySelector("#box-user-create");
        this.panelEdit = document.querySelector("#box-user-update");
        this.onSubmit();
        this.onEdit();
    }

    onEdit () {
        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e => {
            this.showPanelCreate();
        })
    }

    onSubmit () {
        this.formEl.addEventListener("submit", event => {
            event.preventDefault();
            let value = this.getValues();
            let btn = this.formEl.querySelector("[type=submit]");
            btn.disabled = true;
            if (!value) return false;
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
        let isValid = true;
        this.formArray.forEach(field => {
            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {
                field.parentElement.classList.add('has-error');
                isValid = false;
            }
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
        if (!isValid) {
            return false;
        }
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

    updateCount () {
        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr => {
            numberUsers++;
            let user =  JSON.parse(tr.dataset.user);
            if (user._admin) numberAdmin++;
        });
        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;
    };
    showPanelCreate () {
        this.panelCreate.style.display = "block";
        this.panelEdit.style.display = "none";
    }

    showPanelUpdate () {
        this.panelCreate.style.display = "none"
        this.panelEdit.style.display = "block"
    }
    
    addLine (dataUser) {
        let tr = document.createElement('tr');
        tr.dataset.user = JSON.stringify(dataUser);
        tr.innerHTML = 
     `
        <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
        <td>${Utils.dateFormat(dataUser.register)}</td>
        <td>
            <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger  btn-xs btn-flat">Excluir</button>
        </td>
      
      `;
      tr.querySelector(".btn-edit").addEventListener("click", e => {
        let json = JSON.parse(tr.dataset.user);
        let form = document.querySelector("#form-user-update");
        for (let name in json) {
            let field = form.querySelector("[name=" + name.replace("_", "") + "]");
            if (field) {
                if (field.type == 'file') continue;
                field.value = json[name];
            }
        }
        this.showPanelUpdate();
      });
      this.tableEl.appendChild(tr);
      this.updateCount();
    };
}