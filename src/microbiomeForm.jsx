import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/microbiomeForm.css";
import { m } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import axios from "axios";
import ErrorModal from "./ErrorModal";
import { submitKitForm } from "./api/api";
// import { Select } from "antd";

const MicrobiomeForm = () => {
  const navigate = useNavigate();
  const kitOptions = [
    { value: "GI Axis Microbiome", label: "GI Axis Microbiome" },
    { value: "GI Axis Microbial Screen", label: "GI Axis Microbial Screen" },
    { value: "GI Axis Advanced", label: "GI Axis Advanced" },
    { value: "Oral Microbiome", label: "Oral Microbiome" },
    { value: "Food Sensitivity Map 130", label: "Food Sensitivity Map 130" },
    { value: "Food Sensitivity Map 270", label: "Food Sensitivity Map 270" },
    {
      value: "Food Sensitivity Map Advanced",
      label: "Food Sensitivity Map Advanced",
    },
    { value: "Food Sensitivity 95", label: "Food Sensitivity 95" },
    { value: "Food Sensitivity Vegan", label: "Food Sensitivity Vegan" },
    { value: "Food Sensitivity Junior", label: "Food Sensitivity Junior" },
    { value: "CRP", label: "CRP" },
    {
      value: "DNAMap Health and Nutrition",
      label: "DNAMap Health and Nutrition",
    },
    { value: "DNAMap ADHD and Autism", label: "DNAMap ADHD and Autism" },
    { value: "DNAMap Male Fertility", label: "DNAMap Male Fertility" },
    { value: "DNAMap Female Fertility", label: "DNAMap Female Fertility" },
    { value: "DNAMap Hair and Skin", label: "DNAMap Hair and Skin" },
  ];
  const [selected, setSelected] = useState([]);
  const [kitTypes, setKitTypes] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [response, setResponse] = useState({});
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const fetchCountries = async () => {
      // setLoading(true);
      try {
      const response = await axios.get("https://restcountries.com/v3.1/all?fields=name");
      const countryList = response.data
        .map((country) => ({
        label: country.name.common,
        value: country.name.common
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
      setCountries(countryList); // Set the country list in the state
      } catch (error) {
      console.error("Error fetching countries:", error);
      } finally {
      // setLoading(false);
      }
    };

    fetchCountries();
  }, []);
  const oldkittypes = [
    "Microbiome",
    "MicrobiomePlus",
    "MicrobiomeAdvanced",
    "Parasitology Test",
    "Food Sensitivtiy 100",
    "Food Sensitivtiy 210",
  ];
  useEffect(() => {
    if (showThankYou) {
      setTimeout(() => {
        setShowThankYou(false);
      }, 10000);
    }
    if (showError) {
      setTimeout(() => {
        setShowError(false);
      }, 10000);
    }
  }, [showThankYou, showError]);

  const fetchKittypes = async () => {
    // const response = await getkittypes();
    await setKitTypes(response.data.kitTypes);
    console.log(response.data.kitTypes);
  };


  useEffect(() => {
    // fetchKittypes();
  }, []);

  const [healthConditions, setHealthConditions] = useState([
    {
      label: "Irritable Bowel Syndrome",
      icon: "/image53.svg",
      value: "irritable_bowel_syndrome",
      selected: false,
    },
    {
      label: "Inflammatory Bowel Disease",
      icon: "/image53.svg",
      value: "inflammatory_bowel_disease",
      selected: false,
    },
    {
      label: "Bloating / Gas issues",
      icon: "/image53.svg",
      value: "bloating_gas",
      selected: false,
    },
    {
      label: "I would like to lose weight",
      icon: "/image53.svg",
      value: "lose_weight",
      selected: false,
    },
    {
      label: "I would like to gain weight",
      icon: "/image53.svg",
      value: "gain_weight",
      selected: false,
    },
    {
      label: "Thyroid Conditions",
      icon: "/image53.svg",
      value: "thyroid",
      selected: false,
    },
    {
      label: "Heart / Cardiovascular problems",
      icon: "/image53.svg",
      value: "heart_problems",
      selected: false,
    },
    {
      label: "Skin Conditions",
      icon: "/image53.svg",
      value: "skin_conditions",
      selected: false,
    },
    {
      label: "Headaches / Migraines",
      icon: "/image53.svg",
      value: "migraines",
      selected: false,
    },
    {
      label: "Food Intolerances",
      icon: "/image53.svg",
      value: "food_intolerances",
      selected: false,
    },
    {
      label: "Arthritis",
      icon: "/image53.svg",
      value: "arthritis",
      selected: false,
    },
    {
      label: "Sleep Problems",
      icon: "/image53.svg",
      value: "sleep_problems",
      selected: false,
    },
    {
      label: "Diabetes",
      icon: "/image53.svg",
      value: "diabetes",
      selected: false,
    },
    {
      label: "No health conditions or concerns",
      // icon: "/image53.svg",
      value: "No health conditions or concerns",
      selected: false,
    },
  ]);

  const [dietType, setDietType] = useState([
    {
      label: "Omnivore",
      icon: "/image53.svg",
      value: "omnivore",
      selected: false,
    },
    {
      label: "Vegetarian",
      icon: "/image53.svg",
      value: "vegetarian",
      selected: false,
    },
    { label: "Vegan", icon: "/image53.svg", value: "vegan", selected: false },
    {
      label: "Pescetarian",
      icon: "/image53.svg",
      value: "pescatarian",
      selected: false,
    },
  ]);

  const [eatingHabits, setEatingHabits] = useState([
    {
      label: "Intermittent Fasting",
      icon: "/image53.svg",
      value: "intermittent_fasting",
      selected: false,
    },
    {
      label: "High Protein",
      icon: "/image53.svg",
      value: "high_protein",
      selected: false,
    },
    {
      label: "Low Protein",
      icon: "/image53.svg",
      value: "low_protein",
      selected: false,
    },
    {
      label: "Ketogenic",
      icon: "/image53.svg",
      value: "ketogenic",
      selected: false,
    },
    {
      label: "High Carbohydrate",
      icon: "/image53.svg",
      value: "high_carb",
      selected: false,
    },
    {
      label: "Low Carbohydrate",
      icon: "/image53.svg",
      value: "low_carb",
      selected: false,
    },
     {
      label: "No specific diet",
      // icon: "/image53.svg",
      value: "No specific diet",
      selected: false,
    },
  ]);
  const [antibioticTaken, setAntibioticTaken] = useState("no");
  const [consent, setConsent] = useState(false);

  const toggleSelect = (value) => {
    setHealthConditions((prev) =>
      prev.map((item) =>
        item.value === value ? { ...item, selected: !item.selected } : item,
      ),
    );
  };
  const toggleDiet = (value) => {
    setDietType((prev) =>
      prev.map((item) =>
        item.value === value ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  const toggleEatingHabit = (value) => {
    setEatingHabits((prev) =>
      prev.map((item) =>
        item.value === value ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  const initialFormState = {
    name: "",
    email: "",
    dob: "",
    weight: "",
    weightUnit: "kg",
    height: "",
    heightFeet: "",
    heightInches: "",
    heightUnit: "ft",
    gender: "male",
    country: "",
    kitType: "microbiome",
    kitId: "",
    sampleDate: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email.trim()))
      newErrors.email = "Enter a valid email";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.weight.trim()) newErrors.weight = "Weight is required";
    else if (Number.isNaN(Number(formData.weight)))
      newErrors.weight = "Weight must be a number";
    if (formData.heightUnit === "ft") {
      if (!formData.heightFeet.trim())
        newErrors.heightFeet = "Feet is required";
      else if (Number.isNaN(Number(formData.heightFeet)))
        newErrors.heightFeet = "Feet must be a number";
      if (formData.heightInches && Number.isNaN(Number(formData.heightInches)))
        newErrors.heightInches = "Inches must be a number";
    } else {
      if (!formData.height.trim()) newErrors.height = "Height is required";
      else if (Number.isNaN(Number(formData.height)))
        newErrors.height = "Height must be a number";
    }
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.kitId.trim()) newErrors.kitId = "Kit ID is required";
    if (!formData.sampleDate) newErrors.sampleDate = "Sample date is required";

    if (!consent) newErrors.consent = "You must consent to the terms and conditions to submit";

    const selectedHealthConditions = healthConditions.filter((h) => h.selected);
    const selectedDiet = dietType.filter((d) => d.selected);
    const selectedEating = eatingHabits.filter((e) => e.selected);
    if (selectedHealthConditions.length === 0) newErrors.healthConditions = "Select at least one health condition";
    if (selectedDiet.length === 0) newErrors.dietType = "Select at least one diet type";
    if (selectedEating.length === 0) newErrors.eatingHabits = "Select at least one eating habit";

    // if (!["yes", "no"].includes(antibioticTaken)) newErrors.antibioticTaken = "Please choose Yes or No";

    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const validationErrors = validateForm();
    setErrors(validationErrors);

    // if (Object.keys(validationErrors).length > 0) {
    //       setIsSubmitted(false);
    //       console.log(errors)
    //       toast.error(errors[Object.keys(errors)[0]]);
    //       console.log(errors[Object.keys(errors)[0]])
    //   return;
    // }
    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitted(false);

      const firstKey = Object.keys(validationErrors)[0];
      toast.error(validationErrors[firstKey]); // <<< use validationErrors, not errors

      return;
    }

    const payload = {
      ...formData,
      height:
        formData.heightUnit === "ft"
          ? `${formData.heightFeet}' ${formData.heightInches || 0}"`
          : formData.height,
      kitId:
        formData.kitType === "food_sensitivity"
          ? `T4-${formData.kitId}-YGM`
          : formData.kitId,
      antibioticTaken,
      healthConditions: healthConditions
        .filter((h) => h.selected)
        .map((h) => h.value),
      dietType: dietType.filter((d) => d.selected).map((d) => d.value),
      eatingHabits: eatingHabits.filter((e) => e.selected).map((e) => e.value),
      website:"FeelGutNew"
    };
    // Remove heightFeet and heightInches from payload as they're combined into height
    delete payload.heightFeet;
    delete payload.heightInches;

    try {
      const response = await submitKitForm(payload); // Call your API function
      setResponse(response);
      console.log("Form submitted successfully:", response);
      if (response.data.status === 1) {
        navigate("/registeryourkit/kitRegistered"); // Navigate to kit registered page
      } else if (response.data.status === 0) {
        console.log("Showing error modal");
        setShowError(true); // Show error modal
      }
      // setResponse(response.data);

      setFormData({
        ...initialFormState,
        heightUnit: "ft",
      });
      setHealthConditions([
        {
          label: "Irritable Bowel Syndrome",
          icon: "/image53.svg",
          value: "irritable_bowel_syndrome",
          selected: false,
        },
        {
          label: "Inflammatory Bowel Disease",
          icon: "/image53.svg",
          value: "inflammatory_bowel_disease",
          selected: false,
        },
        {
          label: "Bloating / Gas issues",
          icon: "/image53.svg",
          value: "bloating_gas",
          selected: false,
        },
        {
          label: "I would like to lose weight",
          icon: "/image53.svg",
          value: "lose_weight",
          selected: false,
        },
        {
          label: "I would like to gain weight",
          icon: "/image53.svg",
          value: "gain_weight",
          selected: false,
        },
        {
          label: "Thyroid Conditions",
          icon: "/image53.svg",
          value: "thyroid",
          selected: false,
        },
        {
          label: "Heart / Cardiovascular problems",
          icon: "/image53.svg",
          value: "heart_problems",
          selected: false,
        },
        {
          label: "Skin Conditions",
          icon: "/image53.svg",
          value: "skin_conditions",
          selected: false,
        },
        {
          label: "Headaches / Migraines",
          icon: "/image53.svg",
          value: "migraines",
          selected: false,
        },
        {
          label: "Food Intolerances",
          icon: "/image53.svg",
          value: "food_intolerances",
          selected: false,
        },
        {
          label: "Arthritis",
          icon: "/image53.svg",
          value: "arthritis",
          selected: false,
        },
        {
          label: "Sleep Problems",
          icon: "/image53.svg",
          value: "sleep_problems",
          selected: false,
        },
        {
          label: "Diabetes",
          icon: "/image53.svg",
          value: "diabetes",
          selected: false,
        },
      ]);
      setDietType([
        {
          label: "Omnivore",
          icon: "/image53.svg",
          value: "omnivore",
          selected: false,
        },
        {
          label: "Vegetarian",
          icon: "/image53.svg",
          value: "vegetarian",
          selected: false,
        },
        {
          label: "Vegan",
          icon: "/image53.svg",
          value: "vegan",
          selected: false,
        },
        {
          label: "Pescetarian",
          icon: "/image53.svg",
          value: "pescatarian",
          selected: false,
        },
      ]);
      setEatingHabits([
        {
          label: "Intermittent Fasting",
          icon: "/image53.svg",
          value: "intermittent_fasting",
          selected: false,
        },
        {
          label: "High Protein",
          icon: "/image53.svg",
          value: "high_protein",
          selected: false,
        },
        {
          label: "Low Protein",
          icon: "/image53.svg",
          value: "low_protein",
          selected: false,
        },
        {
          label: "Ketogenic",
          icon: "/image53.svg",
          value: "ketogenic",
          selected: false,
        },
        {
          label: "High Carbohydrate",
          icon: "/image53.svg",
          value: "high_carb",
          selected: false,
        },
        {
          label: "Low Carbohydrate",
          icon: "/image53.svg",
          value: "low_carb",
          selected: false,
        },
      ]);
      setIsSubmitted(false);
     
    } catch (err) {
      console.error("Form submit failed", err);

      if (err.response) {
        // Save backend and HTTP info
        setResponse({
          httpStatus: err.response.status,
          ...err.response.data,
        });

        setShowError(true);
      } else {
        // No response at all (network error)
        setResponse({
          httpStatus: null,
          message: "Network error. Please try again.",
        });

        setShowError(true);
      }

      setIsSubmitted(false);
    }
  };
  return (
    <div className="microbiome-form-wrapper">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="microbiome-form">
        <div className="form-header">
          <div className="form-header-item extra"></div>
          <div className="form-header-item form-heading">
            {/* <h2 className="heading">GI Axis Form</h2> */}
            <h2 className="heading">Register your kit</h2>
          </div>
          <div className="form-header-item logo-item">
            <img src="/feelgutpng.png" alt="GutMapDx Logo" />
          </div>
        </div>

        <form className="form-grid2" onSubmit={handleSubmit}>
          {/* First Row */}
          <label className="mylabel">
            Name
            <input
              type="text"
              name="name"
              className="myInput"
              placeholder=""
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {isSubmitted && errors.name && (
              <div
                style={{ color: "#c62828", fontSize: "12px", marginTop: "4px" }}
              >
                {errors.name}
              </div>
            )}
          </label>

          <label className="mylabel">
            Email
            <input
              type="email"
              name="email"
              placeholder=""
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {isSubmitted && errors.email && (
              <div
                style={{ color: "#c62828", fontSize: "12px", marginTop: "4px" }}
              >
                {errors.email}
              </div>
            )}
          </label>

          <div className="input-container dob-sample-row">
            <label className="mylabel">
              Date of Birth
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
              />
              {isSubmitted && errors.dob && (
                <div
                  style={{
                    color: "#c62828",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  {errors.dob}
                </div>
              )}
            </label>
            <label className="mylabel">
              Sample Date
              <input
                type="date"
                name="sampleDate"
                placeholder=""
                value={formData.sampleDate}
                onChange={(e) =>
                  setFormData({ ...formData, sampleDate: e.target.value })
                }
              />
              {isSubmitted && errors.sampleDate && (
                <div
                  style={{
                    color: "#c62828",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  {errors.sampleDate}
                </div>
              )}
            </label>
          </div>

          {/* Second Row */}
          <div className="input-container height-weight">
            <label className="mylabel second-row-label">
              Weight
              <div className="input-select-wrapper">
                <select
                  name="weightUnit"
                  value={formData.weightUnit}
                  onChange={(e) =>
                    setFormData({ ...formData, weightUnit: e.target.value })
                  }
                >
                  <option value="kg">KG</option>
                  <option value="LB">LB</option>{" "}
                </select>

                <input
                  className="second-row-input"
                  type="number"
                  name="weight"
                  placeholder="Weight"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                />
              </div>
              {isSubmitted && errors.weight && (
                <div
                  style={{
                    color: "#c62828",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  {errors.weight}
                </div>
              )}
            </label>
            <label className="mylabel">
              Height
              <div className="input-select-wrapper">
                <select
                  name="heightUnit"
                  value={formData.heightUnit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      heightUnit: e.target.value,
                      height: "",
                      heightFeet: "",
                      heightInches: "",
                    })
                  }
                >
                  <option value="ft">FT & inch</option>
                  <option value="cm">cm</option>
                </select>
                {formData.heightUnit === "ft" ? (
                  <div style={{ display: "flex", gap: "8px", flex: 1 }}>
                    <input
                      className="second-row-input"
                      type="number"
                      name="heightFeet"
                      placeholder="Feet"
                      value={formData.heightFeet}
                      onChange={(e) =>
                        setFormData({ ...formData, heightFeet: e.target.value })
                      }
                    />
                    <input
                      className="second-row-input"
                      type="number"
                      name="heightInches"
                      placeholder="Inches"
                      value={formData.heightInches}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          heightInches: e.target.value,
                        })
                      }
                    />
                  </div>
                ) : (
                  <input
                    className="second-row-input"
                    type="number"
                    name="height"
                    placeholder="Height (cm)"
                    value={formData.height}
                    onChange={(e) =>
                      setFormData({ ...formData, height: e.target.value })
                    }
                  />
                )}
              </div>
              {isSubmitted &&
                (errors.height || errors.heightFeet || errors.heightInches) && (
                  <div
                    style={{
                      color: "#c62828",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {errors.height || errors.heightFeet || errors.heightInches}
                  </div>
                )}
            </label>
          </div>

          <div className="input-container">
            <label className="mylabel short-label">
              Gender at Birth
              <select
                name="gender"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                {/* <option value="" disabled>Select</option> */}
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>

            {/* Third Row */}
            {/* <label className='mylabel'>
            Country of Residence
            <input type="text" name="country" placeholder="e.g. Germany" />
          </label> */}
            <label className="mylabel short-label">
              Country of Residence
              {/* <input
                list="countries"
                name="country"
                placeholder="country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
              />
              <datalist id="countries">
                <option value="Germany" />
                <option value="United Kingdom" />
                <option value="United States" />
                <option value="Canada" />
                <option value="Australia" />
                <option value="Pakistan" />
                <option value="India" />
                <option value="France" />
                <option value="Netherlands" />
                <option value="Other" />
              </datalist> */}
             {/* {countries.length > 0 ? (
  <Select
    value={formData.country || undefined}
    onChange={(value) => setFormData({ ...formData, country: value })}
    placeholder="Select Country"
    showSearch
    required
    className="autocompleee"
    optionFilterProp="children"
    filterOption={(input, option) =>
      option?.children?.toLowerCase()?.includes(input?.toLowerCase())
    }
    // style={{ backgroundColor: "#D2CDFF" }}
  >
 {countries?.map((c) => (
  <Select.Option key={c.name.common} value={c.name.common}>
    {c.name.common}
  </Select.Option>
))}
  </Select>
) : (
  <div>Loading countries...</div>
)} */}
<Select
        value={countries.find((country) => country.value === formData.country) || null} // Find the selected option
        onChange={(selectedOption) =>
          setFormData({
            ...formData,
            country: selectedOption ? selectedOption.value : ""
          })
        } // Inline change handler
        options={countries} // options to show in dropdown
        placeholder="Select Country"
        isSearchable // Makes the dropdown searchable
        required
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "#b9d6ff",
            border: "none",
            borderRadius: "10px",
            padding: "6px 4px",
            minHeight: "44px",
            boxShadow: "none",
            ":hover": {
              border: "none",
              boxShadow: "none",
              backgroundColor: "#b9d6ff",
            },
          }),

          valueContainer: (base) => ({
            ...base,
            padding: "0 12px",
          }),

          singleValue: (base) => ({
            ...base,
            color: "#000000",
          }),

          input: (base) => ({
            ...base,
            color: "#000000",
          }),

          placeholder: (base) => ({
            ...base,
            color: "#333333",
          }),

          indicatorsContainer: (base) => ({
            ...base,
            paddingRight: "8px",
          }),

          menu: (base) => ({
            ...base,
            backgroundColor: "#b9d6ff",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }),

          menuList: (base) => ({
            ...base,
            overflowX: "hidden",
            overflowY: "auto",
            paddingRight: "4px",
          }),

          option: (base, state) => ({
            ...base,
            borderRadius: "6px",
            padding: "10px 12px",
            backgroundColor: state.isSelected
              ? "#b9d6ff"
              : state.isFocused
                ? "#b9d6ff"
                : "#b9d6ff",
            color: "#000000",
            cursor: "pointer",
            margin: "2px 4px",
          }),
        }}
        className="basic-single"
        classNamePrefix="select"
        // isLoading={loading} // Shows loading spinner while fetching
      />

              {isSubmitted && errors.country && (
                <div
                  style={{
                    color: "#c62828",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  {errors.country}
                </div>
              )}
            </label>
          </div>

          {/* {kitTypes?.map((value, index) => {
                    if (oldkittypes.includes(value)) return null;
                    return (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    );
                  })} */}
          {/* <div className="input-container"> */}
            {/* <label className="mylabel short-label">
              Kit Type
         
              <Select
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#b9d6ff",
                    border: "none",
                    borderRadius: "10px",
                    padding: "6px 4px",
                    minHeight: "44px",
                    boxShadow: "none",
                    ":hover": {
                      border: "none",
                      boxShadow: "none",
                    },
                  }),

                  valueContainer: (base) => ({
                    ...base,
                    padding: "0 12px",
                  }),

                  indicatorsContainer: (base) => ({
                    ...base,
                    paddingRight: "8px",
                  }),

                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#f7edff",
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }),

                  option: (base, state) => ({
                    ...base,
                    borderRadius: "6px",
                    padding: "10px 12px",
                    backgroundColor: state.isSelected
                      ? "#d1b3ff"
                      : state.isFocused
                        ? "#ede0ff"
                        : "white",
                    color: "#2a004f",
                    cursor: "pointer",
                    margin: "2px 4px",
                  }),
                }}
                className="basic-single"
                classNamePrefix="select"
                options={kitOptions}
                placeholder="Please Select KIT Type"
                onChange={(option) =>
                  setFormData({
                    ...formData,
                    kitType: option.value,
                    kitId: "",
                  })
                }
              />
            </label> */}

            <label className="mylabel">
              Kit ID
              {/* {
                kitTypes.map((value,index)=>{
                 <> {value}</>
                })
               } */}
              {formData.kitType === "FoodSensitivityMap" ? (
                <div className="kitid-composite">
                  <span className="kitid-prefix">T4-</span>
                  <input
                    type="number"
                    name="kitId"
                    className="kitid-input"
                    placeholder="Kit-Code"
                    // value={formData.kitId}
                    value={formData.kitId
                      .replace(/^T4-/, "")
                      .replace(/-YGM$/, "")} // 👈 only show middle part
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        kitId: `T4-${e.target.value.trim()}-YGM`,
                      })
                    }
                  />
                  <span className="kitid-suffix">-YGM</span>
                </div>
              ) : (
                <input
                  type="text"
                  name="kitId"
                  placeholder=""
                  value={formData.kitId}
                  onChange={(e) =>
                    setFormData({ ...formData, kitId: e.target.value })
                  }
                />
              )}
              {isSubmitted && errors.kitId && (
                <div
                  style={{
                    color: "#c62828",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  {errors.kitId}
                </div>
              )}
            </label>
          {/* </div> */}

          {/* Sample Date moved above next to DOB */}

          {/* Health Conditions */}
          {formData.kitType !== "DNAMap Genetic Test" && (
            <>
              <div className="section full-width">
                <label>
                  Do you have any of the below health conditions or concerns?
                </label>

                <div className="checkbox-grid">
                  {healthConditions.map((condition, index) => (
                    
                    <label
                      key={index}
                      className="checkbox-item custom-checkbox"
                      style={{
                        backgroundColor: condition.selected
                          ? "#00316b"
                          : "#b9d6ff",
                        color: condition.selected ? "white" : "black",
                      }}
                    >
                      <img
                        src={`/microbiomeFormIcons/${condition.label
                          .replace(/\//g, "")
                          .trim()}${condition.selected ? 2 : 1}.svg`}
                        alt=""
                      />
                      <div className="checkbox-label-text">
                        {condition.label}
                      </div>

                      <input
                        type="checkbox"
                        className="checkinput2"
                        name="healthConditions"
                        value={condition.value}
                        checked={condition.selected}
                        onChange={() => toggleSelect(condition.value)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  ))}
                </div>
                {/* {isSubmitted && errors.healthConditions && (
              <div style={{ color: "#c62828", fontSize: "12px", marginTop: "6px" }}>{errors.healthConditions}</div>
            )} */}
              </div>

              {/* Diet Type */}
              <div className="section full-width">
                <label>What best describes your diet type?</label>
                <div className="button-group">
                  {dietType.map((condition, index) => (
                    <label
                      key={index}
                      className="checkbox-item custom-checkbox"
                      style={{
                        backgroundColor: condition.selected
                          ? "#00316b"
                          : "#b9d6ff",
                        color: condition.selected ? "white" : "black",
                      }}
                    >
                      {/* <span className="checkbox-icon" style={{ marginRight: "8px" }}>{condition.icon}</span> */}
                      <img
                        src={`/microbiomeFormIcons/${condition.label}${
                          condition.selected ? 2 : 1
                        }.svg`}
                        alt=""
                      />
                      {condition.label}
                      <input
                        type="checkbox"
                        className="checkinput2"
                        name="healthConditions"
                        value={condition.value}
                        checked={condition.selected}
                        onChange={() => toggleDiet(condition.value)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  ))}
                </div>
                {/* {isSubmitted && errors.dietType && (
              <div style={{ color: "#c62828", fontSize: "12px", marginTop: "6px" }}>{errors.dietType}</div>
            )} */}
              </div>
              {/* Eating Habits */}
              <div className="section full-width">
                <label>Do you follow any of these eating habits?</label>
                <div className="button-group">
                  {eatingHabits.map((condition, index) => (
                    <label
                      key={index}
                      className="checkbox-item custom-checkbox"
                      style={{
                        backgroundColor: condition.selected
                          ? "#00316b"
                          : "#b9d6ff",
                        color: condition.selected ? "white" : "black",
                      }}
                    >
                      {/* <span style={{ marginRight: "8px" }}>{condition.icon}</span> */}
                      <img
                        width={
                          condition.label.includes("Ketogenic") ||
                          condition.label.includes("Low Carbohydrate")
                            ? "20px"
                            : ""
                        }
                        src={`/microbiomeFormIcons/${condition.label}${
                          condition.selected ? 2 : 1
                        }.svg`}
                        alt=""
                      />
                      {condition.label}
                      <input
                        type="checkbox"
                        className="checkinput2"
                        name="healthConditions"
                        value={condition.value}
                        checked={condition.selected}
                        onChange={() => toggleEatingHabit(condition.value)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  ))}
                </div>
                {/* {isSubmitted && errors.eatingHabits && (
              <div style={{ color: "#c62828", fontSize: "12px", marginTop: "6px" }}>{errors.eatingHabits}</div>
            )} */}
              </div>

              <div className="section full-width">
                <label>Have you taken antibiotics in the last 12 months?</label>
                <div className="last-row">
                  <div className="antibiotic-toggle">
                    <button
                      type="button"
                      className={
                        antibioticTaken === "yes"
                          ? "antibiotic-btn selected"
                          : "antibiotic-btn"
                      }
                      onClick={() => setAntibioticTaken("yes")}
                    >
                      ✅ Yes
                    </button>
                    <button
                      type="button"
                      className={
                        antibioticTaken === "no"
                          ? "antibiotic-btn selected no"
                          : "antibiotic-btn no"
                      }
                      onClick={() => setAntibioticTaken("no")}
                    >
                      ❌ No
                    </button>
                  </div>
                </div>

                {/* {isSubmitted && errors.antibioticTaken && (
              <div style={{ color: "#c62828", fontSize: "12px", marginTop: "6px" }}>{errors.antibioticTaken}</div>
            )} */}
              </div>

              <div className="section full-width">
                <div className="consent-checkbox">
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      className="checkinput2"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    <span className="consent-label-text">
                      I consent to the terms and conditions and understand that
                      anonymous test data is used to improve our gut health
                      solutions.
                    </span>
                                         


                   
                  </label>
                </div>
                <div className="last-row">
                  <div className="submit-section full-width">
                    {
                      <button
                        type="submit"
                        className="submit-btn"
                        style={{
                          padding: "12px 36px",
                          backgroundColor: isSubmitted ? "#ccc" : "",
                        }}
                        disabled={isSubmitted}
                      >
                        {!isSubmitted ? "Submit" : "Submitting..."}
                      </button>
                    }
                  </div>
                </div>

                {/* {isSubmitted && errors.antibioticTaken && (
              <div style={{ color: "#c62828", fontSize: "12px", marginTop: "6px" }}>{errors.antibioticTaken}</div>
            )} */}
              </div>
            </>
          )}
          {formData.kitType === "DNAMap Genetic Test" && (
            <div
              className="submit-section full-width"
              style={{ marginTop: "60px", width: "auto" }}
            >
              {!isSubmitted && (
                <button
                  type="submit"
                  className={`submit-btn ${isSubmitted ? "disbled" : ""}`}
                  style={{ width: "100%" }}
                  disabled={isSubmitted}
                >
                  Submit
                </button>
              )}
            </div>
          )}

          {/* Submit */}
        </form>

       
        <ErrorModal
          isOpen={showError}
          onClose={() => setShowError(false)}
          title="Questionnare Failed to Submit"
          errorCode={response?.httpStatus}
          message={
            // response?.message ||
            "There was an issue submitting your questionnaire. Please try again or contact support."
          }
        />
      </div>
    </div>
  );
};

export default MicrobiomeForm;
