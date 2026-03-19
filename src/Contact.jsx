import React from "react";
import { useFormik } from "formik";

export function Contact() {
  const formik = useFormik({
    initialValues: {
      name: "",
      number: "+",
      email: "",
      message: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.name || values.name.trim().length < 2) {
        errors.name = "Please enter a valid name (min 2 letters).";
      }

      const cleanNumber = values.number.replace(/[\s+]/g, "");

      if (!values.number || values.number === "+") {
        errors.number = "Phone number with country code is required.";
      } else if (cleanNumber.startsWith("91")) {
        if (cleanNumber.length !== 12) {
          errors.number =
            "For India, please enter 91 followed by 10 digits (Total 12).";
        } else if (!/^[6789]\d{9}$/.test(cleanNumber.substring(2))) {
          errors.number = "Invalid Indian number series (must start with 6-9).";
        }
      } else {
        if (cleanNumber.length < 7 || cleanNumber.length > 15) {
          errors.number =
            "International numbers must be between 7 to 15 digits.";
        }
      }

      if (!values.email) {
        errors.email = "Email is required.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address.";
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        // Form submit hote hi backend ko call karega
        // Localhost ki jagah 127.0.0.1 likhein
const response = await fetch("http://127.0.0.1:5000/api/contact/", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            message: `Phone: ${values.number} | Message: ${values.message}`,
          }),
        });

        if (response.ok) {
          alert("Message Sent Successfully! ✅ We will contact you soon.");
          resetForm();
        } else {
          alert("Server Error: Message not sent. ❌");
        }
      } catch (error) {
        console.error("Connection Error:", error);
        alert("Backend is not running! ❌ Please start your Flask server.");
      }
    },
  });

  // Is function ko clean kiya hai taaki validation aur submission mein conflict na ho
  const handleCustomSubmit = async (e) => {
    e.preventDefault();

    // Pehle saare errors check karein
    const errors = await formik.validateForm();

    if (Object.keys(errors).length > 0) {
      // Jo pehla error mile uska alert dikhayein
      const firstError = Object.values(errors)[0];
      alert(firstError);
    } else {
      // Agar koi error nahi hai, tabhi submit karein
      formik.handleSubmit();
    }
  };

  return (
    <div className="contact-image-background">
      <div className="full-contact-container">
        <div className="contact-container">
          <h1>Find us here for your queries</h1>
          <h2>Contact Us</h2>

          <form onSubmit={handleCustomSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>

            <div className="form-group">
              <label>Your Number (with Country Code)</label>
              <input
                type="text"
                name="number"
                placeholder="India: +91... | Global: +1..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.number}
              />
            </div>

            <div className="form-group">
              <label>Your Email</label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="How can we help you?"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                required
              ></textarea>
            </div>

            <button type="submit" className="contact-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
