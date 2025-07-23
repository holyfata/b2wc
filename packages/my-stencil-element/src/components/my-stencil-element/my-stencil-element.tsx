import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'my-stencil-element',
  styleUrl: 'my-stencil-element.css',
  shadow: true,
})
export class MyStencilElement {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
