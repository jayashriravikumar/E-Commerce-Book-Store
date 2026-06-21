import { useState } from "react";
import axios from "axios";

const CustomerServiceForm = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post(
                "http://localhost:3000/api/v1/customer/new",
                form
            );

            alert(res.data.message);

            setForm({
                name:"",
                email:"",
                subject:"",
                message:""
            });

        } catch (err) {
            alert(err.response.data.message);
        }
    };

    return (

        <form onSubmit={handleSubmit}>

            <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-control mb-3"
                value={form.name}
                onChange={handleChange}
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control mb-3"
                value={form.email}
                onChange={handleChange}
            />

            <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="form-control mb-3"
                value={form.subject}
                onChange={handleChange}
            />

            <textarea
                name="message"
                placeholder="Message"
                className="form-control mb-3"
                value={form.message}
                onChange={handleChange}
            />

            <button className="btn btn-primary">
                Submit
            </button>

        </form>
    );
};

export default CustomerServiceForm;