import React, { useEffect, useState } from "react";
import axios from "axios";

const styles = `
.faq-page {
  display: flex;
  gap: 40px;
  padding: 20px;
  background: #f3f4f6;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .faq-page {
    flex-direction: column;
  }
}

.faq-section {
  flex: 2;
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
}

.service-section {
  flex: 1;
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
}

.search-box{
  width:100%;
  padding:12px;
  margin:20px 0;
  border:1px solid #ddd;
  border-radius:5px;
  font-size:16px;
}

.quick-help{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-bottom:20px;
}

.quick-help button{
  border:none;
  background:#2874f0;
  color:white;
  padding:8px 15px;
  border-radius:5px;
  cursor:pointer;
}

.quick-help button:hover{
  background:#0f5ed7;
}

details{
  border:1px solid #ddd;
  margin-bottom:12px;
  border-radius:6px;
  overflow:hidden;
}

summary{
  padding:15px;
  cursor:pointer;
  font-weight:bold;
  background:#fafafa;
}

.answer{
  padding:15px;
  background:white;
}

.category{
  display:inline-block;
  margin-top:10px;
  background:#2874f0;
  color:white;
  padding:5px 10px;
  border-radius:20px;
  font-size:12px;
}

.service-section h2{
  margin-bottom:20px;
}

.service-section ul{
  list-style:none;
  padding:0;
}

.service-section li{
  padding:10px 0;
  border-bottom:1px solid #ddd;
}

.support-btn{
  width:100%;
  margin-top:20px;
  background:#ff9900;
  color:white;
  border:none;
  padding:12px;
  font-size:16px;
  border-radius:5px;
  cursor:pointer;
}

.support-btn:hover{
  background:#e68a00;
}
`;

const FAQ = () => {

  const [faqs,setFaqs]=useState([]);
  const [search,setSearch]=useState("");
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
      fetchFAQs();
  },[]);

  const fetchFAQs = async()=>{
      try{

          const {data}=await axios.get("/api/v1/faqs");

          if(data.success){
              setFaqs(data.faqs);
          }

      }catch(err){
          console.log(err);
      }finally{
          setLoading(false);
      }
  };

  const filteredFAQs=faqs.filter(faq=>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return(
    <>
      <style>{styles}</style>

      <div className="faq-page">

        <div className="faq-section">

          <h1>Frequently Asked Questions</h1>

          <input
            className="search-box"
            placeholder="Search FAQs..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

          <div className="quick-help">
            <button>Orders</button>
            <button>Payment</button>
            <button>Shipping</button>
            <button>Returns</button>
          </div>

          {loading ? (

            <h3>Loading...</h3>

          ) : filteredFAQs.length===0 ? (

            <h3>No FAQs Available</h3>

          ) : (

            filteredFAQs.map(faq=>(
              <details key={faq._id}>

                <summary>{faq.question}</summary>

                <div className="answer">
                  <p>{faq.answer}</p>

                  <span className="category">
                    {faq.category}
                  </span>

                </div>

              </details>
            ))

          )}

        </div>

        <div className="service-section">

          <h2>Need Help?</h2>

          <p>
            Can't find your answer? Contact our customer support team.
          </p>

          <button
            className="support-btn"
            onClick={()=>window.location.href="/support"}
          >
            Contact Support
          </button>

          <hr style={{margin:"25px 0"}}/>

          <h3>Quick Help</h3>

          <ul>
            <li>📦 Track Orders</li>
            <li>💳 Payment Issues</li>
            <li>🚚 Shipping</li>
            <li>🔄 Returns</li>
            <li>🎟 Coupons</li>
            <li>📚 Book Availability</li>
          </ul>

        </div>

      </div>
    </>
  );
};

export default FAQ;