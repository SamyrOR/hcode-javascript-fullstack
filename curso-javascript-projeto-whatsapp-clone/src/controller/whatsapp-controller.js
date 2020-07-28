class WhatsAppController {
    constructor() {
        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
    }

    loadElements() {
        this.el = {};
        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.getCamelCase(element.id)] = element;
        })
    }

    elementsPrototype() {
        Element.prototype.hide = function() {
            this.style.display = 'none';
            return this
        }
        Element.prototype.show = function() {
            this.style.display = 'block';
        }
        Element.prototype.toggle = function() {
            this.style.display = (this.style.display === 'none') ? 'block' : 'none'
        }
        Element.prototype.on = function(events, fn) {
            events.split(' ').forEach(event => {
                this.addEventListener(event, fn);
            });
        }
        Element.prototype.css = function(styles){
            for (let name in styles) {
                this.style[name] = styles[name];
            }
        }
        Element.prototype.addClass = function(name){
            this.classList.add(name);
        }
        Element.prototype.removeClass = function(name){
            this.classList.remove(name);
        }
        Element.prototype.toggleClass = function(name){
            this.classList.toggle(name);
        }
        Element.prototype.hasClass = function(name){
            return this.classList.contains(name);
        }
        HTMLFormElement.prototype.getForm = function () {
            return new FormData(this);
        }
        HTMLFormElement.prototype.toJSON = function () {
            let json = {};
            this.getForm().forEach((value, key) => {
                json[key] = value;
            })
            return json;
        }
    }

    closeAllLeftPanel(){
        this.el.panelEditProfile.hide();
        this.el.panelAddContact.hide();
    }


    initEvents() {
        this.el.myPhoto.on('click', e=> {
            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            setTimeout(()=> {
                this.el.panelEditProfile.addClass('open');
            }, 100)
        });
        this.el.btnNewContact.on('click', e => {
            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(()=> {
                this.el.panelAddContact.addClass('open');
            }, 100)
        });
        this.el.btnClosePanelEditProfile.on('click', e=> {
            this.el.panelEditProfile.removeClass('open')
        })
        this.el.btnClosePanelAddContact.on('click', e=> {
            this.el.panelAddContact.removeClass('open')
        })
        this.el.photoContainerEditProfile.on('click', e=> {
          this.el.inputProfilePhoto.click()  
        })
        this.el.inputNamePanelEditProfile.on('keypress', e=> {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.el.btnSavePanelEditProfile.click()
            }
        })
        this.el.btnSavePanelEditProfile.on('click', e=> {
            console.log(this.el.inputNamePanelEditProfile.innerHTML);
        })
        this.el.formPanelAddContact.on('submit', e=> {
            e.preventDefault();
            let formData = new FormData(this.el.formPanelAddContact);   
        })
        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {
            item.on('click', e=> {
                this.el.home.hide();
                this.el.main.css({
                    display:'flex'
                })
            })
        })
        this.el.btnAttach.on('click', e=> {
            e.stopPropagation();
            this.el.menuAttach.addClass('open');
            document.addEventListener('click', this.closeMenuAttach.bind(this));
        })
        this.el.btnAttachPhoto.on('click', e=> {
            this.el.inputPhoto.click();
        });
        this.el.inputPhoto.on('change', e=> {
            console.log(this.el.inputPhoto.files);
            [...this.el.inputPhoto.files].forEach(file => {
                console.log(file);
            })
        })
        this.el.btnAttachCamera.on('click', e=> {
            this.el.panelMessagesContainer.hide();
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                'height':'calc(100% - 120px)'
            });
        });
        this.el.btnClosePanelCamera.on('click', e=> {
            this.el.panelCamera.removeClass('open');
            this.el.panelMessagesContainer.show();
        })
        this.el.btnTakePicture.on('click', e=> {
            console.log('take picture');
        })
        this.el.btnAttachDocument.on('click', e=> {
            console.log('Document');
        });
        this.el.btnAttachContact.on('click', e=> {
            console.log('Contact');
        });
    }

    closeMenuAttach(e){
        this.el.menuAttach.removeClass('open');
        document.removeEventListener('click', this.closeMenuAttach);
        console.log('remove menu')
    }

}