import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Star, Package } from 'lucide-react';

interface ProductsPageProps {
  onNavigate: (page: string) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showAddProduct, setShowAddProduct] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Plan Premium',
      category: 'subscription',
      price: 99.99,
      stock: 'Unlimited',
      sales: 145,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active'
    },
    {
      id: 2,
      name: 'Plan Básico',
      category: 'subscription',
      price: 49.99,
      stock: 'Unlimited',
      sales: 98,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active'
    },
    {
      id: 3,
      name: 'Consultoría Estratégica',
      category: 'service',
      price: 299.99,
      stock: 'Limited',
      sales: 67,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active'
    },
    {
      id: 4,
      name: 'Curso Online Marketing',
      category: 'course',
      price: 199.99,
      stock: 'Unlimited',
      sales: 234,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active'
    },
    {
      id: 5,
      name: 'Herramientas Adicionales',
      category: 'tools',
      price: 29.99,
      stock: 'Unlimited',
      sales: 156,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active'
    },
    {
      id: 6,
      name: 'Soporte Técnico VIP',
      category: 'service',
      price: 149.99,
      stock: 'Limited',
      sales: 89,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'inactive'
    }
  ];

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'subscription', label: 'Suscripciones' },
    { id: 'service', label: 'Servicios' },
    { id: 'course', label: 'Cursos' },
    { id: 'tools', label: 'Herramientas' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return b.price - a.price;
      case 'sales':
        return b.sales - a.sales;
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'subscription': return 'bg-blue-100 text-blue-800';
      case 'service': return 'bg-green-100 text-green-800';
      case 'course': return 'bg-purple-100 text-purple-800';
      case 'tools': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
              <p className="text-gray-600 mt-1">Administra tu catálogo de productos y servicios</p>
            </div>
            <button
              className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              onClick={() => setShowAddProduct(true)}
              type="button"
            >
              <Plus className="h-5 w-5" />
              <span>Agregar Producto</span>
            </button>
            <button onClick={() => onNavigate('detalleProducto')}>Ir a detalle</button>
            {showAddProduct && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto relative">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowAddProduct(false)}
                    type="button"
                  >
                    ×
                  </button>
                  <h2 className="text-xl font-bold mb-4 text-gray-800">Nuevo Producto</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nombre</label>
                      <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Nombre del producto" />
                    </div>
                    <div>
                      <label htmlFor="new-product-category" className="block text-sm font-medium text-gray-700">Categoría</label>
                      <select
                        id="new-product-category"
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Selecciona una categoría</option>
                        <option value="subscription">Suscripción</option>
                        <option value="service">Servicio</option>
                        <option value="course">Curso</option>
                        <option value="tools">Herramienta</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Precio</label>
                      <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Precio" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Stock</label>
                      <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Stock" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Imagen (URL)</label>
                      <input type="url" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500" placeholder="URL de la imagen" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors">Guardar Producto</button>
                  </form>
                </div>
              </div>
            )}
            <button onClick={() => onNavigate('detalleProducto')}>Ir a detalle</button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
            <label>
              Categoría
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </label>
            </div>

            {/* Sort */}
            <div>
            <label>
              categoria
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Ordenar por Nombre</option>
                <option value="price">Ordenar por Precio</option>
                <option value="sales">Ordenar por Ventas</option>
                <option value="rating">Ordenar por Rating</option>
              </select>
            </label>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(product.category)}`}>
                    {categories.find(cat => cat.id === product.category)?.label}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className={`w-3 h-3 rounded-full ${product.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{product.sales}</span> ventas
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">Ver detalles</span>
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      aria-label="Editar">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      aria-label="Eliminar">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600">Intenta ajustar tus filtros o agregar nuevos productos</p>
          </div>
        )}

        {/* Pagination */}
        {sortedProducts.length > 0 && (
          <div className="mt-8 flex items-center justify-center space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              Anterior
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;