import { Button } from "@/components/ui/button";
import { Settings, Bell, LogOut } from "lucide-react";

interface SettingsSupportProps {
  onLogout: () => void;
}

const SettingsSupport = ({ onLogout }: SettingsSupportProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm">
        <Bell className="h-4 w-4 mr-2" />
        Notifications (3 New)
      </Button>
      <Button variant="outline" size="sm">
        <Settings className="h-4 w-4 mr-2" />
        Settings
      </Button>
      <Button variant="outline" size="sm" onClick={onLogout}>
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </div>
  );
};

export default SettingsSupport;