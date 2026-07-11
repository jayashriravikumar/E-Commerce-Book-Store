import{a as e,n as t,t as n}from"./jsx-runtime-n5LQ9ujS.js";import{$ as r}from"./index-D6o2UO2S.js";var i=e(t(),1),a=n(),o=()=>{let[e,t]=(0,i.useState)([]),[n,o]=(0,i.useState)(!0),[s,c]=(0,i.useState)(!1),[l,u]=(0,i.useState)(!1),[d,f]=(0,i.useState)(null),[p,m]=(0,i.useState)(``),[h,g]=(0,i.useState)(``),[_,v]=(0,i.useState)(``),[y,b]=(0,i.useState)(``),[x,S]=(0,i.useState)(``),[C,w]=(0,i.useState)(``),[T,E]=(0,i.useState)(!0),[D,O]=(0,i.useState)(null),k=async()=>{try{let{data:e}=await r.get(`/api/v1/admin/coupons`);t(e.coupons)}catch(e){console.error(e)}o(!1)};return(0,i.useEffect)(()=>{k()},[]),n?(0,a.jsx)(`div`,{className:`text-center mt-10`,children:`Loading Coupon Management...`}):(0,a.jsxs)(`div`,{className:`min-h-screen bg-gray-100 py-6 md:py-10 px-3 md:px-6`,children:[(0,a.jsxs)(`div`,{className:`max-w-6xl mx-auto`,children:[(0,a.jsxs)(`div`,{className:`flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 md:mb-8`,children:[(0,a.jsx)(`h1`,{className:`text-2xl md:text-3xl font-bold`,children:`Coupon Management`}),(0,a.jsx)(`button`,{onClick:()=>c(!0),className:`\r
w-full\r
md:w-auto\r
bg-blue-600\r
hover:bg-blue-700\r
text-white\r
px-5\r
py-3\r
rounded-lg\r
transition\r
font-semibold\r
`,children:`+ Create Coupon`})]}),e.length===0?(0,a.jsx)(`div`,{className:`bg-white rounded-xl shadow-md p-8 text-center`,children:`No coupons available.`}):(0,a.jsx)(`div`,{className:`space-y-4`,children:e.map(e=>(0,a.jsxs)(`div`,{className:`\r
bg-white\r
rounded-xl\r
shadow-md\r
p-5\r
flex\r
flex-col\r
md:flex-row\r
justify-between\r
md:items-center\r
gap-5\r
hover:shadow-lg\r
transition\r
`,children:[(0,a.jsxs)(`div`,{className:`w-full`,children:[(0,a.jsx)(`h2`,{className:`text-xl font-bold`,children:e.code}),(0,a.jsxs)(`p`,{className:`text-gray-600`,children:[(0,a.jsx)(`strong`,{children:`Discount:`}),` `,e.discount,`%`]}),(0,a.jsxs)(`p`,{className:`text-gray-600`,children:[(0,a.jsx)(`strong`,{children:`Expiry:`}),` `,e.expiryDate?new Date(e.expiryDate).toLocaleDateString():`Not Set`]}),(0,a.jsxs)(`p`,{className:`text-gray-600`,children:[(0,a.jsx)(`strong`,{children:`Minimum Order:`}),` ₹`,e.minimumOrderAmount??0]}),(0,a.jsxs)(`p`,{className:`text-gray-600`,children:[(0,a.jsx)(`strong`,{children:`Usage:`}),` `,e.usedCount??0,` / `,e.usageLimit??`Unlimited`]}),(0,a.jsxs)(`p`,{className:`text-gray-600`,children:[(0,a.jsx)(`strong`,{children:`Maximum Discount:`}),` ₹`,e.maximumDiscount??`Unlimited`]}),(0,a.jsx)(`p`,{className:`font-semibold ${e.active?`text-green-600`:`text-red-600`}`,children:e.active?`Active`:`Inactive`})]}),(0,a.jsxs)(`div`,{className:`flex flex-col sm:flex-row gap-3 w-full md:w-auto`,children:[(0,a.jsx)(`button`,{onClick:()=>{O(e),m(e.code),g(e.discount),E(e.active),v(e.expiryDate?new Date(e.expiryDate).toISOString().split(`T`)[0]:``),b(e.minimumOrderAmount||``),S(e.usageLimit||``),w(e.maximumDiscount||``),c(!0)},className:`\r
w-full\r
md:w-auto\r
bg-yellow-500\r
hover:bg-yellow-600\r
text-white\r
px-4\r
py-3\r
rounded-lg\r
font-medium\r
`,children:`Edit`}),(0,a.jsx)(`button`,{onClick:()=>{f(e),u(!0)},className:`\r
w-full\r
md:w-auto\r
bg-red-600\r
hover:bg-red-700\r
text-white\r
px-4\r
py-3\r
rounded-lg\r
font-medium\r
`,children:`Delete`})]})]},e._id))})]}),s&&(0,a.jsx)(`div`,{className:`fixed inset-0 bg-white flex items-center justify-center`,children:(0,a.jsxs)(`div`,{className:`\r
bg-white\r
rounded-xl\r
shadow-lg\r
p-5\r
w-[95%]\r
max-w-md\r
max-h-[90vh]\r
overflow-y-auto\r
`,children:[(0,a.jsx)(`h2`,{className:`text-2xl font-bold mb-4`,children:D?`Edit Coupon`:`Create Coupon`}),(0,a.jsxs)(`div`,{className:`space-y-4`,children:[(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`label`,{className:`block mb-1 font-medium`,children:`Coupon Code`}),(0,a.jsx)(`input`,{type:`text`,value:p,onChange:e=>m(e.target.value),className:`w-full border rounded-lg p-2`,placeholder:`SAVE20`})]}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`label`,{className:`block mb-1 font-medium`,children:`Discount (%)`}),(0,a.jsx)(`input`,{type:`number`,value:h,onChange:e=>g(e.target.value),className:`w-full border rounded-lg p-2`,placeholder:`20`})]}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`label`,{className:`block mb-1 font-medium`,children:`Expiry Date`}),(0,a.jsx)(`input`,{type:`date`,value:_,onChange:e=>v(e.target.value),className:`w-full border rounded-lg p-2`})]}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`label`,{className:`block mb-1 font-medium`,children:`Minimum Order Amount (₹)`}),(0,a.jsx)(`input`,{type:`number`,value:y,onChange:e=>b(e.target.value),className:`w-full border rounded-lg p-2`})]}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`label`,{className:`block mb-1 font-medium`,children:`Usage Limit`}),(0,a.jsx)(`input`,{type:`number`,value:x,onChange:e=>S(e.target.value),className:`w-full border rounded-lg p-2`})]}),(0,a.jsxs)(`div`,{children:[(0,a.jsx)(`label`,{className:`block mb-1 font-medium`,children:`Maximum Discount (₹)`}),(0,a.jsx)(`input`,{type:`number`,value:C,onChange:e=>w(e.target.value),className:`w-full border rounded-lg p-2`})]}),(0,a.jsxs)(`div`,{className:`flex items-center gap-2`,children:[(0,a.jsx)(`input`,{type:`checkbox`,checked:T,onChange:e=>E(e.target.checked)}),(0,a.jsx)(`label`,{children:`Active Coupon`})]})]}),(0,a.jsxs)(`div`,{className:`flex justify-end gap-3 mt-6`,children:[(0,a.jsx)(`button`,{onClick:()=>c(!1),className:`bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg`,children:`Cancel`}),(0,a.jsx)(`button`,{onClick:D?async()=>{try{await r.put(`/api/v1/admin/coupon/${D._id}`,{code:p,discount:h,active:T,expiryDate:_,minimumOrderAmount:y,usageLimit:x,maximumDiscount:C}),c(!1),O(null),m(``),g(``),E(!0),k()}catch(e){console.error(e)}}:async()=>{console.log(`Create Coupon button clicked`);try{await r.post(`/api/v1/coupon/create`,{code:p,discount:h,active:T,expiryDate:_,minimumOrderAmount:y,usageLimit:x,maximumDiscount:C}),c(!1),m(``),g(``),E(!0),k()}catch(e){console.error(`Axios Error:`,e),console.error(`Response:`,e.response),console.error(`Response Data:`,e.response?.data)}},className:`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg`,children:D?`Update Coupon`:`Save Coupon`})]})]})}),l&&(0,a.jsx)(`div`,{className:`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`,children:(0,a.jsxs)(`div`,{className:`\r
bg-white\r
rounded-xl\r
shadow-xl\r
p-5\r
w-[95%]\r
max-w-md\r
`,children:[(0,a.jsx)(`h2`,{className:`text-2xl font-bold text-red-600 mb-4`,children:`Delete Coupon`}),(0,a.jsx)(`p`,{className:`text-gray-700 mb-2`,children:`Are you sure you want to delete this coupon?`}),(0,a.jsxs)(`div`,{className:`bg-gray-100 rounded-lg p-3 mb-6`,children:[(0,a.jsx)(`p`,{className:`font-bold`,children:d?.code}),(0,a.jsxs)(`p`,{className:`text-gray-600`,children:[d?.discount,`% Discount`]})]}),(0,a.jsxs)(`div`,{className:`flex flex-col sm:flex-row justify-end gap-3`,children:[(0,a.jsx)(`button`,{onClick:()=>{u(!1),f(null)},className:`bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg`,children:`Cancel`}),(0,a.jsx)(`button`,{onClick:async()=>{try{await r.delete(`/api/v1/admin/coupon/${d._id}`),u(!1),f(null),k()}catch(e){console.error(e)}},className:`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg`,children:`Delete`})]})]})})]})};export{o as default};