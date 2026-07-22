import{a as e,n as t,t as n}from"./jsx-runtime-n5LQ9ujS.js";import{F as r,I as i,P as a,j as o,lt as s,n as c,nt as l,rt as u}from"./index-D6o2UO2S.js";var d=e(t(),1),f=n(),p=()=>{let{user:e,error:t,success:n,loading:p}=u(e=>e.user),m=l(),h=s(),[g,_]=(0,d.useState)(``),[v,y]=(0,d.useState)(``),[b,x]=(0,d.useState)(``),[S,C]=(0,d.useState)(`../src/assets/profile.avif`);return(0,d.useEffect)(()=>{e&&(_(e.name),y(e.email),e.avatar?.url&&C(e.avatar.url)),t&&(c.error(t,{position:`top-center`,autoClose:3e3}),m(a())),n&&(c.success(`Profile updated Successfully`,{position:`top-center`,autoClose:3e3}),h(`/profile`),m(r()))},[e,m,t,n]),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(o,{}),(0,f.jsxs)(`div`,{className:`min-h-screen bg-gray-50 flex flex-col\r
    items-center py-12 sm:px-6 lg:px-8 pt-24`,children:[(0,f.jsx)(`div`,{className:`sm:mx-auto sm:w-full sm:max-w-md`,children:(0,f.jsx)(`h2`,{className:`mt-6 text-center text-3xl\r
        font-extrabold text-gray-900`,children:`Update Profile`})}),(0,f.jsx)(`div`,{className:`mt-8 sm:mx-auto sm:w-full\r
      sm:max-w-md`,children:(0,f.jsx)(`div`,{className:`bg-white py-10 px-6 shadow-xl\r
        rounded sm:px-10 border border-gray-100`,children:(0,f.jsxs)(`form`,{encType:`multipart/form-data`,onSubmit:e=>{e.preventDefault();let t=new FormData;t.set(`name`,g),t.set(`email`,v),b&&t.set(`avatar`,b),m(i(t))},className:`space-y-6`,children:[(0,f.jsxs)(`div`,{className:`flex flex-col items-center mb-6`,children:[(0,f.jsx)(`div`,{className:`w-28 h-28 mb-4`,children:(0,f.jsx)(`img`,{src:S,alt:`Avatar Preview`,className:`rounded-full w-full h-full\r
            object-cover border-4 border-indigo-100\r
            shadow-sm`})}),(0,f.jsxs)(`label`,{className:`block bg-indigo-50 text-indigo-700 px-4\r
            py-2 rounded-lg font-semibold text-sm cursor-pointer\r
            hover:bg-indigo-100 transition`,children:[`Change Photo`,(0,f.jsx)(`input`,{type:`file`,accept:`image/*`,className:`hidden`,onChange:e=>{let t=new FileReader;t.onload=()=>{t.readyState==2&&(C(t.result),x(t.avatar))},t.readAsDataURL(e.target.files[0])},name:`avatar`})]})]}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`label`,{htmlFor:`name`,className:`block text-sm \r
  font-semibold text-gray-700`,children:`Name`}),(0,f.jsx)(`div`,{className:`mt-1`,children:(0,f.jsx)(`input`,{id:`name`,name:`name`,type:`text`,value:g,onChange:e=>_(e.target.value),required:!0,className:`appearance-none block w-full px-4 py-3\r
      border border-gray-200 rounded-xl shadow-sm\r
      placeholder-gray-400 focus:outline-none focus:ring-2\r
      focus:ring-indigo-500 focus:border-transparent\r
      transition-all`})})]}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`label`,{htmlFor:`name`,className:`block text-sm \r
  font-semibold text-gray-700`,children:`Email address`}),(0,f.jsx)(`div`,{className:`mt-1`,children:(0,f.jsx)(`input`,{id:`email`,name:`email`,type:`email`,required:!0,value:v,onChange:e=>y(e.target.value),className:`appearance-none block w-full px-4 py-3\r
      border border-gray-200 rounded-xl shadow-sm\r
      placeholder-gray-400 focus:outline-none focus:ring-2\r
      focus:ring-indigo-500 focus:border-transparent\r
      transition-all`})})]}),(0,f.jsx)(`div`,{className:`pt-2`,children:(0,f.jsx)(`button`,{type:`submit`,className:`w-full flex justify-center py-3 px-4 border\r
       border-transparent rounded-xl shadow-md shadow-indigo-200 \r
       text-sm font-bold text-white bg-indigo-600\r
        hover:bg-indigo-700 active:scale-[0.98]`,children:`Update Details`})})]})})})]})]})};export{p as default};