from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware


# Load saved model, preprocessor, threshold
model = joblib.load("flight_delay_model.pkl")
preprocessor = joblib.load("flight_delay_preprocessor.pkl")
threshold = joblib.load("flight_delay_threshold.pkl")

# Create FastAPI app
app = FastAPI(title="Flight Delay Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input schema
class FlightInput(BaseModel):

    Airline: str
    Origin: str
    Dest: str
    Month: int
    DayOfWeek: int
    Distance: float
    DistanceGroup: int
    DepHour: int


# Helper function to create cyclic features
def create_features(data):

    data["DepHour_sin"] = np.sin(2*np.pi*data["DepHour"]/24)
    data["DepHour_cos"] = np.cos(2*np.pi*data["DepHour"]/24)

    return data


@app.get("/")
def home():
    return {"message": "Flight Delay Prediction API running"}


@app.post("/predict")
def predict_delay(input: FlightInput):

    # Convert input to DataFrame
    data = pd.DataFrame([input.dict()])

    # Create cyclic features
    data = create_features(data)
    airline_lookup = joblib.load("airline_delay_rate.pkl")
    origin_lookup = joblib.load("origin_delay_rate.pkl")
    route_lookup = joblib.load("route_delay_rate.pkl")
    hour_lookup = joblib.load("hour_delay_rate.pkl")

    # NOTE: Delay rate features are not available for new unseen flights
    # We fill with global average
    # global_mean = 0.17

    # data["AirlineDelayRate"] = global_mean
    # data["OriginDelayRate"] = global_mean
    # data["RouteDelayRate"] = global_mean
    # data["HourDelayRate"] = global_mean
    global_mean = 0.17

    data["Route"] = data["Origin"] + "_" + data["Dest"]

    data["AirlineDelayRate"] = data["Airline"].map(airline_lookup).fillna(global_mean)

    data["OriginDelayRate"] = data["Origin"].map(origin_lookup).fillna(global_mean)

    data["RouteDelayRate"] = data["Route"].map(route_lookup).fillna(global_mean)

    data["HourDelayRate"] = data["DepHour"].map(hour_lookup).fillna(global_mean)


    # Remove DepHour (not used directly)
    data = data.drop(columns=["DepHour","Route"])

    # Preprocess
    processed = preprocessor.transform(data)

    # Predict probability
    prob = model.predict_proba(processed)[0][1]

    # Apply threshold
    prediction = "Delayed" if prob >= threshold else "On Time"

    return {
        "delay_probability": float(prob),
        "prediction": prediction
    }
