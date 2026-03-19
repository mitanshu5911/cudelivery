import { motion } from "framer-motion";
import ProfileCard from "../components/settings/ProfileCard";
import SecurityCard from "../components/settings/SecurityCard";
import AccountActions from "../components/settings/AccountActions";

const Settings = () => {
  return (
    <div className="w-full px-6 py-10">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Settings ⚙️
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your account preferences and security
          </p>
        </div>

        {/* CARDS */}
        <div className="space-y-6">

          <ProfileCard />

          <SecurityCard />

          <AccountActions />

        </div>
      </motion.div>
    </div>
  );
};

export default Settings;