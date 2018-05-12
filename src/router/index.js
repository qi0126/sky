import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import login from '@/pages/login/login'

import element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(element);

//原料管理
import checkGoldWare from '@/pages/materControl/checkGoldWare' //验料（金库）
import editGoldWare from '@/pages/materControl/editGoldWare' //验料（金库）编辑
import checkGoldTest from '@/pages/materControl/checkGoldTest' //验料（测金）
import editGoldTest from '@/pages/materControl/editGoldTest' //验料（测金）编辑
import checkReceiveMater from '@/pages/materControl/checkReceiveMater' //收料
import editReceiveMater from '@/pages/materControl/editReceiveMater' //收料编辑
import checkSendMater from '@/pages/materControl/checkSendMater' //发料
import editSendMater from '@/pages/materControl/editSendMater' //发料编辑
import checkPurify from '@/pages/materControl/checkPurify' //提纯
import editPurify from '@/pages/materControl/editPurify' //提纯编辑
import checkGoldStock from '@/pages/materControl/checkGoldStock' //金料库存列表
import editGoldStock from '@/pages/materControl/editGoldStock' //金料库存列表编辑
import checkMaterToOrna from '@/pages/materControl/checkMaterToOrna' //料转饰
import editMaterToOrna from '@/pages/materControl/editMaterToOrna' //料转饰编辑
import checkOrnaToMater from '@/pages/materControl/checkOrnaToMater' //饰转料
import editOrnaToMater from '@/pages/materControl/editOrnaToMater' //饰转料编辑

//客户管理
import customerManageDisp from '@/pages/customerManage/customerManageDisp' //客户管理
import customerManageView from '@/pages/customerManage/customerManageView' //客户详细查看
import customerManageEdit from '@/pages/customerManage/customerManageEdit' //客户详细编辑


//用户管理
import userManageDisp from '@/pages/userManage/userManageDisp' //用户管理
// import userManageView from '@/pages/userManage/userManageView' //用户详细查看（暂不用。之后可删除）
import userManageEdit from '@/pages/userManage/userManageEdit' //用户详细编辑
import userManageCreate from '@/pages/userManage/userManageCreate' //创建新用户
import roleAuthoManage from '@/pages/userManage/roleAuthoManage' //角色权限管理

//库存管理
import stockEnterDisp from '@/pages/stockManage/stockEnterDisp' //进库单查看
import stockEnterEdit from '@/pages/stockManage/stockEnterEdit' //进库单详细编辑
import stockLeaveDisp from '@/pages/stockManage/stockLeaveDisp' //出库单查看
import stockLeaveEdit from '@/pages/stockManage/stockLeaveEdit' //出库单详细编辑
import stockAllotDisp from '@/pages/stockManage/stockAllotDisp' //调拨单查看
import stockAllotEdit from '@/pages/stockManage/stockAllotEdit' //调拨单详细查看
import saveOweDisp from '@/pages/stockManage/saveOweDisp' //存欠表查看
import saveOweEdit from '@/pages/stockManage/saveOweEdit' //存欠表详细查看

//产品管理
import productView from '@/pages/productManage/productView' //产品管理查看
import productEdit from '@/pages/productManage/productEdit' //产品管理编辑

//公司管理
import companyView from '@/pages/companyManage/companyView' //公司管理查看
import companyEdit from '@/pages/companyManage/companyEdit' //公司管理编辑

//系统设置
import codeRuleView from '@/pages/codeRule/codeRuleView' //公司管理查看
import codeRuleEdit from '@/pages/codeRule/codeRuleEdit' //公司管理编辑
import dataBase from '@/pages/codeRule/dataBase' //库位列表
import materMoveView from '@/pages/codeRule/materMoveView' //库存移动记录查看
import materMoveEdit from '@/pages/codeRule/materMoveEdit' //库存移动记录编辑

//财务管理
import goldPriceView from '@/pages/financialManage/goldPriceView' //金价变更记录查看
import goldPriceEdit from '@/pages/financialManage/goldPriceEdit' //金价变更记录编辑

//首页框架（包含菜单）
import Index from '@/pages/index/index'


Vue.use(Router)
Vue.prototype.$axios = Axios

