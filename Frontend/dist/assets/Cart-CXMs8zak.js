import{a as e,n as t,t as n}from"./jsx-runtime-n5LQ9ujS.js";import{_ as r,b as i,g as a,h as o,lt as s,nt as c,rt as l,v as u,x as d,y as f}from"./index-D6o2UO2S.js";var p=e(t(),1),m=n(),h=()=>{let{cartItems:e,savedItems:t}=l(e=>e.cart),n=c(),h=s(),[g,_]=p.useState(``),[v,y]=p.useState(0),b=e.reduce((e,t)=>e+t.price*t.quantity,0),x=b-b*v/100;return(0,m.jsx)(`div`,{className:`min-h-screen bg-gray-50`,children:(0,m.jsxs)(`div`,{className:`max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-8`,children:[(0,m.jsxs)(`div`,{className:`bg-white border border-gray-200 rounded-xl p-4 md:p-6 mb-6 md:mb-8 shadow-sm`,children:[(0,m.jsx)(`h1`,{className:`text-2xl md:text-4xl font-bold text-gray-900`,children:`Shopping Cart`}),(0,m.jsx)(`p`,{className:`mt-2 text-gray-500`,children:`Manage your selected books`})]}),e.length===0?(0,m.jsx)(`h2`,{className:`text-xl text-gray-600`,children:`Your Cart is Empty`}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(`div`,{className:`grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8`,children:[(0,m.jsx)(`div`,{className:`lg:col-span-2`,children:e.map(e=>(0,m.jsxs)(`div`,{className:`\r
bg-white\r
border\r
rounded-xl\r
p-3 md:p-4\r
mb-4\r
flex\r
flex-row\r
items-start\r
gap-3\r
shadow-sm\r
hover:shadow-lg\r
transition-all\r
duration-300\r
`,children:[(0,m.jsx)(`img`,{src:e.image?.[0]?.url||e.coverImage?.[0]?.url,alt:e.name||e.title,className:`w-24 h-32 md:w-28 md:h-40 object-contain bg-gray-50 rounded-xl p-2 flex-shrink-0`}),(0,m.jsxs)(`div`,{className:`flex-1 min-w-0`,children:[(0,m.jsxs)(`div`,{className:`flex flex-col md:flex-row justify-between items-start gap-4`,children:[(0,m.jsxs)(`div`,{children:[(0,m.jsx)(`h2`,{className:`font-semibold text-lg`,children:e.name||e.title||`Book Title`}),(0,m.jsxs)(`p`,{className:`text-gray-500 text-sm`,children:[`by `,e.author||`Unknown Author`]})]}),(0,m.jsxs)(`div`,{className:`flex items-center border rounded-lg overflow-hidden w-full md:w-auto justify-center`,children:[(0,m.jsx)(`button`,{onClick:()=>n(a(e._id)),className:`px-3 py-2 bg-gray-100 hover:bg-gray-200`,children:`-`}),(0,m.jsx)(`span`,{className:`px-4 font-semibold`,children:e.quantity}),(0,m.jsx)(`button`,{onClick:()=>n(r(e._id)),className:`px-3 py-2 bg-gray-100 hover:bg-gray-200`,children:`+`})]})]}),(0,m.jsxs)(`div`,{className:`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-3`,children:[(0,m.jsxs)(`div`,{children:[(0,m.jsxs)(`p`,{className:`text-orange-600 font-bold text-xl`,children:[`₹`,e.price]}),(0,m.jsxs)(`p`,{className:`text-sm text-green-600`,children:[e.stock,` items available`]})]}),(0,m.jsxs)(`div`,{className:`flex flex-col sm:flex-row w-full md:w-auto gap-2`,children:[(0,m.jsx)(`button`,{onClick:()=>n(d(e._id)),className:`\r
w-full sm:w-auto\r
px-4 py-2\r
bg-blue-600\r
text-white\r
rounded-lg\r
hover:bg-blue-700\r
transition\r
`,children:`Save For Later`}),(0,m.jsx)(`button`,{onClick:()=>n(f(e._id)),className:`\r
w-full sm:w-auto\r
px-4 py-2\r
bg-red-600\r
text-white\r
rounded-lg\r
hover:bg-red-700\r
transition\r
`,children:`Remove`})]})]})]})]},e._id))}),(0,m.jsx)(`div`,{className:`lg:col-span-1`,children:(0,m.jsxs)(`div`,{className:`bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-6 lg:sticky lg:top-24`,children:[(0,m.jsx)(`p`,{className:`text-sm text-gray-500 mb-4`,children:`Free delivery on eligible orders`}),(0,m.jsx)(`p`,{className:`text-green-600 text-sm font-medium mb-3`,children:`✓ Secure Checkout`}),(0,m.jsx)(`p`,{className:`text-green-600 text-sm font-medium mb-4`,children:`✓ Free Delivery`}),(0,m.jsx)(`h2`,{className:`text-xl md:text-2xl font-bold mb-4`,children:`Order Summary`}),(0,m.jsxs)(`p`,{className:`mb-2`,children:[`Total Books: `,e.length]}),(0,m.jsx)(`input`,{type:`text`,placeholder:`Enter Coupon Code`,value:g,onChange:e=>_(e.target.value),className:`w-full border p-2 rounded mb-2`}),(0,m.jsx)(`button`,{onClick:async()=>{try{let e=await(await fetch(`http://localhost:8000/api/v1/coupon/apply`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({code:g})})).json();e.success?(y(e.discount),alert(`Coupon Applied! ${e.discount}% OFF`)):alert(`Invalid Coupon`)}catch(e){console.log(e),alert(`Failed to apply coupon`)}},className:`w-full bg-green-600 text-white py-2 rounded mb-4`,children:`Apply Coupon`}),(0,m.jsxs)(`div`,{className:`space-y-3 mb-5`,children:[(0,m.jsxs)(`div`,{className:`flex justify-between`,children:[(0,m.jsx)(`span`,{children:`Subtotal`}),(0,m.jsxs)(`span`,{children:[`₹`,b.toFixed(2)]})]}),(0,m.jsxs)(`div`,{className:`flex justify-between`,children:[(0,m.jsx)(`span`,{children:`Discount`}),(0,m.jsxs)(`span`,{className:`text-green-600`,children:[v,`%`]})]}),(0,m.jsxs)(`div`,{className:`flex justify-between`,children:[(0,m.jsx)(`span`,{children:`Shipping`}),(0,m.jsx)(`span`,{className:`text-green-600`,children:`FREE`})]}),(0,m.jsx)(`hr`,{}),(0,m.jsxs)(`div`,{className:`flex justify-between text-xl font-bold`,children:[(0,m.jsx)(`span`,{children:`Total`}),(0,m.jsxs)(`span`,{className:`text-blue-600`,children:[`₹`,x.toFixed(2)]})]})]}),(0,m.jsx)(`button`,{onClick:()=>h(`/shipping`),className:`w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded`,children:`Proceed to Checkout`}),(0,m.jsx)(`button`,{onClick:()=>n(o()),className:`w-full mt-2 bg-black text-white py-3 rounded hover:bg-gray-800`,children:`Clear Cart`})]})})]}),t.length>0&&(0,m.jsxs)(`div`,{className:`mt-8`,children:[(0,m.jsx)(`div`,{className:`bg-white rounded-xl border p-5 mb-4`,children:(0,m.jsxs)(`div`,{className:`flex justify-between items-center`,children:[(0,m.jsx)(`h2`,{className:`text-2xl font-bold text-gray-900`,children:`Saved For Later`}),(0,m.jsxs)(`span`,{className:`bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium`,children:[t.length,` Books`]})]})}),t.map(e=>(0,m.jsxs)(`div`,{className:`\r
bg-white\r
border\r
rounded-xl\r
p-3 md:p-4\r
mb-4\r
flex\r
flex-row\r
items-start\r
gap-3\r
 shadow-sm\r
  hover:shadow-md\r
  transition\r
`,children:[(0,m.jsx)(`img`,{src:e.image?.[0]?.url||e.coverImage?.[0]?.url,alt:e.name,className:`\r
w-24\r
h-32\r
md:w-28\r
md:h-40\r
object-contain\r
bg-gray-50\r
rounded-lg\r
p-2\r
flex-shrink-0\r
`}),(0,m.jsxs)(`div`,{className:`flex-1 min-w-0`,children:[(0,m.jsx)(`h2`,{className:`font-semibold text-xl`,children:e.name||e.title}),(0,m.jsxs)(`p`,{className:`text-gray-500 text-sm`,children:[`by `,e.author||`Unknown Author`]}),(0,m.jsxs)(`div`,{className:`mt-4`,children:[(0,m.jsxs)(`p`,{className:`text-orange-600 font-bold text-2xl`,children:[`₹`,e.price]}),(0,m.jsxs)(`p`,{className:`text-sm text-green-600`,children:[e.stock,` items available`]})]}),(0,m.jsxs)(`div`,{className:`flex gap-3 mt-5`,children:[(0,m.jsx)(`button`,{onClick:()=>n(u(e._id)),className:`bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg`,children:`Move To Cart`}),(0,m.jsx)(`button`,{onClick:()=>n(i(e._id)),className:`bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg`,children:`Remove`})]})]})]},e._id))]})]})]})})};export{h as default};