import{a as e,n as t,t as n}from"./jsx-runtime-n5LQ9ujS.js";import{$ as r,lt as i}from"./index-D6o2UO2S.js";var a=e(t(),1),o=n(),s=()=>{let[e,t]=(0,a.useState)([]),[n,s]=(0,a.useState)(!0),[c,l]=(0,a.useState)(``),u=i(),d=async()=>{try{let{data:e}=await r.get(`/api/v1/products`),n=e.products.filter(e=>(e.numOfReviews||0)>0);t(n)}catch(e){console.error(e)}s(!1)};(0,a.useEffect)(()=>{d()},[]);let f=e.filter(e=>(e.name||e.title||``).toLowerCase().includes(c.toLowerCase()));return n?(0,o.jsx)(`div`,{className:`text-center mt-10`,children:`Loading Review Management...`}):(0,o.jsx)(`div`,{className:`min-h-screen bg-gray-100 py-6 md:py-10 px-3 md:px-0`,children:(0,o.jsxs)(`div`,{className:`max-w-6xl mx-auto`,children:[(0,o.jsx)(`h1`,{className:`text-2xl md:text-3xl font-bold mb-6 md:mb-8`,children:`Review Management`}),(0,o.jsxs)(`div`,{className:`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8`,children:[(0,o.jsxs)(`div`,{className:`bg-white rounded-xl shadow p-5`,children:[(0,o.jsx)(`p`,{className:`text-gray-500 text-sm`,children:`Products Reviewed`}),(0,o.jsx)(`h2`,{className:`text-3xl font-bold mt-2`,children:e.length})]}),(0,o.jsxs)(`div`,{className:`bg-white rounded-xl shadow p-5`,children:[(0,o.jsx)(`p`,{className:`text-gray-500 text-sm`,children:`Total Reviews`}),(0,o.jsx)(`h2`,{className:`text-3xl font-bold mt-2`,children:e.reduce((e,t)=>e+(t.numOfReviews||0),0)})]}),(0,o.jsxs)(`div`,{className:`bg-white rounded-xl shadow p-5`,children:[(0,o.jsx)(`p`,{className:`text-gray-500 text-sm`,children:`Average Rating`}),(0,o.jsx)(`h2`,{className:`text-3xl font-bold mt-2`,children:(e.reduce((e,t)=>e+(t.ratings||0),0)/(e.length||1)).toFixed(1)})]}),(0,o.jsxs)(`div`,{className:`bg-white rounded-xl shadow p-5`,children:[(0,o.jsx)(`p`,{className:`text-gray-500 text-sm`,children:`5★ Books`}),(0,o.jsx)(`h2`,{className:`text-3xl font-bold mt-2`,children:e.filter(e=>(e.ratings||0)>=4.5).length})]})]}),(0,o.jsx)(`input`,{type:`text`,placeholder:`Search books...`,value:c,onChange:e=>l(e.target.value),className:`\r
w-full\r
mb-5\r
border\r
rounded-xl\r
p-3\r
text-sm\r
md:text-base\r
`}),e.length===0?(0,o.jsx)(`div`,{className:`bg-white rounded-xl shadow-md p-8 text-center`,children:`No products have reviews yet.`}):(0,o.jsx)(`div`,{className:`space-y-5`,children:f.map(e=>(0,o.jsxs)(`div`,{className:`\r
bg-white\r
rounded-xl\r
shadow-md\r
p-4\r
md:p-6\r
flex\r
flex-col\r
md:flex-row\r
justify-between\r
md:items-center\r
gap-4\r
hover:shadow-lg\r
transition\r
`,children:[(0,o.jsxs)(`div`,{className:`flex flex-col sm:flex-row gap-4 items-center sm:items-start`,children:[(0,o.jsx)(`img`,{src:e.image?.[0]?.url,alt:e.name,className:`\r
w-24\r
h-32\r
md:w-20\r
md:h-28\r
object-contain\r
border\r
rounded-lg\r
bg-white\r
p-1\r
`}),(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`h2`,{className:`text-lg md:text-xl font-bold text-center sm:text-left`,children:e.name||e.title}),(0,o.jsx)(`p`,{className:`text-gray-500 text-center sm:text-left`,children:e.author}),(0,o.jsxs)(`div`,{className:`mt-3 flex flex-wrap justify-center sm:justify-start gap-2 text-sm`,children:[(0,o.jsxs)(`span`,{className:`bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium`,children:[`⭐ `,(e.ratings||0).toFixed(1)]}),(0,o.jsxs)(`span`,{className:`bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium`,children:[`💬 `,e.numOfReviews,` Reviews`]})]})]})]}),(0,o.jsx)(`button`,{onClick:()=>u(`/product/${e._id}/reviews`),className:`\r
w-full\r
md:w-auto\r
bg-blue-600\r
hover:bg-blue-700\r
text-white\r
px-6\r
py-3\r
rounded-lg\r
font-semibold\r
transition\r
`,children:`View Reviews`})]},e._id))})]})})};export{s as default};