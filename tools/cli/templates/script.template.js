import components from 'coherent-gameface-components';
import template from './template.html';
import style from './style.css';
 
class ${this.className} extends HTMLElement {
    constructor() {
        super();
        this.template = template;
        components.importStyleTag('${this.componentName}', style);
        this.url = '/components/${this.componentName}/template.html';
    }
    connectedCallback() {
        components.loadResource(this)
            .then((result) => {
                this.template = result.template;
                components.renderOnce(this);
            })
            .catch(err => console.error(err));
    }
}
components.defineCustomElement('${this.componentName}', ${this.className});
export default ${this.className};