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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function QuestionsNavigation() {
  const navigate = useNavigate();
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

  const difficultyColors = {
    beginner: "bg-primary/10 border-primary/20",
    intermediate: "bg-secondary/10 border-secondary/20",
  };

  return (
    <>
      <SidebarTrigger className="fixed top-8 left-4 z-50" />
      <Sidebar variant="floating">
        <SidebarContent>
          {groupedChallenges && Object.entries(groupedChallenges).map(([difficulty, challenges], index) => (
            <div key={difficulty}>
              {index > 0 && <Separator className="my-4 bg-white/10" />}
              <SidebarGroup className={`rounded-lg border p-4 ${difficultyColors[difficulty as keyof typeof difficultyColors] || ''}`}>
                <SidebarGroupLabel className="capitalize">
                  {difficulty} Level
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {challenges?.map((challenge) => (
                      <SidebarMenuItem key={challenge.id}>
                        <SidebarMenuButton
                          tooltip={challenge.description}
                          onClick={() => {
                            const path = difficulty === 'beginner' ? '/beginners-journey' : '/truth-explorer';
                            navigate(`${path}#${challenge.id}`);
                          }}
                        >
                          <BookOpen className="h-4 w-4" />
                          <span>{challenge.title}</span>
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
    </>
  );
}