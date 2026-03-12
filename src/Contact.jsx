import { useFormik } from "formik";

export function Contact() {
  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
      email: "",
      message: "",
    },

    onSubmit: (values) => {
      console.log(values);
      alert("Message Sent Successfully ✅");
    },
  });

  return (

    <>
    <div className="full-contact-container">
      {/* <h1>You can find us here for your queries</h1> */}
      <div className="contact-container">
        <h1>You can find us here for your queries</h1>
        <h2>Contact Us</h2>

        <form onSubmit={formik.handleSubmit}>
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          <label>Your Number</label>
          <input
            type="number"
            name="number"
            onChange={formik.handleChange}
            value={formik.values.number}
          />

          <label>Your Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <label>Message</label>
          <textarea
            name="message"
            onChange={formik.handleChange}
            value={formik.values.message}
          ></textarea>

          <button type="submit">submit</button>
        </form>

      </div>
    </div>

    </>
  );
}