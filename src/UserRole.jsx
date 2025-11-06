import React, { useState } from "react";

const Sprouter = () => (
  <div className="p-6 text-green-700 text-lg font-semibold">
    🌱 Welcome, Sprouter! Manage seeds & nurseries.
  </div>
);
const Cultivator = () => (
  <div className="p-6 text-amber-700 text-lg font-semibold">
    🌾 Welcome, Cultivator! Manage your farm & crops.
  </div>
);
const Consumer = () => (
  <div className="p-6 text-blue-700 text-lg font-semibold">
    🛒 Welcome, Consumer! Explore and buy fresh produce.
  </div>
);
const CarbonBuyer = () => (
  <div className="p-6 text-gray-700 text-lg font-semibold">
    💨 Welcome, Carbon Credit Buyer! Manage credits and trades.
  </div>
);
const HubEmployee = () => (
  <div className="p-6 text-purple-700 text-lg font-semibold">
    🏢 Welcome, Regional Hub Employee! Oversee logistics & hubs.
  </div>
);
const RentalProvider = () => (
  <div className="p-6 text-cyan-700 text-lg font-semibold">
    🚜 Welcome, Rental Provider! Manage equipment rentals.
  </div>
);
const Seller = () => (
  <div className="p-6 text-pink-700 text-lg font-semibold">
    🧺 Welcome, Seller! Manage your marketplace store.
  </div>
);

const roles = [
  { id: "sprouter", label: "Sprouter", component: Sprouter },
  { id: "cultivator", label: "Cultivator", component: Cultivator },
  { id: "consumer", label: "Consumer", component: Consumer },
  { id: "carbon_buyer", label: "Carbon Credit Buyer", component: CarbonBuyer },
  {
    id: "hub_employee",
    label: "Regional Hub Employee",
    component: HubEmployee,
  },
  {
    id: "rental_provider",
    label: "Rental Service Provider",
    component: RentalProvider,
  },
  { id: "seller", label: "Seller", component: Seller },
];

const UserRoles = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const RoleComponent = selectedRole
    ? roles.find((r) => r.id === selectedRole)?.component
    : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 font-[Poppins]">
      <h1 className="text-3xl font-bold text-green-700 mb-8">
        AgroVihan User Roles
      </h1>

      {!selectedRole ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className="px-6 py-4 bg-white rounded-xl shadow hover:shadow-lg border border-green-200 
              hover:border-green-500 transition-all duration-200 text-green-800 font-semibold"
            >
              {role.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 w-[90%] md:w-[50%] text-center">
          <RoleComponent />
          <button
            onClick={() => setSelectedRole(null)}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
          >
            ← Back to Role Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default UserRoles;
