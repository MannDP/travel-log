import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { postLogEntry } from "./API";

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit } = useForm();

  const handleSubmitError = (error) => {
    console.log(error);
    setLoading(false);
    setError(error.message);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const response = await postLogEntry(data);
      onClose();
    } catch (error) {
      handleSubmitError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error ? <h3 className="error">{error}</h3> : null}

      <label htmlFor="title">Title</label>
      <input name="title" required ref={register} />

      <label htmlFor="description">Description</label>
      <input name="description" ref={register}></input>

      <label htmlFor="comments">Comments</label>
      <textarea name="comments" ref={register} />

      <label htmlFor="image">Image</label>
      <input name="image" ref={register} />

      <label htmlFor="visitDate">Visit Date</label>
      <input type="date" name="visitDate" required ref={register}></input>

      <button disabled={loading}>{loading ? "Loading" : "Submit Entry"}</button>
    </form>
  );
};

export default LogEntryForm;
