import { Settings, LogOut } from "lucide-react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

interface NavigationTabsProps {
  onNavigation: (index: number | null) => void;
}

export function NavigationTabs({ onNavigation }: NavigationTabsProps) {
  const navigationTabs = [
    { title: "Settings", icon: Settings },
    { title: "Sign Out", icon: LogOut },
  ];

  return (
    <ExpandableTabs 
      tabs={navigationTabs} 
      onChange={onNavigation}
      className="border-gray-200 dark:border-gray-800"
    />
  );
}