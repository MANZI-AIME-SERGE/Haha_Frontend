import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context';
import { supermarketService } from '../../services';
import { Input, Textarea, Button, ImageUpload } from '../../components/ui';

const RegisterSupermarket = () => {
  const navigate = useNavigate();
  const { success, error } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    phone: '',
    email: '',
  });
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleImageChange = (file) => {
    setLogo(file);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Supermarket name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('location', formData.location);
      data.append('phone', formData.phone);
      data.append('email', formData.email);
      if (logo) {
        data.append('logo', logo);
      }

      await supermarketService.registerSupermarket(data);
      success('Supermarket registered successfully! Awaiting approval.');
      navigate('/vendor/dashboard');
    } catch (err) {
      error(err.response?.data?.message || 'Failed to register supermarket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/vendor/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Register Your Supermarket</h1>
          <p className="text-gray-600 mt-1">Set up your store on HAHA Platform</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <ImageUpload
              label="Store Logo"
              preview={preview}
              setPreview={setPreview}
              onChange={handleImageChange}
            />

            <Input
              label="Supermarket Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Kigali Fresh Mart"
              error={errors.name}
            />

            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell customers about your store..."
              rows={4}
              error={errors.description}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Kigali, Nyarugenge"
                error={errors.location}
              />

              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+250 788 000 000"
                error={errors.phone}
              />
            </div>

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="store@example.com"
              error={errors.email}
            />

            <div className="pt-4">
              <Button
                type="submit"
                loading={loading}
                className="w-full"
                size="lg"
              >
                Register Supermarket
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterSupermarket;
