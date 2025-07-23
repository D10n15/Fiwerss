import React, { useState } from 'react';
import { Camera, Save, User, MapPin, Calendar, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+34 123 456 789',
    location: 'Madrid, España',
    bio: 'Especialistas en marketing digital y ventas con más de 5 años de experiencia.',
    company: 'TechCorp Solutions',
    position: 'Director de Marketing',
    website: 'https://techcorp.com',
    avatarUrl: '' // Añadido para evitar el error de propiedad inexistente
  });
  

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateProfile({ 
      name: formData.name,
      email: formData.email 
    });
    
    setIsEditing(false);
    setIsSaving(false);
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordChange(false);
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
        <p className="text-gray-600 mt-1">Gestiona tu información personal y configuración</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-center">
          {/* Avatar */}
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold"
            aria-label="Avatar">
            {formData.avatarUrl ? (
              <img
              src={formData.avatarUrl}
              alt="Foto de perfil"
              className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              user?.name?.charAt(0).toUpperCase()
            )}
            </div>
            <label className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg border-2 border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
            aria-label="Cambiar foto de perfil">
            <Camera className="h-5 w-5 text-gray-600" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = ev => {
                setFormData(prev => ({
                  ...prev,
                  avatarUrl: ev.target?.result as string
                }));
                };
                reader.readAsDataURL(file);
              }
              }}
            />
            </label>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mt-4">{user?.name}</h2>
          <p className="text-gray-600">{formData.position}</p>
          <p className="text-sm text-gray-500">{formData.company}</p>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{formData.location}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Miembro desde Enero 2024</span>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-4">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">156</div>
              <div className="text-sm text-gray-500">Ventas</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">4.8</div>
              <div className="text-sm text-gray-500">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">98%</div>
              <div className="text-sm text-gray-500">Satisfacción</div>
            </div>
            </div>
          </div>
          </div>
        </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2 space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Información Básica</h3>
          {!isEditing ? (
            <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            aria-label="Editar información básica"
            >
            Editar
            </button>
          ) : (
            <div className="space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-600 hover:text-gray-700 font-medium transition-colors"
              aria-label="Cancelar edición"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              aria-label="Guardar cambios"
            >
              {isSaving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
              <Save className="h-4 w-4" />
              )}
              <span>Guardar</span>
            </button>
            <button onClick={() => onNavigate('home')}>Volver al inicio</button>
            </div>
          )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre completo
            </label>
            <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="name"
              aria-label="Nombre completo"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Introduce tu nombre completo"
              title="Nombre completo"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
            </label>
            <input
            id="email"
            aria-label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Introduce tu correo electrónico"
            title="Correo electrónico"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono
            </label>
            <input
            id="phone"
            aria-label="Teléfono"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Introduce tu número de teléfono"
            title="Teléfono"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Ubicación
            </label>
            <input
            id="location"
            aria-label="Ubicación"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Introduce tu ubicación"
            title="Ubicación"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Empresa
            </label>
            <input
            id="company"
            aria-label="Empresa"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Introduce el nombre de la empresa"
            title="Empresa"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
            Cargo
            </label>
            <input
            id="position"
            aria-label="Cargo"
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Introduce tu cargo"
            title="Cargo"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
            Biografía
            </label>
            <textarea
            id="bio"
            aria-label="Biografía"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            rows={4}
            placeholder="Escribe una breve biografía"
            title="Biografía"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Seguridad</h3>
          </div>
          <button
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            aria-label="Cambiar contraseña"
          >
            Cambiar contraseña
          </button>
          </div>
          {showPasswordChange && (
          <div className="space-y-4">
            <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña actual
            </label>
            <input
              id="currentPassword"
              aria-label="Contraseña actual"
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Introduce tu contraseña actual"
              title="Contraseña actual"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            </div>
            <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Nueva contraseña
            </label>
            <input
              id="newPassword"
              aria-label="Nueva contraseña"
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="Introduce tu nueva contraseña"
              title="Nueva contraseña"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            </div>
            <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar nueva contraseña
            </label>
            <input
              id="confirmPassword"
              aria-label="Confirmar nueva contraseña"
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirma tu nueva contraseña"
              title="Confirmar nueva contraseña"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            </div>
            <button
            onClick={handlePasswordUpdate}
            disabled={isSaving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>Actualizar Contraseña</span>
            </button>
          </div>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Preferencias</h3>
          
          <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
            <h4 className="text-sm font-medium text-gray-900">Notificaciones por email</h4>
            <p className="text-sm text-gray-500">Recibe actualizaciones sobre tu cuenta</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
            <h4 className="text-sm font-medium text-gray-900">Notificaciones push</h4>
            <p className="text-sm text-gray-500">Recibe notificaciones en tiempo real</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />

            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
            <h4 className="text-sm font-medium text-gray-900">Marketing emails</h4>
            <p className="text-sm text-gray-500">Recibe ofertas y consejos de marketing</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};


export default ProfilePage;