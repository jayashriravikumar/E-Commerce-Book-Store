import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">

        <h1 className="text-2xl font-bold mb-8">
          Admin Panel
        </h1>

        <nav className="space-y-4">

          <Link
            to="/admin/dashboard"
            className="block hover:text-yellow-400"
          >
            📊 Dashboard
          </Link>

          <Link
            to="/admin/backup"
            className="block hover:text-yellow-400"
          >
            💾 Backup & Recovery
          </Link>

          <Link
            to="/admin/products"
            className="block hover:text-yellow-400"
          >
            📚 Products
          </Link>
          <Link
  to="/admin/add-product"
  className="block hover:text-yellow-400"
>
  ➕ Add Product
</Link>

          <Link
            to="/admin/orders"
            className="block hover:text-yellow-400"
          >
            🛒 Orders
          </Link>

          <Link
            to="/admin/users"
            className="block hover:text-yellow-400"
          >
            👥 Users
          </Link>

        </nav>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;