import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { APIURL } from "../constants";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`${APIURL}/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedStamp = {
      name: form.name,
      date: form.date,
      country: form.country,
      subject: form.subject,
    };

    // This will send a post request to update the data in the database.
    await fetch(`${APIURL}/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedStamp),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
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

        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Stamp"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
