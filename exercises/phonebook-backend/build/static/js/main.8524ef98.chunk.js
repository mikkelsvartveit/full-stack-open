(this["webpackJsonp2.6-2.10"]=this["webpackJsonp2.6-2.10"]||[]).push([[0],{42:function(e,n,t){"use strict";t.r(n);var c=t(0),r=t(1),a=t.n(r),u=t(17),i=t.n(u),o=(t(8),t(18)),s=t(3),d=function(e){return Object(c.jsx)("div",{children:Object(c.jsxs)("p",{children:["filter shown with ",Object(c.jsx)("input",{type:"text",onChange:e.onChange})]})})},j=function(e){var n=e.persons,t=e.deleteName;return Object(c.jsx)("div",{children:n.map((function(e){return Object(c.jsxs)("p",{children:[e.name," ",e.number," ",Object(c.jsx)("button",{onClick:function(){return t(e.id)},children:"Delete"})]},e.id)}))})},l=function(e){var n=e.newName,t=e.handleNewNameChange,r=e.newNumber,a=e.handleNewNumberChange,u=e.addName;return Object(c.jsxs)("form",{children:[Object(c.jsxs)("div",{children:["name: ",Object(c.jsx)("input",{value:n,onChange:t})]}),Object(c.jsxs)("div",{children:["number: ",Object(c.jsx)("input",{value:r,onChange:a})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",onClick:u,children:"add"})})]})},b=t(5),h=t.n(b),f="/api/persons",m=function(){return h.a.get(f).then((function(e){return e.data}))},O=function(e){return h.a.post(f,e).then((function(e){return e.data}))},x=function(e){return h.a.delete("".concat(f,"/").concat(e))},g=function(e,n){return h.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){var n=e.message;return null===n?null:Object(c.jsx)("div",{className:"success",children:n})},v=function(){var e=Object(r.useState)([]),n=Object(s.a)(e,2),t=n[0],a=n[1],u=Object(r.useState)(""),i=Object(s.a)(u,2),b=i[0],h=i[1],f=Object(r.useState)(""),v=Object(s.a)(f,2),w=v[0],N=v[1],C=Object(r.useState)(""),S=Object(s.a)(C,2),k=S[0],D=S[1],T=Object(r.useState)(null),y=Object(s.a)(T,2),F=y[0],L=y[1];Object(r.useEffect)((function(){m().then((function(e){return a(e)}))}),[]);var P=t.filter((function(e){return e.name.toLowerCase().includes(k.toLowerCase())}));return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(d,{onChange:function(e){D(e.target.value),console.log()}}),Object(c.jsx)("h3",{children:"add a new"}),Object(c.jsx)(l,{newName:b,handleNewNameChange:function(e){h(e.target.value)},newNumber:w,handleNewNumberChange:function(e){N(e.target.value)},addName:function(e){e.preventDefault();var n=t.find((function(e){return e.name===b}));if(n){if(window.confirm("".concat(b," is already added to phonebook, replace the old number with a new one?"))){var c=n.id;g(c,{name:n.name,number:w}).then((function(e){a(t.map((function(n){return n.id===e.id?e:n}))),L("Changed ".concat(n.name,"'s number")),setTimeout((function(){return L(null)}),3e3)}))}}else O({name:b,number:w}).then((function(e){a([].concat(Object(o.a)(t),[e])),L("Added ".concat(b)),setTimeout((function(){return L(null)}),3e3)})),h(""),N("")}}),Object(c.jsx)(p,{message:F}),Object(c.jsx)("h3",{children:"Numbers"}),Object(c.jsx)(j,{persons:P,deleteName:function(e){var n=t.find((function(n){return n.id===e})).name;window.confirm("Delete ".concat(n,"?"))&&x(e).then((function(){a(t.filter((function(n){return n.id!==e}))),L("Deleted ".concat(n)),setTimeout((function(){return L(null)}),3e3)}))}})]})},w=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,43)).then((function(n){var t=n.getCLS,c=n.getFID,r=n.getFCP,a=n.getLCP,u=n.getTTFB;t(e),c(e),r(e),a(e),u(e)}))};i.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(v,{})}),document.getElementById("root")),w()},8:function(e,n,t){}},[[42,1,2]]]);
//# sourceMappingURL=main.8524ef98.chunk.js.map