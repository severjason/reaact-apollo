const template = document.createElement('template');
template.innerHTML = '<style>:host { display: inline-block }</style><slot/>';

export default customElements.define('spinner-el',
    class extends HTMLElement {
      constructor() {
        super();

        this.attachShadow({
          mode: 'open',
        });
      }
      connectedCallback() {
        this.shadowRoot && this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.animate([
          { transform: 'scale(0) rotate(0deg)'},
          { transform: 'scale(1) rotate(1080deg)'}
        ], {
          duration: 1000,
          easing: 'cubic-bezier(.88, .02, .06, 1)',
          iterations: Infinity,
        });
      }
    }
  );