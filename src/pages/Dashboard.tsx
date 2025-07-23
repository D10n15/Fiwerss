import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Eye, Calendar, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const stats = [
    {
      name: 'Ventas Totales',
      value: '$45,231',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Nuevos Clientes',
      value: '1,234',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Conversiones',
      value: '98.5%',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Tasa de Rebote',
      value: '24.1%',
      change: '-3.2%',
      changeType: 'negative' as const,
      icon: Activity,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const recentActivity = [
    { id: 1, type: 'sale', message: 'Nueva venta de $1,250', time: '2 min ago', user: 'María González' },
    { id: 2, type: 'lead', message: 'Nuevo lead registrado', time: '15 min ago', user: 'Carlos Ruiz' },
    { id: 3, type: 'conversion', message: 'Lead convertido a cliente', time: '1 hr ago', user: 'Ana Martín' },
    { id: 4, type: 'meeting', message: 'Reunión programada', time: '2 hrs ago', user: 'Luis Hernández' },
    { id: 5, type: 'sale', message: 'Venta completada de $850', time: '3 hrs ago', user: 'Elena Rodríguez' }
  ];

  const topProducts = [
    { name: 'Plan Premium', sales: 145, revenue: '$14,500', growth: '+15%' },
    { name: 'Plan Básico', sales: 98, revenue: '$4,900', growth: '+8%' },
    { name: 'Plan Empresarial', sales: 67, revenue: '$20,100', growth: '+22%' },
    { name: 'Servicios Adicionales', sales: 34, revenue: '$3,400', growth: '+12%' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sale': return '💰';
      case 'lead': return '👤';
      case 'conversion': return '✨';
      case 'meeting': return '📅';
      default: return '📈';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bienvenido, {user?.name}
              </h1>
              <p className="text-gray-600 mt-1">
                Aquí tienes un resumen de tu rendimiento
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <select
                aria-label="Seleccionar período"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Últimos 7 días</option>
                <option value="30d">Últimos 30 días</option>
                <option value="90d">Últimos 90 días</option>
              </select>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Exportar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <div className="flex items-center mt-4">
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">vs mes anterior</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Ventas por Período</h3>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Ver detalles</span>
              </div>
            </div>
            
            {/* Simulated Chart */}
            <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600">Gráfico de ventas interactivo</p>
                <p className="text-sm text-gray-500 mt-2">Aquí se mostraría un gráfico real</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Actividad Reciente</h3>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="text-lg">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
              Ver toda la actividad
            </button>
          </div>
        </div>

        {/* Top Products */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Productos Más Vendidos</h3>
            <button
              onClick={() => onNavigate('products')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Producto</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Ventas</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Ingresos</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Crecimiento</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-medium text-gray-900">{product.name}</td>
                    <td className="py-4 px-4 text-gray-600">{product.sales}</td>
                    <td className="py-4 px-4 text-gray-600">{product.revenue}</td>
                    <td className="py-4 px-4">
                      <span className="text-green-600 font-medium">{product.growth}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => onNavigate('products')}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold">Ver Productos</h4>
                <p className="text-sm opacity-90">Gestionar inventario</p>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => onNavigate('profile')}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold">Mi Perfil</h4>
                <p className="text-sm opacity-90">Configurar cuenta</p>
              </div>
            </div>
          </button>
          
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold">Reportes</h4>
                <p className="text-sm opacity-90">Análisis detallado</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;