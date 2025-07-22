import App from './App.ce.vue'
import { defineCustomElement } from 'vue'

export const MyVueElement = defineCustomElement(App)
export const register = () => customElements.define("my-vue-element", MyVueElement)

register()
