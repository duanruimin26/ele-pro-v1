(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5829fd35"],{"1ba2":function(t,e,a){"use strict";var n=a("37ac"),r=a.n(n);r.a},"37ac":function(t,e,a){},ad8f:function(t,e,a){"use strict";a.d(e,"a",function(){return r}),a.d(e,"c",function(){return l}),a.d(e,"b",function(){return s});var n=a("b775"),r=function(t){return Object(n["b"])({url:"/list/getBasicList",method:"get",params:t})},l=function(t){return Object(n["b"])({url:"/list/getPageList",method:"get",params:t})},s=function(t){return Object(n["b"])({url:"/list/getComplexList",method:"get",params:t})}},f5eb:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-card",[a("div",{attrs:{slot:"header"},slot:"header"},[t._v("基础表格")]),a("el-table",{attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"time",label:"日期"}}),a("el-table-column",{attrs:{prop:"name",label:"名字"}}),a("el-table-column",{attrs:{prop:"address",label:"地址"}})],1)],1),a("el-card",{staticStyle:{"margin-top":"20px","margin-bottom":"20px"}},[a("div",{attrs:{slot:"header"},slot:"header"},[t._v("带分页的表格")]),a("el-table",{attrs:{data:t.pageData,border:""}},[a("el-table-column",{attrs:{label:"序号"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s((t.currentPage-1)*t.pageSize+e.$index+1))])]}}])}),a("el-table-column",{attrs:{prop:"name",label:"姓名"}}),a("el-table-column",{attrs:{prop:"time",label:"时间"}}),a("el-table-column",{attrs:{prop:"status",label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:t._f("tagClass")(e.row.status)}},[t._v("\n            "+t._s(t._f("typeText")(e.row.status))+"\n          ")])]}}])}),a("el-table-column",{attrs:{prop:"address",label:"地址"}})],1),a("el-pagination",{staticClass:"fyDiv",attrs:{background:"","current-page":t.currentPage,"page-sizes":t.pageSizes,"page-size":t.pageSize,layout:"total, sizes, prev, pager, next",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},r=[],l=a("ad8f"),s={name:"TableList",data:function(){return{tableData:[],pageData:[],currentPage:1,pageSize:10,pageSizes:[10,20,30,40],total:0}},mounted:function(){this.getBasicTable(),this.getPageTable(this.currentPage,this.pageSize)},filters:{typeText:function(t){if(void 0!==t)return 1===t?"高兴":2===t?"痛苦":"悲伤"},tagClass:function(t){if(void 0!==t)return 1===t?"success":2===t?"warning":"danger"}},methods:{getBasicTable:function(){var t=this;Object(l["a"])({page:1,pageSize:5}).then(function(e){t.tableData=e.data.data})},getPageTable:function(t,e){var a=this;Object(l["c"])({page:t,pageSize:e}).then(function(t){a.pageData=t.data.data,a.total=t.data.total})},handleCurrentChange:function(t){this.currentPage=t,this.getPageTable(t,this.pageSize)},handleSizeChange:function(t){this.pageSize=t,this.getPageTable(this.currentPage,t)}}},i=s,o=(a("1ba2"),a("2877")),u=Object(o["a"])(i,n,r,!1,null,"8808b7d2",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-5829fd35.8a639ffd.js.map