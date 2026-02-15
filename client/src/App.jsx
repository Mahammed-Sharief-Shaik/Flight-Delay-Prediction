import React, { useState } from "react";

function App() {

  const [form, setForm] = useState({
    Airline: "",
    Origin: "",
    Dest: "",
    Month: 1,
    DayOfWeek: 1,
    Distance: 500,
    DistanceGroup: 3,
    DepHour: 12
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async () => {

    const response = await fetch("http://127.0.0.1:8000/predict", {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        ...form,
        Month: Number(form.Month),
        DayOfWeek: Number(form.DayOfWeek),
        Distance: Number(form.Distance),
        DistanceGroup: Number(form.DistanceGroup),
        DepHour: Number(form.DepHour)
      })

    });

    const data = await response.json();

    setResult(data);

  };

  return (

    <div style={{ padding: "30px" }}>

      <h1>Flight Delay Predictor</h1>

      <input name="Airline" placeholder="Airline" onChange={handleChange} /><br /><br />

      <input name="Origin" placeholder="Origin" onChange={handleChange} /><br /><br />

      <input name="Dest" placeholder="Destination" onChange={handleChange} /><br /><br />

      <input name="Month" placeholder="Month" type="number" onChange={handleChange} /><br /><br />

      <input name="DayOfWeek" placeholder="DayOfWeek" type="number" onChange={handleChange} /><br /><br />

      <input name="Distance" placeholder="Distance" type="number" onChange={handleChange} /><br /><br />

      <input name="DistanceGroup" placeholder="DistanceGroup" type="number" onChange={handleChange} /><br /><br />

      <input name="DepHour" placeholder="Departure Hour" type="number" onChange={handleChange} /><br /><br />

      <button onClick={handleSubmit}>Predict</button>

      {result && (

        <div style={{ marginTop: "20px" }}>

          <h3>Prediction: {result.prediction}</h3>

          <p>Probability: {(result.delay_probability * 100).toFixed(2)}%</p>

        </div>

      )}

    </div>

  );

}

export default App;
