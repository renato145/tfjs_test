(this.webpackJsonptfjs_test=this.webpackJsonptfjs_test||[]).push([[0],{26:function(e,t,a){e.exports=a(44)},37:function(e,t){},38:function(e,t){},39:function(e,t){},40:function(e,t,a){},44:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),l=a(10),r=a.n(l),o=a(8),i=(a(31),a(20)),s=(a(40),a(47)),u=a(48),m=a(55),f=a(49),d=a(50),b=a(51),E=a(52),p=a(53),g=a(54),j="https://cdn.glitch.com/5bf7c54b-c36f-4009-a191-186909fb788e%2Fcat_flickr_publicdomain.jpg",h=function(){var e=Object(n.useRef)(),t=Object(n.useRef)(),a=Object(n.useState)(j),l=Object(o.a)(a,2),r=l[0],h=l[1],y=Object(n.useState)(j),O=Object(o.a)(y,2),v=O[0],k=O[1],N=Object(n.useState)(),C=Object(o.a)(N,2),_=C[0],S=C[1],L=Object(n.useState)(),R=Object(o.a)(L,2),w=R[0],x=R[1];Object(n.useEffect)((function(){i.a().then((function(e){S(e),console.log("model loaded")}))}),[]),Object(n.useEffect)((function(){x("")}),[v]);return c.a.createElement(s.a,null,c.a.createElement("header",null,c.a.createElement("h1",{className:"mt-4 mb-4"},"tfjs test")),c.a.createElement("main",null,c.a.createElement(u.a,{className:"mb-3"},c.a.createElement(m.a,{value:r,onChange:function(e){return h(e.target.value)},onClick:function(){return h("")},onBlur:function(){return h(v)},placeholder:"Image url","aria-label":"Image url"}),c.a.createElement(u.a.Append,null,c.a.createElement(f.a,{variant:"outline-secondary",onClick:function(){k(r)},disabled:!_},"Load image url")),c.a.createElement(u.a.Append,null,c.a.createElement("input",{ref:t,type:"file",style:{display:"none"},accept:"image/*",onChange:function(e){var t=URL.createObjectURL(e.target.files[0]);k(t),h(t)}}),c.a.createElement(f.a,{variant:"outline-secondary",onClick:function(){return t.current.click()},disabled:!_},"Upload image"))),c.a.createElement(d.a,{className:"justify-content-center"},c.a.createElement(b.a,{md:8},c.a.createElement(E.a,{crossOrigin:"anonymous",className:"w-100 mb-2",ref:e,src:v}),c.a.createElement("div",{className:"mb-2 ml-2"},c.a.createElement(f.a,{variant:"outline-secondary",onClick:function(){_.classify(e.current).then((function(e){console.log("Predictions:"),console.log(e);var t=e.map((function(e){return"".concat(e.className," (").concat(e.probability.toFixed(2),")")}));x(t)}))},disabled:!_},_?"Classify this!":c.a.createElement(c.a.Fragment,null,"Loading model... ",c.a.createElement(p.a,{animation:"border",size:"sm"})))),w&&c.a.createElement(g.a,{variant:"primary"},c.a.createElement("ol",null,w.map((function(e,t){return c.a.createElement("li",{key:t},e)})))))),c.a.createElement("div",{className:"justify-content-end"})),c.a.createElement("footer",null,c.a.createElement(d.a,null,c.a.createElement(b.a,{className:"mt-4 text-right"},c.a.createElement("a",{href:"https://github.com/renato145/tfjs_test",target:"_black"},"Source code")))))};r.a.render(c.a.createElement(h,null),document.getElementById("root"))}},[[26,1,2]]]);
//# sourceMappingURL=main.15623da7.chunk.js.map