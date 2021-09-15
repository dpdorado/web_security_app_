export default [
  {
    _name: 'CSidebarNav',
    _children: [   
      {
        _name: 'CSidebarNavItem',
        name: 'Home',
        to: '/dashboard',
        icon: 'cil-house',
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },      
      {
        _name: 'CSidebarNavTitle',
        _children: ['Pentesting']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Categorias de pruebas',
        to: '/category/list',
        icon: 'cil-list',       
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Pruebas de penetración',
        to: '/attack/list',
        icon: 'cil-list',       
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Paquetes de pruebas',
        to: '/package/list',
        icon: 'cil-list',       
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Ordenes',
        to: '/bill/list',
        icon: 'cil-list',       
      }
    ]
  }
]