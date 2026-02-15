import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plane, Calendar, Clock, MapPin, Activity, PlaneTakeoff } from "lucide-react";
import SearchableSelect from "./components/SearchableSelect";
import { airlines, airports, calculateDistance, getDistanceGroup } from "./utils/flightData";

function App() {
  const [formData, setFormData] = useState({
    Airline: "",
    Origin: "",
    Dest: "",
    Date: "", // We use a full date string for UI
    Time: "12:00", // Interactive time picker
  });

  const [distanceInfo, setDistanceInfo] = useState({ distance: 0, group: 0 });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Auto-calculate distance when Origin or Dest changes
  useEffect(() => {
    if (formData.Origin && formData.Dest) {
      const dist = calculateDistance(formData.Origin, formData.Dest);
      const group = getDistanceGroup(dist);
      setDistanceInfo({ distance: dist, group: group });
    }
  }, [formData.Origin, formData.Dest]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.Date || !formData.Origin || !formData.Dest || !formData.Airline) {
      alert("Please fill in all fields!");
      return;
    }

    setLoading(true);
    setResult(null);

    // Prepare data for Backend
    const dateObj = new Date(formData.Date);
    
    // Day of week (1 = Monday, 7 = Sunday) - adjust based on your backend needs
    // JS getDay() returns 0 for Sunday. If backend needs 1-7, we adjust.
    let dayOfWeek = dateObj.getDay(); 
    if (dayOfWeek === 0) dayOfWeek = 7;

    const payload = {
      Airline: formData.Airline,
      Origin: formData.Origin,
      Dest: formData.Dest,
      Month: dateObj.getMonth() + 1, // JS months are 0-indexed
      DayOfWeek: dayOfWeek,
      Distance: distanceInfo.distance,
      DistanceGroup: distanceInfo.group,
      DepHour: parseInt(formData.Time.split(":")[0], 10), // Extract hour
    };

    try {
        // Simulating API call for demo purposes (REMOVE setTimeout in production)
        const response = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        console.log(data);
        // MOCK RESPONSE FOR DEMO UI:
        // await new Promise(r => setTimeout(r, 1500)); 
        // const mockData = { prediction: "On Time", delay_probability: Math.random() * 0.4 }; 
        setResult(data);

    } catch (error) {
      console.error("Error predicting:", error);
      alert(error.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-blue-500 selection:text-white overflow-hidden relative">
      
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        
        {/* Animated Plane Icon */}
        <motion.div 
          initial={{ x: -100, y: 100, opacity: 0 }}
          animate={{ x: "100vw", y: -100, opacity: 0.1 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-0"
        >
          <Plane className="w-64 h-64 text-white transform rotate-45" />
        </motion.div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-10 flex flex-col items-center justify-center min-h-screen">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight mb-2">
            SkyCast AI
          </h1>
          <p className="text-gray-400 text-lg">Next-Gen Flight Delay Prediction</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-4xl bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl grid md:grid-cols-2 gap-8"
        >
          
          {/* LEFT COLUMN - INPUTS */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-1 w-8 bg-blue-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-white">Flight Details</h2>
            </div>

            <SearchableSelect 
              options={airlines} 
              placeholder="Airline" 
              icon={Plane}
              value={formData.Airline}
              onChange={(val) => handleChange("Airline", val)}
            />

            <div className="grid grid-cols-2 gap-4">
               <SearchableSelect 
                options={airports} 
                placeholder="Origin" 
                icon={MapPin}
                value={formData.Origin}
                onChange={(val) => handleChange("Origin", val)}
              />
               <SearchableSelect 
                options={airports} 
                placeholder="Destination" 
                icon={MapPin}
                value={formData.Dest}
                onChange={(val) => handleChange("Dest", val)}
              />
            </div>

            {/* Hidden Stats Display (User sees this instead of typing inputs) */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500 uppercase">Flight Distance</p>
                <p className="text-lg font-mono font-bold text-blue-300">
                  {distanceInfo.distance > 0 ? `${distanceInfo.distance} miles` : "--"}
                </p>
              </div>
              <Activity className="text-gray-600 w-6 h-6" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block pl-1">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                  <input 
                    type="date"
                    className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-xl py-3 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none [color-scheme:dark]"
                    onChange={(e) => handleChange("Date", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block pl-1">Departure</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                  <input 
                    type="time"
                    value={formData.Time}
                    className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-xl py-3 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none [color-scheme:dark]"
                    onChange={(e) => handleChange("Time", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 transition-all
                ${loading 
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/25"
                }`}
            >
              {loading ? (
                <span>Calculating Trajectory...</span>
              ) : (
                <>
                  <PlaneTakeoff className="w-5 h-5" />
                  <span>Predict Delay</span>
                </>
              )}
            </motion.button>
          </div>

          {/* RIGHT COLUMN - VISUALIZATION / RESULTS */}
          <div className="relative bg-gray-950/50 rounded-2xl border border-gray-800 p-6 flex flex-col items-center justify-center min-h-[400px]">
            {!result && !loading && (
               <div className="text-center opacity-40">
                 <div className="w-32 h-32 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                    <Plane className="w-16 h-16 text-gray-600" />
                 </div>
                 <p>Ready for takeoff. Enter details.</p>
               </div>
            )}

            {loading && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-blue-400 animate-pulse">Analyzing weather patterns...</p>
              </div>
            )}

            {result && !loading && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center w-full"
              >
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] 
                  ${result.prediction === "On Time" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                  {result.prediction === "On Time" ? <Check size={48} /> : <Clock size={48} />}
                </div>

                <h3 className="text-3xl font-bold mb-2">{result.prediction}</h3>
                
                <div className="bg-gray-800 rounded-xl p-4 mt-6">

                  <div className={`flex justify-between mb-2 text-sm text-gray-400} `}>
                    <span>Delay Probability</span>
                    <span>{(result.delay_probability * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${result.delay_probability * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${result.prediction === "On Time" ? "bg-green-500" : "bg-red-500"}`} 
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

        </motion.div>
      </div>
    </div>
  );
}

// Helper icon for result
function Check({ size, className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default App;