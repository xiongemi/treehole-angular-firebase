(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{NELs:function(t,n,e){"use strict";e.r(n),e.d(n,"AddPostModule",function(){return N});var r=e("3Pt+"),o=e("AcyG"),i=e("PCNd"),s=e("tyNb"),c=e("pLZG"),a=e("xDUJ"),b=e("EBwW"),l=e("XKO9");let m=(()=>{class t{constructor(t,n,e,r){this.title=t,this.message=n,this.uuid=e,this.language=r}}return t.type="[Add Post] Save",t})();var u=e("fXoL"),d=e("ofXK"),h=e("JK/P"),p=e("ocnv"),f=e("B+r4"),z=e("PTRe"),g=e("OzZK"),E=e("RwU8"),v=e("C2AL"),w=e("FwiY"),S=e("sYmb");function y(t,n){1&t&&(u.Ub(0),u.Ec(1),u.hc(2,"translate"),u.Tb()),2&t&&(u.Eb(1),u.Gc(" ",u.ic(2,1,"ERROR.MAXLENGTH")," "))}function R(t,n){1&t&&(u.Ub(0),u.Ec(1),u.hc(2,"translate"),u.Tb()),2&t&&(u.Eb(1),u.Gc(" ",u.ic(2,1,"ERROR.MINLENGTH")," "))}function L(t,n){1&t&&(u.Ub(0),u.Ec(1),u.hc(2,"translate"),u.Tb()),2&t&&(u.Eb(1),u.Gc(" ",u.ic(2,1,"ERROR.REQUIRED")," "))}function C(t,n){if(1&t&&(u.Cc(0,y,3,3,"ng-container",12),u.Cc(1,R,3,3,"ng-container",12),u.Cc(2,L,3,3,"ng-container",12)),2&t){const t=n.$implicit;u.mc("ngIf",t.hasError("maxlength")),u.Eb(1),u.mc("ngIf",t.hasError("minlength")),u.Eb(1),u.mc("ngIf",t.hasError("required"))}}const O=[{path:"",component:(()=>{class t{constructor(t,n,e){this.store=t,this.location=n,this.modalService=e,this.addForm=new r.g({title:new r.d(null,[r.r.required,r.r.minLength(10),r.r.maxLength(200)]),message:new r.d(null,[r.r.required,r.r.minLength(50),r.r.maxLength(1e3)])}),this.isLoading=!1}savePost(){Object(a.a)(this.addForm),this.addForm.valid&&(this.isLoading=!0,this.store.dispatch(new m(this.addForm.value.title,this.addForm.value.message,this.store.selectSnapshot(l.b),this.store.selectSnapshot(l.a))).subscribe(()=>{this.store.dispatch(new b.b),this.location.back(),this.isLoading=!1}))}onCancel(){this.addForm.dirty?this.modalService.cancelEditing().pipe(Object(c.a)(Boolean)).subscribe(()=>{this.location.back()}):this.location.back()}}return t.\u0275fac=function(n){return new(n||t)(u.Qb(o.h),u.Qb(d.i),u.Qb(h.a))},t.\u0275cmp=u.Kb({type:t,selectors:[["app-add-post-home"]],decls:24,vars:24,consts:[["nz-form","",3,"formGroup","ngSubmit"],["nzRequired","","nzFor","title",3,"nzSm","nzXs"],[3,"nzSm","nzXs","nzErrorTip"],["type","text","nz-input","","minlength","10","maxlength","200","formControlName","title","id","title"],["nzFor","message","nzRequired","",3,"nzSm","nzXs"],["rows","5","nz-input","","id","message","formControlName","message","minlength","50","maxlength","1000"],[1,"justify-center"],["nz-button","","nzSize","large","type","button",1,"mr4",3,"click"],["nz-icon","","nzType","left"],["nz-button","","nzSize","large","nzType","primary","type","submit",3,"nzLoading"],["nz-icon","","nzType","save"],["inputErrorsTemplate",""],[4,"ngIf"]],template:function(t,n){if(1&t&&(u.Wb(0,"form",0),u.dc("ngSubmit",function(){return n.savePost()}),u.Wb(1,"nz-form-item"),u.Wb(2,"nz-form-label",1),u.Ec(3),u.hc(4,"translate"),u.Vb(),u.Wb(5,"nz-form-control",2),u.Rb(6,"input",3),u.Vb(),u.Vb(),u.Wb(7,"nz-form-item"),u.Wb(8,"nz-form-label",4),u.Ec(9),u.hc(10,"translate"),u.Vb(),u.Wb(11,"nz-form-control",2),u.Rb(12,"textarea",5),u.Vb(),u.Vb(),u.Wb(13,"nz-form-item",6),u.Wb(14,"button",7),u.dc("click",function(){return n.onCancel()}),u.Rb(15,"i",8),u.Ec(16),u.hc(17,"translate"),u.Vb(),u.Wb(18,"button",9),u.Rb(19,"i",10),u.Ec(20),u.hc(21,"translate"),u.Vb(),u.Vb(),u.Vb(),u.Cc(22,C,3,3,"ng-template",null,11,u.Dc)),2&t){const t=u.tc(23);u.mc("formGroup",n.addForm),u.Eb(2),u.mc("nzSm",6)("nzXs",24),u.Eb(1),u.Gc(" ",u.ic(4,16,"ADD.TITLE")," "),u.Eb(2),u.mc("nzSm",14)("nzXs",24)("nzErrorTip",t),u.Eb(3),u.mc("nzSm",6)("nzXs",24),u.Eb(1),u.Gc(" ",u.ic(10,18,"ADD.MESSAGE")," "),u.Eb(2),u.mc("nzSm",14)("nzXs",24)("nzErrorTip",t),u.Eb(5),u.Gc(" ",u.ic(17,20,"ADD.CANCEL")," "),u.Eb(2),u.mc("nzLoading",n.isLoading),u.Eb(2),u.Gc(" ",u.ic(21,22,"ADD.SUBMIT")," ")}},directives:[r.s,r.o,p.b,r.h,f.c,p.c,f.a,p.d,p.a,z.b,r.c,r.k,r.j,r.n,r.f,g.a,E.a,v.a,w.a,d.m],pipes:[S.c],encapsulation:2}),t})()}];let T=(()=>{class t{}return t.\u0275mod=u.Ob({type:t}),t.\u0275inj=u.Nb({factory:function(n){return new(n||t)},imports:[[s.h.forChild(O)],s.h]}),t})();var G=e("Cfvw"),P=e("I/3d");let A=(()=>{class t{constructor(t){this.firestore=t}savePost(t,n,e,r){const o={title:t,message:n,language:r,createdAt:new Date,likesCount:0,commentsCount:0,dislikesCount:0,uuid:e};return Object(G.a)(this.firestore.collection("posts").add(o))}}return t.\u0275fac=function(n){return new(n||t)(u.ac(P.a))},t.\u0275prov=u.Mb({token:t,factory:t.\u0275fac}),t})();var j=e("mrSG"),k=e("vkgz"),D=e("JIr8");let F=(()=>{let t=class{constructor(t){this.addPostService=t}saveAddedPost(t,n){this.addPostService.savePost(n.title,n.message,n.uuid,n.language).pipe(Object(k.a)(()=>t.dispatch(new b.b)),Object(D.a)(n=>{throw t.dispatch(new b.a),n}))}};return t.\u0275fac=function(n){return new(n||t)(u.ac(A))},t.\u0275prov=u.Mb({token:t,factory:t.\u0275fac}),Object(j.b)([Object(o.a)(m)],t.prototype,"saveAddedPost",null),t=Object(j.b)([Object(o.f)({name:"addPost",defaults:null})],t),t})(),N=(()=>{class t{}return t.\u0275mod=u.Ob({type:t}),t.\u0275inj=u.Nb({factory:function(n){return new(n||t)},providers:[A],imports:[[i.a,T,r.i,r.q,o.e.forFeature([F])]]}),t})()}}]);