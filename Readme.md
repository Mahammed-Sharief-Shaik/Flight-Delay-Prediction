
---

# ✈️ Flight Delay Prediction System

An end-to-end Machine Learning system that predicts whether a flight will be delayed using real-world aviation data. The system includes a trained XGBoost model, FastAPI backend, and React frontend for real-time predictions.

---

# 🚀 Live System Architecture

```
React Frontend  →  FastAPI Backend  →  ML Model (XGBoost)
     (UI)              (API)              (Prediction)
```

Users enter flight details → API processes features → Model predicts delay probability → Result displayed instantly.

---

# 📊 Dataset

**Source:** US Domestic Flights Dataset (ROB MULLA)
**Size:** 6.2 Million flight records
**Features include:**

* Airline
* Origin Airport
* Destination Airport
* Departure Time
* Distance
* Day of Week
* Month
* Historical delay information

**Target variable:**

```
DepDel15 → 1 = Delayed (≥15 min), 0 = On time
```

---

# 🧠 Machine Learning Pipeline

## Data Preprocessing

* Removed null and invalid records
* Handled class imbalance (82% on-time, 18% delayed)
* Stratified sampling for efficient experimentation

## Feature Engineering

Implemented advanced feature engineering:

* Cyclic encoding of departure time
* Airline historical delay rate
* Origin airport delay rate
* Route delay rate
* Hour-based delay probability

Example:

```python
df["DepHour_sin"] = sin(2π × hour / 24)
df["DepHour_cos"] = cos(2π × hour / 24)
```

---

# 🤖 Model Training

Models evaluated:

* Logistic Regression
* Random Forest
* XGBoost (Selected)

Final Model: **XGBoost Classifier**

Hyperparameter tuning and threshold optimization applied.

---

# 📈 Final Model Performance (Full Dataset)

| Metric            | Value      |
| ----------------- | ---------- |
| Accuracy          | **73.27%** |
| Precision (Delay) | **0.33**   |
| Recall (Delay)    | **0.55**   |
| F1 Score (Delay)  | **0.42**   |

Confusion Matrix:

```
               Predicted
             No      Yes
Actual No   395387   117532
Actual Yes   48260    59167
```

---

# ⚡ Backend: FastAPI

Provides real-time prediction API.

### Endpoint:

```
POST /predict
```

Example request:

```json
{
  "Airline": "Delta Air Lines Inc.",
  "Origin": "ATL",
  "Dest": "JFK",
  "Month": 7,
  "DayOfWeek": 3,
  "Distance": 760,
  "DistanceGroup": 4,
  "DepHour": 14
}
```

Response:

```json
{
  "delay_probability": 0.63,
  "prediction": "Delayed"
}
```

---

# 💻 Frontend: React

Interactive UI allowing users to:

* Enter flight information
* Submit prediction request
* View delay probability and prediction

Features:

* Clean user interface
* Real-time prediction
* API integration with FastAPI

---

# 🏗️ Project Structure

```
flight-delay-predictor/

│
├── backend/
│   ├── app.py
│   ├── flight_delay_model.pkl
│   ├── flight_delay_preprocessor.pkl
│   └── flight_delay_threshold.pkl
│
├── frontend/
│   ├── src/
│   └── package.json
│
├── notebooks/
│   └── model_training.ipynb
│
├── requirements.txt
└── README.md
```

---

# ⚙️ Installation & Setup

## Backend Setup

```bash
cd backend

pip install -r requirements.txt

python -m uvicorn app:app --reload
```

API runs at:

```
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm i

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 📊 Feature Importance

Top predictive features:

* Airline delay rate
* Route delay rate
* Departure time
* Origin airport delay rate
* Distance

These features capture real operational patterns affecting flight delays.

---

# 🧪 Technologies Used

### Machine Learning

* Python
* XGBoost
* Scikit-learn
* Pandas
* NumPy

### Backend

* FastAPI
* Joblib

### Frontend

* React
* JavaScript
* HTML/CSS

### Deployment-ready

* REST API
* Model serialization
* Full stack integration

---

# 🎯 Key Highlights

* Trained on **6.2 million real flight records**
* Full end-to-end ML pipeline
* Production-style deployment with FastAPI
* Real-time predictions via React frontend
* Optimized using threshold tuning and feature engineering

---

# 📌 Future Improvements

* Integrate weather data
* Add real-time flight tracking
* Deploy to cloud (AWS / Render)
* Improve model accuracy using additional features

---

# 👨‍💻 Author

**Mahammed Sharief Shaik**

Computer Science Student | Machine Learning & Full-Stack Developer

---
<!-- 
# ⭐ Why This Project Matters

This project demonstrates:

* Real-world ML pipeline design
* Large-scale data handling
* Production model deployment
* Full-stack integration
* Industry-level engineering practices

---

# ⭐ If you like this project

Please consider giving it a star on GitHub!

---

If you want, I can also generate:

* a professional architecture diagram
* or optimize this README specifically for Boeing recruiters. -->
