!function(){function n(n,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}function t(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}function e(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{NELs:function(n,i,o){"use strict";o.r(i),o.d(i,"AddPostModule",(function(){return M}));var r=o("3Pt+"),a=o("AcyG"),c=o("PCNd"),s=o("tyNb"),u=o("pLZG"),b=o("xDUJ"),l=o("EBwW"),m=o("XKO9"),f=function(){var n=function n(t,i,o,r){e(this,n),this.title=t,this.message=i,this.uuid=o,this.language=r};return n.type="[Add Post] Save",n}(),d=o("fXoL"),h=o("ofXK"),p=o("JK/P"),g=o("ocnv"),z=o("B+r4"),v=o("PTRe"),C=o("OzZK"),E=o("RwU8"),w=o("C2AL"),y=o("FwiY"),S=o("sYmb");function L(n,t){1&n&&(d.Tb(0),d.Cc(1),d.hc(2,"translate"),d.Sb()),2&n&&(d.Cb(1),d.Ec(" ",d.ic(2,1,"ERROR.MAXLENGTH")," "))}function P(n,t){1&n&&(d.Tb(0),d.Cc(1),d.hc(2,"translate"),d.Sb()),2&n&&(d.Cb(1),d.Ec(" ",d.ic(2,1,"ERROR.MINLENGTH")," "))}function A(n,t){1&n&&(d.Tb(0),d.Cc(1),d.hc(2,"translate"),d.Sb()),2&n&&(d.Cb(1),d.Ec(" ",d.ic(2,1,"ERROR.REQUIRED")," "))}function k(n,t){if(1&n&&(d.Ac(0,L,3,3,"ng-container",12),d.Ac(1,P,3,3,"ng-container",12),d.Ac(2,A,3,3,"ng-container",12)),2&n){var e=t.$implicit;d.mc("ngIf",e.hasError("maxlength")),d.Cb(1),d.mc("ngIf",e.hasError("minlength")),d.Cb(1),d.mc("ngIf",e.hasError("required"))}}var T,O,R,j,U,q=[{path:"",component:(T=function(){function n(t,i,o){e(this,n),this.store=t,this.location=i,this.modalService=o,this.addForm=new r.f({title:new r.c(null,[r.q.required,r.q.minLength(10),r.q.maxLength(200)]),message:new r.c(null,[r.q.required,r.q.minLength(50),r.q.maxLength(1e3)])}),this.isLoading=!1}return t(n,[{key:"savePost",value:function(){var n=this;Object(b.a)(this.addForm),this.addForm.valid&&(this.isLoading=!0,this.store.dispatch(new f(this.addForm.value.title,this.addForm.value.message,this.store.selectSnapshot(m.b),this.store.selectSnapshot(m.a))).subscribe((function(){n.store.dispatch(new l.b),n.location.back(),n.isLoading=!1})))}},{key:"onCancel",value:function(){var n=this;this.addForm.dirty?this.modalService.cancelEditing().pipe(Object(u.a)(Boolean)).subscribe((function(){n.location.back()})):this.location.back()}}]),n}(),T.\u0275fac=function(n){return new(n||T)(d.Pb(a.h),d.Pb(h.h),d.Pb(p.a))},T.\u0275cmp=d.Jb({type:T,selectors:[["app-add-post-home"]],decls:24,vars:24,consts:[["nz-form","",3,"formGroup","ngSubmit"],["nzRequired","","nzFor","title",3,"nzSm","nzXs"],[3,"nzSm","nzXs","nzErrorTip"],["type","text","nz-input","","minlength","10","maxlength","200","formControlName","title","id","title"],["nzFor","message","nzRequired","",3,"nzSm","nzXs"],["rows","5","nz-input","","id","message","formControlName","message","minlength","50","maxlength","1000"],[1,"justify-center"],["nz-button","","nzSize","large","type","button",1,"mr4",3,"click"],["nz-icon","","nzType","left"],["nz-button","","nzSize","large","nzType","primary","type","submit",3,"nzLoading"],["nz-icon","","nzType","save"],["inputErrorsTemplate",""],[4,"ngIf"]],template:function(n,t){if(1&n&&(d.Vb(0,"form",0),d.dc("ngSubmit",(function(){return t.savePost()})),d.Vb(1,"nz-form-item"),d.Vb(2,"nz-form-label",1),d.Cc(3),d.hc(4,"translate"),d.Ub(),d.Vb(5,"nz-form-control",2),d.Qb(6,"input",3),d.Ub(),d.Ub(),d.Vb(7,"nz-form-item"),d.Vb(8,"nz-form-label",4),d.Cc(9),d.hc(10,"translate"),d.Ub(),d.Vb(11,"nz-form-control",2),d.Qb(12,"textarea",5),d.Ub(),d.Ub(),d.Vb(13,"nz-form-item",6),d.Vb(14,"button",7),d.dc("click",(function(){return t.onCancel()})),d.Qb(15,"i",8),d.Cc(16),d.hc(17,"translate"),d.Ub(),d.Vb(18,"button",9),d.Qb(19,"i",10),d.Cc(20),d.hc(21,"translate"),d.Ub(),d.Ub(),d.Ub(),d.Ac(22,k,3,3,"ng-template",null,11,d.Bc)),2&n){var e=d.tc(23);d.mc("formGroup",t.addForm),d.Cb(2),d.mc("nzSm",6)("nzXs",24),d.Cb(1),d.Ec(" ",d.ic(4,16,"ADD.TITLE")," "),d.Cb(2),d.mc("nzSm",14)("nzXs",24)("nzErrorTip",e),d.Cb(3),d.mc("nzSm",6)("nzXs",24),d.Cb(1),d.Ec(" ",d.ic(10,18,"ADD.MESSAGE")," "),d.Cb(2),d.mc("nzSm",14)("nzXs",24)("nzErrorTip",e),d.Cb(5),d.Ec(" ",d.ic(17,20,"ADD.CANCEL")," "),d.Cb(2),d.mc("nzLoading",t.isLoading),d.Cb(2),d.Ec(" ",d.ic(21,22,"ADD.SUBMIT")," ")}},directives:[r.r,r.n,g.b,r.g,z.c,g.c,z.a,g.d,g.a,v.b,r.b,r.j,r.i,r.m,r.e,C.a,E.a,w.a,y.a,h.l],pipes:[S.c],encapsulation:2}),T)}],D=((O=function n(){e(this,n)}).\u0275mod=d.Nb({type:O}),O.\u0275inj=d.Mb({factory:function(n){return new(n||O)},imports:[[s.i.forChild(q)],s.i]}),O),F=o("Cfvw"),N=o("I/3d"),X=((R=function(){function n(t){e(this,n),this.firestore=t}return t(n,[{key:"savePost",value:function(n,t,e,i){var o={title:n,message:t,language:i,createdAt:new Date,likesCount:0,commentsCount:0,dislikesCount:0,uuid:e};return Object(F.a)(this.firestore.collection("posts").add(o))}}]),n}()).\u0275fac=function(n){return new(n||R)(d.Zb(N.a))},R.\u0275prov=d.Lb({token:R,factory:R.\u0275fac}),R),I=o("mrSG"),V=o("vkgz"),x=o("JIr8"),G=((U=function(){function n(t){e(this,n),this.addPostService=t}return t(n,[{key:"saveAddedPost",value:function(n,t){this.addPostService.savePost(t.title,t.message,t.uuid,t.language).pipe(Object(V.a)((function(){return n.dispatch(new l.b)})),Object(x.a)((function(t){throw n.dispatch(new l.a),t})))}}]),n}()).\u0275fac=function(n){return new(n||U)(d.Zb(X))},U.\u0275prov=d.Lb({token:U,factory:U.\u0275fac}),Object(I.b)([Object(a.a)(f)],U.prototype,"saveAddedPost",null),U=Object(I.b)([Object(a.f)({name:"addPost",defaults:null})],U)),M=((j=function n(){e(this,n)}).\u0275mod=d.Nb({type:j}),j.\u0275inj=d.Mb({factory:function(n){return new(n||j)},providers:[X],imports:[[c.a,D,r.h,r.p,a.e.forFeature([G])]]}),j)}}])}();