import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BookOpen } from "lucide-react";

export function QuestionsNavigation() {
  const { data: challenges } = useQuery({
    queryKey: ["challenges"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("challenges")
        .select("*")
        .order("difficulty", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const groupedChallenges = challenges?.reduce((acc, challenge) => {
    if (!acc[challenge.difficulty]) {
      acc[challenge.difficulty] = [];
    }
    acc[challenge.difficulty].push(challenge);
    return acc;
  }, {} as Record<string, typeof challenges>);

  return (
    <Sidebar variant="floating">
      <SidebarContent>
        {groupedChallenges && Object.entries(groupedChallenges).map(([difficulty, challenges], index) => (
          <div key={difficulty}>
            {index > 0 && <Separator className="my-4 bg-white/10" />}
            <SidebarGroup>
              <SidebarGroupLabel className="capitalize">
                {difficulty} Level
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {challenges?.map((challenge) => (
                    <SidebarMenuItem key={challenge.id}>
                      <SidebarMenuButton
                        tooltip={challenge.description}
                        asChild
                      >
                        <a href={`#${challenge.id}`}>
                          <BookOpen className="h-4 w-4" />
                          <span>{challenge.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}