export default new Router({
  routes: [{
      path: '/',
      name: 'Index',
      redirect: '/index/checkGoldWare'
    },
    {
      path: '/login',
      component: login,
    },
    {
      path: '/Index',
      component: Index,
      children: [{
          path: '/',
          component: checkGoldWare
        },
        {
          path: 'checkGoldWare', //验料（金库）
          component: checkGoldWare
        },
        {
          path: 'editGoldWare', //验料（金库）编辑
          component: editGoldWare
        },
        {
          path: 'checkGoldTest', //验料（测金）
          component: checkGoldTest
        },
        {
          path: 'editGoldTest', //验料（测金）编辑
          component: editGoldTest
        },
        {
          path: 'checkReceiveMater', //收料
          component: checkReceiveMater
        },
        {
          path: 'editReceiveMater', //收料编辑
          component: editReceiveMater
        },
        {
          path: 'checkSendMater', //发料
          component: checkSendMater
        },
        {
          path: 'editSendMater', //发料编辑
          component: editSendMater
        },
        {
          path: 'checkPurify', //提纯
          component: checkPurify
        },
        {
          path: 'editPurify', //提纯编辑
          component: editPurify
        },
        {
          path: 'checkGoldStock', //金料库存列表
          component: checkGoldStock
        },
        {
          path: 'editGoldStock', //金料库存列表编辑
          component: editGoldStock
        },
        {
          path: 'checkMaterToOrna', //料转饰
          component: checkMaterToOrna
        },
        {
          path: 'editMaterToOrna', //料转饰编辑
          component: editMaterToOrna
        },
        {
          path: 'checkOrnaToMater', //饰转料
          component: checkOrnaToMater
        },
        {
          path: 'editOrnaToMater', //饰转料编辑
          component: editOrnaToMater
        },
        {
          path: 'userManageDisp', //用户管理
          component: userManageDisp
        },
        // {
        //   path: 'userManageView', //用户详细查看
        //   component: userManageView
        // }, 
        {
          path: 'userManageEdit', //用户详细编辑
          component: userManageEdit
        },
        {
          path: 'roleAuthoManage', //角色权限管理
          component: roleAuthoManage
        },
        {
          path: 'userManageCreate', //创建新用户
          component: userManageCreate
        },
        {
          path: 'customerManageDisp', //客户管理
          component: customerManageDisp
        },
        {
          path: 'customerManageView', //客户详细查看
          component: customerManageView
        },
        {
          path: 'customerManageEdit', //客户详细编辑
          component: customerManageEdit
        },
        {
          path: 'stockEnterDisp', //入库单
          component: stockEnterDisp
        },
        {
          path: 'stockEnterEdit', //入库单查看编辑
          component: stockEnterEdit
        },
        {
          path: 'stockLeaveDisp', //出库单
          component: stockLeaveDisp
        },
        {
          path: 'stockLeaveEdit', //出库单查看编辑
          component: stockLeaveEdit
        },
        {
          path: 'stockAllotDisp', //调拨单
          component: stockAllotDisp
        },
        {
          path: 'stockAllotEdit', //调拨单查看编辑
          component: stockAllotEdit
        },
        {
          path: 'saveOweDisp', //存欠表
          component: saveOweDisp
        },
        {
          path: 'saveOweEdit', //存欠表查看编辑
          component: saveOweEdit
        },
        {
          path: 'productView', //产品查看
          component: productView
        },
        {
          path: 'productEdit', //产品编辑
          component: productEdit
        },
        {
          path: 'companyView', //公司管理查看
          component: companyView
        },
        {
          path: 'companyEdit', //公司管理编辑
          component: companyEdit
        },
        {
          path: 'codeRuleView', //编码规则查看
          component: codeRuleView
        },
        {
          path: 'codeRuleEdit', //编码规则编辑
          component: codeRuleEdit
        },
        {
          path: 'dataBase', //库位列表
          component: dataBase
        },
        {
          path: 'materMoveView', //库位移动记录查看
          component: materMoveView
        },
        {
          path: 'materMoveEdit', //库位移动记录编辑
          component: materMoveEdit
        },
        {
          path: 'goldPriceView', //金价变更记录查看
          component: goldPriceView
        },
        {
          path: 'goldPriceEdit', //金价变更记录编辑
          component: goldPriceEdit
        },
      ]
    }
  ]
})
