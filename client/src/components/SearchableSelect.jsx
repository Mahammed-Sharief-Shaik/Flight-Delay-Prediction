import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronsUpDown } from 'lucide-react';

const SearchableSelect = ({ options, value, onChange, placeholder, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const filtered = query === ""
    ? options
    : options.filter((opt) =>
        opt.label.toLowerCase().includes(query.toLowerCase())
      );

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block pl-1">
        {placeholder}
      </label>
      <div
        className="relative flex items-center bg-gray-800/50 border border-gray-600 rounded-xl p-3 cursor-pointer hover:border-blue-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {Icon && <Icon className="w-5 h-5 text-blue-400 mr-3" />}
        <span className={`flex-1 ${!selectedLabel ? 'text-gray-500' : 'text-white'}`}>
          {selectedLabel || `Select ${placeholder}...`}
        </span>
        <ChevronsUpDown className="w-4 h-4 text-gray-400" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl max-h-60 overflow-auto scrollbar-hide"
          >
            <div className="p-2 sticky top-0 bg-gray-900 border-b border-gray-800">
              <input
                autoFocus
                className="w-full bg-gray-800 text-white p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type to search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {filtered.map((opt) => (
              <div
                key={opt.value}
                className="p-3 hover:bg-blue-900/30 cursor-pointer flex items-center justify-between text-gray-300 hover:text-white transition-colors"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                  setQuery("");
                }}
              >
                <span>{opt.label}</span>
                {value === opt.value && <Check className="w-4 h-4 text-green-400" />}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-4 text-center text-gray-500 text-sm">No results found.</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchableSelect;