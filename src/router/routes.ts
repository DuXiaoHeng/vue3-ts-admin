

import { RouteRecordRaw } from 'vue-router'
import Layout from '@/Layout'

const menuList: Array<RouteRecordRaw> = [
  {
    name: "auditProcess",
    path: "auditProcess",
    component: () => import('@/views/AuditProcess/index.vue'),
    meta: {
      title: "投诉审核",
      icon: 'el-icon-s-custom',
    },
  },
  {
    name: "pendingProcessList",
    path: "pendingProcessList",
    component: () => import('@/views/PendingProcessList/index.vue'),
    meta: {
      title: "代办",
      icon: 'el-icon-s-grid',
    },
  },
  {
    name: "processedProcessList",
    path: "processedProcessList",
    component: () => import('@/views/ProcessedProcessList/index.vue'),
    meta: {
      title: "已处理",
      icon: 'el-icon-s-grid',
    },
  },
  {
    name: "myProcessList",
    path: "myProcessList",
    component: () => import('@/views/MyProcessList/index.vue'),
    meta: {
      title: "我的投诉",
      icon: 'el-icon-s-grid',
    },
  },
  {
    name: "newProcess",
    path: "newProcess",
    component: () => import('@/views/NewProcess/index.vue'),
    meta: {
      title: "发起投诉",
      icon: 'el-icon-circle-plus',
    },
  },
  {
    name: "dataReport",
    path: "dataReport",
    component: () => import('@/views/DataReport/index.vue'),
    meta: {
      title: "数据报表",
      icon: 'el-icon-location',
    },
    children: [
      {
        name: "dataReport1",
        path: "dataReport1",
        component: () => import('@/views/DataReport/components/DataReport1.vue'),
        meta: {
          title: "报表1",
          icon: 'el-icon-s-marketing',
        },
      },
      {
        name: "dataReport2",
        path: "dataReport2",
        component: () => import('@/views/DataReport/components/DataReport2.vue'),
        meta: {
          title: "报表2",
          icon: 'el-icon-s-marketing',
        },
      }
    ]
  },
]


const routes: Array<RouteRecordRaw> = [
  {
    name: "/",
    path: "/",
    component: Layout,
    redirect: '/home',
    children: [
      {
        name: "home",
        path: "home",
        component: import('@/views/Home/index.vue'),
        meta: {
          title: "首页",
          icon: '',
          hideMenu: true,
        },
      },
    ],
  },
]

routes[0].children?.push(...menuList)

export default routes;

export {
  menuList
}