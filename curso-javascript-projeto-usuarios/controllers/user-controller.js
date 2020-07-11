class UserController {
    constructor (formIdCreate, formIdUpdate , tableId) {
        this.formEl = document.querySelector(formIdCreate);
        this.formUpdateEl = document.querySelector(formIdUpdate);
        this.formArray = [...this.formEl.elements];
        this.tableEl = document.querySelector(tableId);
        this.panelCreate = document.querySelector("#box-user-create");
        this.panelEdit = document.querySelector("#box-user-update");
        this.onSubmit();
        this.onEdit();
        this.selectAll();
    }

    onEdit () {
        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e => {
            this.showPanelCreate();
        });
        this.formUpdateEl.addEventListener("submit", e => {
            e.preventDefault();
            let btn = this.formUpdateEl.querySelector("[type=submit]");
            btn.disabled = true;
            let values = this.getValues(this.formUpdateEl);
            let index = this.formUpdateEl.dataset.trIndex;
            let tr = this.tableEl.rows[index];
            let userOld = JSON.parse(tr.dataset.user);
            let result = Object.assign({}, userOld, values);
            this.getPhoto(this.formUpdateEl).then(content => {
                if (!values.photo) {
                    values.photo = userOld._photo;
                }else {
                    values.photo = content
                }
                let user = new User();
                user.loadFromJSON(values);
                this.getTr(user, tr);
                this.updateCount();
                this.formUpdateEl.reset();
                btn.disabled = false;
                this.showPanelCreate();
            }, e => {
                console.error(e);
            })
        });
    }

    onSubmit () {
        this.formEl.addEventListener("submit", event => {
            event.preventDefault();
            let btn = this.formEl.querySelector("[type=submit]");
            btn.disabled = true;
            let value = this.getValues(this.formEl);
            if (!value) return false;
            this.getPhoto(this.formEl).then(content => {
                value.photo = content;
                this.insert(value)
                this.addLine(value);
                this.formEl.reset();
                btn.disabled = false;
            }, e => {
                console.error(e);
            })
        })
    }

    getValues (formEl) {
        let user = {}
        let isValid = true;
        [...formEl.elements].forEach(field => {
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

    getPhoto (formEl) {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
    
            let elements = [...formEl.elements].filter( item => {
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
    
    addEventsTr (tr) {
        tr.querySelector(".btn-delete").addEventListener("click", e => {
            if(confirm("Deseja realmente excluir este usuário?")){
                tr.remove();
                this.updateCount();
            }
        })
        tr.querySelector(".btn-edit").addEventListener("click", e => {
            let json = JSON.parse(tr.dataset.user);
            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;
            for (let name in json) {
                let field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "]");
                if (field) {
                    switch (field.type) {
                        case 'file':
                            break;
                        case 'radio':
                            field = this.formUpdateEl.querySelector("[name=" + name.replace("_", "") + "][value=" + json[name] + "]");
                            field.checked = true;
                            break;
                        case 'checkbox':
                            field.checked = json[name];
                            break;
                        default:
                            field.value = json[name];
                    }
                }
            }
            this.formUpdateEl.querySelector(".photo").src = json._photo;
            this.showPanelUpdate();
          });
    }

    getUserStorage (){
        let users = [];
        // if (sessionStorage.getItem("users")) {
        //     users = JSON.parse(sessionStorage.getItem("users"));
        // }
        if (localStorage.getItem("users")) {
            users = JSON.parse(localStorage.getItem("users"));
        }
        return users
    }

    selectAll () {
        let users = this.getUserStorage();
        users.forEach(dataUser => {
            let user = new User();
            user.loadFromJSON(dataUser);
            this.addLine(user)
        })
    }
    
    insert (data) {
        let users = this.getUserStorage();
        users.push(data);
        // sessionStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("users", JSON.stringify(users));

    }
    
    addLine (dataUser) {
        let tr = this.getTr(dataUser);
        this.tableEl.appendChild(tr);
        this.updateCount();
    };

    getTr(dataUser, tr = null) {
        if (tr === null) tr = document.createElement('tr');
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
               <button type="button" class="btn btn-danger  btn-delete btn-xs btn-flat">Excluir</button>
           </td>
         
         `;
      this.addEventsTr(tr);
      return tr;

    }
}