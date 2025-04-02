import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

type CarDetailsForm = {
  brand: string;
  model: string;
  year: string;
  bodyType: string;
  fuelType: string;
  transmission: string;
  color: string;
  mileage: string;
  price: string;
  description: string;
  features: string[];
  name: string;
  email: string;
  phone: string;
  location: string;
  images: File[];
};

const initialFormState: CarDetailsForm = {
  brand: '',
  model: '',
  year: '',
  bodyType: '',
  fuelType: '',
  transmission: '',
  color: '',
  mileage: '',
  price: '',
  description: '',
  features: [],
  name: '',
  email: '',
  phone: '',
  location: '',
  images: [],
};

const availableFeatures = [
  { id: 'ac', name: 'Air Conditioning' },
  { id: 'power_steering', name: 'Power Steering' },
  { id: 'power_windows', name: 'Power Windows' },
  { id: 'abs', name: 'ABS' },
  { id: 'airbags', name: 'Airbags' },
  { id: 'sunroof', name: 'Sunroof' },
  { id: 'bluetooth', name: 'Bluetooth' },
  { id: 'cruise_control', name: 'Cruise Control' },
  { id: 'parking_sensors', name: 'Parking Sensors' },
  { id: 'backup_camera', name: 'Backup Camera' },
  { id: 'navigation', name: 'Navigation System' },
  { id: 'leather_seats', name: 'Leather Seats' },
];

export default function SellCarPage() {
  const [formData, setFormData] = useState<CarDetailsForm>(initialFormState);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFeatureChange = (featureId: string) => {
    setFormData(prev => {
      if (prev.features.includes(featureId)) {
        return { ...prev, features: prev.features.filter(id => id !== featureId) };
      } else {
        return { ...prev, features: [...prev.features, featureId] };
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));

    // Create preview URLs for the images
    const newImageUrls = Array.from(files).map(file => URL.createObjectURL(file));
    setImagePreviewUrls(prev => [...prev, ...newImageUrls]);
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    
    const newImageUrls = [...imagePreviewUrls];
    URL.revokeObjectURL(newImageUrls[index]);
    newImageUrls.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
    setImagePreviewUrls(newImageUrls);
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, you would submit the form data to your backend here
    // For demonstration purposes, we'll simulate an API call
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      // Reset form after successful submission
      setFormData(initialFormState);
      setImagePreviewUrls([]);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center">
            <div 
              className={`rounded-full h-8 w-8 flex items-center justify-center border-2 font-medium
                ${step === i 
                  ? 'border-primary-600 bg-primary-600 text-white' 
                  : step > i 
                    ? 'border-primary-600 text-primary-600' 
                    : 'border-gray-300 text-gray-400'}`}
            >
              {step > i ? '✓' : i}
            </div>
            {i < 3 && (
              <div 
                className={`w-10 h-1 sm:w-16 md:w-24 ${step > i ? 'bg-primary-600' : 'bg-gray-300'}`}
              ></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Listing Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your car has been listed for sale. Our team will review your listing and it will be live within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
              <button
                type="button"
                onClick={() => navigate('/cars')}
                className="btn-primary"
              >
                Browse Cars
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                }}
                className="btn-outline"
              >
                List Another Car
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Sell Your Car</h1>
        <p className="text-gray-600 mb-8 text-center">Fill out the details below to list your car for sale</p>
        
        {renderStepIndicator()}
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Car Details */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Car Details</h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                        Brand *
                      </label>
                      <select
                        id="brand"
                        name="brand"
                        required
                        value={formData.brand}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="">Select Brand</option>
                        <option value="toyota">Toyota</option>
                        <option value="honda">Honda</option>
                        <option value="maruti">Maruti Suzuki</option>
                        <option value="hyundai">Hyundai</option>
                        <option value="tata">Tata</option>
                        <option value="mahindra">Mahindra</option>
                        <option value="bmw">BMW</option>
                        <option value="mercedes">Mercedes-Benz</option>
                        <option value="audi">Audi</option>
                        <option value="tesla">Tesla</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                        Model *
                      </label>
                      <input
                        type="text"
                        id="model"
                        name="model"
                        required
                        value={formData.model}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                        Year *
                      </label>
                      <select
                        id="year"
                        name="year"
                        required
                        value={formData.year}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="">Select Year</option>
                        {Array.from({ length: 35 }, (_, i) => new Date().getFullYear() - i).map(year => (
                          <option key={year} value={year.toString()}>{year}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="bodyType" className="block text-sm font-medium text-gray-700 mb-1">
                        Body Type *
                      </label>
                      <select
                        id="bodyType"
                        name="bodyType"
                        required
                        value={formData.bodyType}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="">Select Body Type</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="convertible">Convertible</option>
                        <option value="coupe">Coupe</option>
                        <option value="van">Van</option>
                        <option value="truck">Truck</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
                        Fuel Type *
                      </label>
                      <select
                        id="fuelType"
                        name="fuelType"
                        required
                        value={formData.fuelType}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="">Select Fuel Type</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="cng">CNG</option>
                        <option value="lpg">LPG</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">
                        Transmission *
                      </label>
                      <select
                        id="transmission"
                        name="transmission"
                        required
                        value={formData.transmission}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="">Select Transmission</option>
                        <option value="manual">Manual</option>
                        <option value="automatic">Automatic</option>
                        <option value="semi-automatic">Semi-Automatic</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                        Color
                      </label>
                      <input
                        type="text"
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-1">
                        Mileage (km) *
                      </label>
                      <input
                        type="number"
                        id="mileage"
                        name="mileage"
                        required
                        min="0"
                        value={formData.mileage}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        required
                        min="0"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        required
                        value={formData.description}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Provide details about your car's condition, history, and any additional information that buyers should know."
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Features & Images */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Features & Images</h2>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {availableFeatures.map(feature => (
                        <div key={feature.id} className="flex items-center">
                          <input
                            id={`feature-${feature.id}`}
                            type="checkbox"
                            checked={formData.features.includes(feature.id)}
                            onChange={() => handleFeatureChange(feature.id)}
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <label htmlFor={`feature-${feature.id}`} className="ml-2 text-sm text-gray-600">
                            {feature.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Car Images *</h3>
                    <div className="mb-4">
                      <label className="block text-sm text-gray-500 mb-2">
                        Upload at least 3 images of your car (exterior, interior, etc.)
                      </label>
                      <input
                        type="file"
                        id="images"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                      />
                    </div>
                    
                    {imagePreviewUrls.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                        {imagePreviewUrls.map((url, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={url} 
                              alt={`Car preview ${index + 1}`} 
                              className="h-24 w-full object-cover rounded-md" 
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Step 3: Contact Information */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location *
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="City, State"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          required
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="text-gray-600">
                          I agree to the <a href="#" className="text-primary-600 hover:text-primary-500">Terms of Service</a> and <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-outline"
                  >
                    Previous
                  </button>
                )}
                
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary ml-auto"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || formData.images.length < 1}
                    className="btn-primary ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Listing'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tips for Selling Your Car Quickly</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
              <span>Provide accurate and detailed information about your car</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
              <span>Upload clear, high-quality photos of the exterior and interior</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
              <span>Be honest about any issues or damage to your vehicle</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
              <span>Price your car competitively based on market value</span>
            </li>
            <li className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
              <span>Respond quickly to inquiries from potential buyers</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 