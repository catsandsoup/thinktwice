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
      console.log("Fetching challenges...");
      const { data, error } = await supabase
        .from("challenges")
        .select("*")
        .order("difficulty", { ascending: true });

      if (error) {
        console.error("Error fetching challenges:", error);
        throw error;
      }
      
      console.log("Fetched challenges:", data);
      return data;
    },
  });

  const groupedChallenges = challenges?.reduce((acc, challenge) => {
    const key = challenge.difficulty;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(challenge);
    return acc;
  }, {} as Record<string, typeof challenges>);

  console.log("Grouped challenges:", groupedChallenges);

  return (
    <>
      <SidebarTrigger className="fixed top-4 left-4 z-50 md:top-8" />
      <Sidebar variant="floating">
        <SidebarContent className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="h-full overflow-y-auto px-2 py-4">
            {groupedChallenges && Object.entries(groupedChallenges).map(([difficulty, challenges], index) => (
              <div key={difficulty} className="mb-6 last:mb-0">
                {index > 0 && <Separator className="my-6" />}
                <div className={`rounded-xl p-6 ${
                  difficulty === 'beginner' 
                    ? 'bg-[#6366F1] text-white' 
                    : 'bg-[#0D9488] text-white'
                }`}>
                  <SidebarGroup>
                    <SidebarGroupLabel className="text-2xl font-bold mb-4">
                      {difficulty === 'beginner' ? 'Beginner Level' : 'Intermediate Level'}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu className="space-y-1">
                        {challenges?.map((challenge) => (
                          <SidebarMenuItem key={challenge.id}>
                            <SidebarMenuButton
                              tooltip={challenge.description}
                              className="w-full text-left px-4 py-3 rounded-lg text-base font-medium hover:bg-white/20 transition-colors"
                              onClick={() => {
                                const path = difficulty === 'beginner' ? '/beginners-journey' : '/truth-explorer';
                                navigate(`${path}#${challenge.id}`);
                              }}
                            >
                              <BookOpen className="h-5 w-5 shrink-0" />
                              <span className="truncate">{challenge.title}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </div>
              </div>
            ))}
          </div>
        </SidebarContent>
      </Sidebar>
    </>
  );
}