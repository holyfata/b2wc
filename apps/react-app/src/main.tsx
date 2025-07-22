import { createRoot } from 'react-dom/client'
import "my-vue-element"
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <App />,
)
