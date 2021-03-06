
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const menus = [

  {
    path: '',
    children: [
      {
        path: '/form/index',
        name: 'Form',
        meta: { title: 'Form', icon: 'form', noCache: false }
      }
    ]
  },

  {
    path: '',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: '/example/table',
        name: 'table',
        component: '/views/table/index',
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: '/example/tree',
        name: 'Tree',
        component: '/views/tree/index',
        meta: { title: 'Tree', icon: 'tree', noCache: false }
      }
    ]
  },
  {
    path: '',
    // component: Layout,
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: '/nested/menu1',
        component: '/views/nested/menu1/index', // Parent router-view
        name: 'nested/menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: '/views/nested/menu1/menu1-1',
            name: 'nested/menu1/menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: '/views/nested/menu1/menu1-2',
            name: 'nested/menu1/menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: '/views/nested/menu1/menu1-2/menu1-2-1',
                name: 'nested/menu1/menu1-2/menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: '/views/nested/menu1/menu1-2/menu1-2-2',
                name: 'nested/menu1/menu1-2/menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: '/views/nested/menu1/menu1-3',
            name: 'nested/menu1/menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'nested/menu2',
        component: '/views/nested/menu2/index',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    // component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }
]

export default [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // get menu
  {
    url: '/vue-admin-template/user/getMenu',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: menus
      }
    }
  }
]
