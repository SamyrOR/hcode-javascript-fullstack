class UserController {
    constructor (formId) {
        this.formEl = document.getElementById(formId)
    }

    getValues () {
        let user = {}
        this.formEl.elements.forEach(field => {
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