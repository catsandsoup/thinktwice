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
    beginner: "bg-primary text-white",
    intermediate: "bg-secondary text-white",
  };

  return (
    <>
      <SidebarTrigger className="fixed top-4 left-4 z-50" />
      <Sidebar variant="floating">
        <SidebarContent className="bg-background">
          {groupedChallenges && Object.entries(groupedChallenges).map(([difficulty, challenges], index) => (
            <div key={difficulty} className="mb-4">
              {index > 0 && <Separator className="my-6" />}
              <SidebarGroup className={`rounded-lg p-4 ${difficultyColors[difficulty as keyof typeof difficultyColors] || ''}`}>
                <SidebarGroupLabel className="text-lg font-semibold capitalize mb-2">
                  {difficulty} Level
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="max-h-[60vh] overflow-y-auto pr-2">
                    {challenges?.map((challenge) => (
                      <SidebarMenuItem key={challenge.id}>
                        <SidebarMenuButton
                          tooltip={challenge.description}
                          className="text-base hover:bg-white/20 transition-colors"
                          onClick={() => {
                            const path = difficulty === 'beginner' ? '/beginners-journey' : '/truth-explorer';
                            navigate(`${path}#${challenge.id}`);
                          }}
                        >
                          <BookOpen className="h-5 w-5" />
                          <span className="font-medium">{challenge.title}</span>
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