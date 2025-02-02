import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Settings, User, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function MainNav() {
  const navigate = useNavigate();
  
  const { data: userRole } = useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();
        
      if (error) throw error;
      return data?.role;
    },
  });

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h1 className="text-xl font-bold">Think Twice</h1>
      
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu className="w-6 h-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Navigation</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/admin")}>
            <User className="w-4 h-4 mr-2" />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/settings")}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
          {userRole === 'admin' && (
            <DropdownMenuItem onClick={() => navigate("/admin")}>
              <Shield className="w-4 h-4 mr-2" />
              Admin Panel
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}