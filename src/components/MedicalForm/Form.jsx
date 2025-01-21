import  { useState } from "react"
import ConfirmationMessage from "../ConfirmationMessage/Message"
import Logo from "../../assets/logo.png"
import { useEffect } from "react"
const MedicalForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Sahifani yuqoriga qaytaradi
  }, []); // [] - faqat bir marta ishlaydi
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitText, setSubmitText] = useState("Yuborish")
  const [formData, setFormData] = useState({
    fullname: "",
    age: "",
    housing_or_working_conditions: "",
    smoking: "",
    cold_exposure:"",
    contact_with_allergens:"",
    hereditary_predisposition:"",
    onset_of_disease: "",
    course_of_disease: "",
    attack_course: "",
    treatment_effectiveness: "",
    cough: "",
    phlegm: "",
    shortness_of_breath: "",
    temperature: "",
    cough_attack: "",
    what_sputum: "",
    what_suffocation: "",
    pain: "",
    what_temperature: "",
    breath_sound_types: [],
    breath_sound_location: [],
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === "checkbox" && ["cough_attack", "what_sputum", "what_suffocation", "what_temperature"].includes(name)) {
      setFormData((prevState) => ({
        ...prevState,
        [`${name}Yes`]: checked,
        [name]: checked ? prevState[name] : "",
      }))
    } else if (type === "checkbox" && ["breath_sound_types", "breath_sound_location"].includes(name)) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked ? [...prevState[name], value] : prevState[name].filter((item) => item !== value),
      }))
    } else if (type === "radio") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked===true ? "Ha":"Yo'q" : value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(formData.cough===""){
      formData.cough="Yo'q"
    }
    if(formData.phlegm===""){
      formData.phlegm="Yo'q"
    }
    if(formData.shortness_of_breath===""){
      formData.shortness_of_breath="Yo'q"
    }
    if(formData.temperature===""){
      formData.temperature="Yo'q"
    }
    
    try {
      const response = await fetch("https://hospital-backend.ilhomjon.site/api/v1/patients/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }else{
        setSubmitText("Yuborildi")
      }
      

      const result = await response.json()
      

      // Show the confirmation message
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error:", error)
      // Here you might want to set some error state and show an error message to the user
    }
  }

  return (
    <div className="container mx-auto p-4 ">
      {isSubmitted ? (
        <ConfirmationMessage />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Patient Information */}
          <img src={Logo} alt="Logo" className="mx-auto mb-2 sm:w-36 w-24 " />
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">CP-Check</h2>
            <div className="mb-4">
              <label htmlFor="patientName" className="block mb-2 font-bold text-lg">
                Bemor (FISh)
              </label>
              <input
                type="text"
                id="patientName"
                name="fullname"
                value={formData.fullname}
                required
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <p className="mb-2 font-bold text-lg">Yoshi</p>
              {["40 dan kichik", "40-50", "50-60", "60-70", "70 dan katta"].map((option) => (
                <label key={option} className="block mb-2">
                  <input
                    required
                    type="radio"
                    name="age"
                    value={option}
                    checked={formData.age === option}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* 2. Risk Factors */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Xavf omillari</h2>

            <div className="mb-4">
              <p className="mb-2 font-bold text-lg">Turar joy, ish sharoiti</p>
              {["Zararli omillar (chang, kimyoviy vositalar mavjud)", "Zararli omillar mavjud emas"].map((option) => (
                <label key={option} className="block mb-2">
                  <input
                    required
                    type="radio"
                    name="housing_or_working_conditions"
                    value={option}
                    checked={formData.housing_or_working_conditions === option}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>

            <div className="mb-4">
              <p className="mb-2 font-bold text-lg">Chekish</p>
              {["Chekadi (ilgari chekkan bo’lsa ham)", "Chekmaydi"].map((option) => (
                <label key={option} className="block mb-2">
                  <input
                    required
                    type="radio"
                    name="smoking"
                    value={option}
                    checked={formData.smoking === option}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="mb-4">
              <p className="mb-2 font-bold text-lg">Sovuq qotish</p>
              {["Ha", "Yo'q"].map((option) => (
                <label key={option} className="block mb-2">
                  <input
                    required
                    type="radio"
                    name="cold_exposure"
                    value={option}
                    checked={formData.cold_exposure === option}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          
            <div className="mb-4">
              <p className="mb-2 font-bold text-lg">Allergenlar bilan kontakt</p>
              {["Ha", "Yo'q"].map((option) => (
                <label key={option} className="block mb-2">
                  <input
                    required
                    type="radio"
                    name="contact_with_allergens"
                    value={option}
                    checked={formData.contact_with_allergens === option}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="mb-4">
              <p className="mb-2 font-bold text-lg">Irsiy moyillik</p>
              {["Ha", "Yo'q"].map((option) => (
                <label key={option} className="block mb-2">
                  <input
                    required
                    type="radio"
                    name="hereditary_predisposition"
                    value={option}
                    checked={formData.hereditary_predisposition === option}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>


           
          </div>

          {/* 3. Medical History (Anamnesis) */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Anamnez</h2>

            <div className="mb-4">
              <p className="mb-2 font-bold text-lg">Kasallik boshlanishi</p>
              {["O'tkir", "Sekinasta"].map((option) => (
                <label key={option} className="block mb-2">
                  <input
                    required
                    type="radio"
                    name="onset_of_disease"
                    value={option}
                    checked={formData.onset_of_disease === option}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>

            <div className="mb-4">
              <p className="mb-2 font-bold text-lg">Kasallik kechishi</p>
              {["Tez avj olish", "O'rta avj olish ", "Sekin avj olish"].map((option) => (
                <label key={option} className="block mb-2">
                  <input
                    required
                    type="radio"
                    name="course_of_disease"
                    value={option}
                    checked={formData.course_of_disease === option}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>

            <div className="mb-4">
              <p className="mb-2 font-bold text-lg">Xurujli kechishi</p>
              {["Ha", "Yo'q"].map((option) => (
                <label key={option} className="block mb-2">
                  <input
                    required
                    type="radio"
                    name="attack_course"
                    value={option}
                    checked={formData.attack_course === option}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>

            <div className="mb-4">
              <p className="mb-2 font-bold text-lg">Davo samaradorlik</p>
              {["Samarador", "Samarasiz"].map((option) => (
                <label key={option} className="block mb-2">
                  <input
                    required
                    type="radio"
                    name="treatment_effectiveness"
                    value={option}
                    checked={formData.treatment_effectiveness === option}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* 4. Complaints */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Shikoyat</h2>

            <div className="mb-4">
              <p className="mb-2  font-bold text-lg">Yo'tal</p>
              <div className="flex items-center space-x-4 mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="cough_attack"
                    value="Yes"
                    checked={formData.cough}
                    onChange={(e) => {
                      handleInputChange({
                        target: {
                          name: "cough",
                          type: "checkbox",
                          checked: e.target.checked,
                        },
                      })
                      if (!e.target.checked) {
                        handleInputChange({
                          target: {
                            name: "cough_attack",
                            type: "radio",
                            value: "",
                          },
                        })
                      }
                    }}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Ha</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="cough_attack"
                    value="No"
                    checked={!formData.cough}
                    onChange={(e) => {
                      handleInputChange({
                        target: {
                          name: "cough",
                          type: "checkbox",
                          checked: !e.target.checked,
                        },
                      })
                      if (e.target.checked) {
                        handleInputChange({
                          target: {
                            name: "cough_attack",
                            type: "radio",
                            value: "",
                          },
                        })
                      }
                    }}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Yo'q</span>
                </label>
              </div>
              {formData.cough && (
                <div className="ml-4 mt-2 space-y-2">
                  {[
                    "Xurujli",
                    "Doimiy",
                    "Tunda kuchayishi",
                    "Tixiy",
                    "Ertalab kuchayishi",
                    "Zvonkiy",
                    "Bitonalniy ",
                  ].map((option) => (
                    <label key={option} className="block">
                      <input
                        required
                        type="radio"
                        name="cough_attack"
                        value={option}
                        checked={formData.cough_attack === option}
                        onChange={handleInputChange}
                        className="form-radio h-5 w-5 text-blue-600 mr-2"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <p className="mb-2 font-bold text-lg">Balg'am</p>
              <div className="flex items-center space-x-4 mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="what_sputum"
                    value="Yes"
                    checked={formData.phlegm}
                    onChange={(e) => {
                      handleInputChange({
                        target: {
                          name: "phlegm",
                          type: "checkbox",
                          checked: e.target.checked,
                        },
                      })
                      if (!e.target.checked) {
                        handleInputChange({
                          target: {
                            name: "what_sputum",
                            type: "radio",
                            value: "",
                          },
                        })
                      }
                    }}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Ha</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="what_sputum"
                    value="No"
                    checked={!formData.phlegm}
                    onChange={(e) => {
                      handleInputChange({
                        target: {
                          name: "phlegm",
                          type: "checkbox",
                          checked: !e.target.checked,
                        },
                      })
                      if (e.target.checked) {
                        handleInputChange({
                          target: {
                            name: "what_sputum",
                            type: "radio",
                            value: "",
                          },
                        })
                      }
                    }}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Yo'q</span>
                </label>
              </div>
              {formData.phlegm && (
                <div className="ml-4 mt-2 space-y-2">
                  {[
                    "Shilliq",
                    "Shilliq yiringlash",
                    "Ko'p miqdorda",
                    "Yiringli, zangsiz",
                    "Qon tuflash",
                  ].map((option) => (
                    <label key={option} className="block">
                      <input
                        required
                        type="radio"
                        name="what_sputum"
                        value={option}
                        checked={formData.what_sputum === option}
                        onChange={handleInputChange}
                        className="form-radio h-5 w-5 text-blue-600 mr-2"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-4">
              <p className="mb-2 font-bold text-lg">Xansirash</p>
              <div className="flex items-center space-x-4 mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="what_suffocation"
                    value="Yes"
                    checked={formData.shortness_of_breath}
                    onChange={(e) => {
                      handleInputChange({
                        target: {
                          name: "shortness_of_breath",
                          type: "checkbox",
                          checked: e.target.checked,
                        },
                      })
                      if (!e.target.checked) {
                        handleInputChange({
                          target: {
                            name: "what_suffocation",
                            type: "radio",
                            value: "",
                          },
                        })
                      }
                    }}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Ha</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="what_suffocation"
                    value="No"
                    checked={!formData.shortness_of_breath}
                    onChange={(e) => {
                      handleInputChange({
                        target: {
                          name: "shortness_of_breath",
                          type: "checkbox",
                          checked: !e.target.checked,
                        },
                      })
                      if (e.target.checked) {
                        handleInputChange({
                          target: {
                            name: "what_suffocation",
                            type: "radio",
                            value: "",
                          },
                        })
                      }
                    }}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Yo'q</span>
                </label>
              </div>
              {formData.shortness_of_breath && (
                <div className="ml-4 mt-2 space-y-2">
                  {[
                    "Doimiy",
                    "Bo'g'ilish",
                    "Ifyuzalanish",
                  ].map((option) => (
                    <label key={option} className="block">
                      <input
                        required
                        type="radio"
                        name="what_suffocation"
                        value={option}
                        checked={formData.what_suffocation === option}
                        onChange={handleInputChange}
                        className="form-radio h-5 w-5 text-blue-600 mr-2"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-4">
              <p className="mb-2 font-bold text-lg">Og'riq</p>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    required
                    type="radio"
                    name="pain"
                    value="Ha"
                    checked={formData.pain === "Ha"}
                    onChange={handleInputChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Ha</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    required
                    type="radio"
                    name="pain"
                    value="Yo'q"
                    checked={formData.pain === "Yo'q"}
                    onChange={handleInputChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Yo'q</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <p className="mb-2 font-bold text-lg">Harorat</p>
              <div className="flex items-center space-x-4 mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="what_temperature"
                    value="Yes"
                    checked={formData.temperature}
                    onChange={(e) => {
                      handleInputChange({
                        target: {
                          name: "temperature",
                          type: "checkbox",
                          checked: e.target.checked,
                        },
                      })
                      if (!e.target.checked) {
                        handleInputChange({
                          target: {
                            name: "what_temperature",
                            type: "radio",
                            value: "",
                          },
                        })
                      }
                    }}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Ha</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="what_temperature"
                    value="No"
                    checked={!formData.temperature}
                    onChange={(e) => {
                      handleInputChange({
                        target: {
                          name: "temperature",
                          type: "checkbox",
                          checked: !e.target.checked,
                        },
                      })
                      if (e.target.checked) {
                        handleInputChange({
                          target: {
                            name: "what_temperature",
                            type: "radio",
                            value: "",
                          },
                        })
                      }
                    }}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Yo'q</span>
                </label>
              </div>
              {formData.temperature && (
                <div className="ml-4 mt-2 space-y-2">
                  {["37-38°C", "38-39°C", "39-40°C"].map((option) => (
                    <label key={option} className="block">
                      <input
                        required
                        type="radio"
                        name="what_temperature"
                        value={option}
                        checked={formData.what_temperature === option}
                        onChange={handleInputChange}
                        className="form-radio h-5 w-5 text-blue-600 mr-2"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 5. Respiratory Sounds */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Nafas shovqinlari</h2>

            <div className="mb-6">
              <p className="mb-2 font-bold text-lg">Turi</p>
              {[
                "Vezikulyar nafas ",
                "Sust vezikulyar nafas",
                "Quruq xirillash",
                "Xushtaksimon xirillash",
                "Nam mayda pufakli xirillash",
                "Nam yirik pufak xirillash",
                "Nam jarangli xirrilash",
                "Krepitatsiya",
                "Patologik bronxial shovqin",
                "Dag'al nafas",
              ].map((option) => (
                <label key={option} className="block mb-2">
                  <input
                    type="checkbox"
                    name="breath_sound_types"
                    value={option}
                    checked={formData.breath_sound_types.includes(option)}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>

            <div className="mb-6">
              <p className="mb-2 font-bold text-lg">Lokalizatsiya</p>
              {["O'ng ", "Chap", "Yuqori", "O'rta", "Past"].map((option) => (
                <label key={option} className="block mb-2">
                  <input
                    type="checkbox"
                    name="breath_sound_location"
                    value={option}
                    checked={formData.breath_sound_location.includes(option)}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="block mx-auto pt-4  pr-12  pb-4  pl-12  rounded-full bg-[#FFC82A] text-base font-medium leading-[0.85rem] text-center text-[#21466D] hover:bg-[#21466D59]">
            {submitText}
          </button>
        </form>
      )}
    </div>
  )
}

export default MedicalForm

