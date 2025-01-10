import React from "react";
import './ContactUs.css'; // Optional for additional styling
import bgImg from "../assets/bgimg4.jpeg";

function ContactUs() {
    return (
            <div className="flex flex-col items-center justify-center px-4 py-8 bg-black text-white inter-regular">
                <h1 className="text-center mb-4 ">Contact Us</h1>
                <p className="text-center">Email: support@langflow.com</p>
                <p className="text-center">Phone: +1-800-LANGFLOW</p>
            </div>
    );
}

export default ContactUs;
