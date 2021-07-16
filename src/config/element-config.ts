import { App } from 'vue'
import { 
  ElButton, 
  ElSelect,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDropdown,
  ElDropdownItem,
  ElTabs,  
  ElScrollbar,
  ElMenuItem,
  ElSubmenu,
  ElDropdownMenu,
  ElTabPane,
} from 'element-plus';

const components = [
  ElButton, 
  ElSelect,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDropdown,
  ElDropdownItem,
  ElTabs,
  ElScrollbar,
  ElMenuItem,
  ElSubmenu,
  ElDropdownMenu,
  ElTabPane,
]

const elOption = {
  size: 'small', 
  zIndex: 3000,
}

const elComponent = {
  install (app: App) {
    components.forEach(el => {
      app.component(el.name, el);
    })
  }
}

export {
  elOption,
  elComponent,
}