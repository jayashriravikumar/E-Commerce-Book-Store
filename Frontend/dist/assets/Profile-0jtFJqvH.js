import{a as e,n as t,t as n}from"./jsx-runtime-n5LQ9ujS.js";import{j as r,lt as i,ot as a,rt as o}from"./index-D6o2UO2S.js";var s=e(t(),1),c=n(),l=()=>{let{user:e,isAuthenticated:t,loading:n}=o(e=>e.user),l=i();return(0,s.useEffect)(()=>{t===!1&&l(`/login`)},[t]),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{}),(0,c.jsxs)(`div`,{className:`min-h-screen bg-gray-50\r
        flex flex-col items-center py-12 sm:px-6\r
        lg:px-8 pt-24`,children:[(0,c.jsx)(`div`,{className:`sm:mx-auto sm:w-full\r
        sm:max-w-md`,children:(0,c.jsx)(`h2`,{className:`mt-6 text-center\r
        text-3xl font-extrabold\r
        text-gray-900`,children:`My Profile`})}),(0,c.jsx)(`div`,{className:`mt-8 sm;mx-auto\r
        sm:w-full sm:max-w-xl`,children:(0,c.jsxs)(`div`,{className:`bg-white py-10 px-6\r
            shadow-sm rounded-2xl sm:px-12 flex\r
            flex-col items-center border\r
            border-gray-100`,children:[(0,c.jsx)(`div`,{className:`relative w-36 h-36\r
                mb-8 mt-2`,children:(0,c.jsx)(`img`,{src:e?.avatar?.url,alt:e?.name,title:e?.name,className:`rounded-full \r
                    w-full h-full object-cover border-4\r
                    border-indigo-100 shadow-lg`})}),(0,c.jsx)(`div`,{className:`w-full space-y-6`}),(0,c.jsxs)(`div`,{className:`bg-gray-50 p-4 rounded-xl\r
                border border-gray-100`,children:[(0,c.jsx)(`h4`,{className:`text-xs font-semibold\r
                    text-gray-400 uppercase tracking-wide\r
                    mb-1`,children:`Full Name`}),(0,c.jsx)(`p`,{className:`text-xl font-bold\r
                    text-gray-800 capitalize`,children:e?.name})]}),(0,c.jsxs)(`div`,{className:`bg-gray-50 p-4 rounded-xl\r
                border border-gray-100`,children:[(0,c.jsx)(`h4`,{className:`text-xs font-semibold\r
                    text-gray-400 uppercase tracking-wide\r
                    mb-1`,children:`Email Address`}),(0,c.jsx)(`p`,{className:`text-xl font-bold\r
                    text-gray-800`,children:e?.email})]}),(0,c.jsxs)(`div`,{className:`w-full mt-8 flex gap-4`,children:[(0,c.jsx)(a,{to:`/profile/update`,className:`flex-1 flex justify-center items-center py-3 px-4\r
        rounded shadow-md shadow-indigo-200 text-sm\r
        font-bold text-white bg-indigo-600\r
        hover:bg-indigo-700 transition-all active:scale-[0.98]`,children:`Edit Profile`}),(0,c.jsx)(a,{to:`/update-password`,className:`flex-1 flex justify-center items-center py-3 px-4\r
        rounded shadow-md shadow-indigo-200 text-sm\r
        font-bold text-white bg-indigo-600\r
        hover:bg-indigo-700 transition-all active:scale-[0.98]`,children:`Change Password`})]})]})})]})]})};export{l as default};