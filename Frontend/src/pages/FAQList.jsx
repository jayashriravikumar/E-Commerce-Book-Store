import { useEffect, useState } from "react";
import axios from "axios";

const FAQList = () => {

    const [faqs, setFaqs] = useState([]);

    useEffect(() => {

        fetchFAQs();

    }, []);

    const fetchFAQs = async () => {

        const res = await axios.get(
            "http://localhost:3000/api/v1/faqs"
        );

        setFaqs(res.data.faqs);

    };

    return (

        <div>

            {faqs.map((faq) => (

                <div
                    key={faq._id}
                    className="card p-3 mb-3"
                >

                    <h5>{faq.question}</h5>

                    <p>{faq.answer}</p>

                </div>

            ))}

        </div>

    );

};

export default FAQList;