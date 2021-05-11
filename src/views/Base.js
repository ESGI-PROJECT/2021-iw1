import { LitElement, css } from 'lit';

export default class Base extends LitElement {
  static get properties() {
    return {
      active: {
        type: Boolean,
        reflect: true
      }
    };
  }

  constructor() {
    super();
  }
}

export const style = css`
  :host {
    display: none;
  }
  :host([active]) {
    display: block;
  }
`;
