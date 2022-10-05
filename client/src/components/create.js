import React, { useState } from "react";
import { useNavigate } from "react-router";
import { APIURL } from "../constants";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    date: "",
    country: "",
    subject: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newStamp = { ...form };

    await fetch(`${APIURL}/record/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStamp),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      name: "",
      date: "",
      country: "",
      subject: "",
    });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="text"
            className="form-control"
            id="date"
            value={form.date}
            onChange={(e) => updateForm({ date: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            className="form-control"
            id="country"
            value={form.country}
            onChange={(e) => updateForm({ country: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            className="form-control"
            id="subject"
            value={form.subject}
            onChange={(e) => updateForm({ subject: e.target.value })}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Stamp"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
