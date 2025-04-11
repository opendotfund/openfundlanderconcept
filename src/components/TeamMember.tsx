
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

type TeamMemberProps = {
  name: string;
  role: string;
  background: string;
  imageSrc: string;
  imageAlt?: string;
};

const TeamMember = ({ name, role, background, imageSrc, imageAlt = "Team member" }: TeamMemberProps) => {
  return (
    <Card className="overflow-hidden border-primary/10 hover:border-primary/50 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex flex-col items-center">
          <Avatar className="h-32 w-32 mb-4 border-2 border-primary">
            <AvatarImage src={imageSrc} alt={imageAlt} />
            <AvatarFallback className="bg-primary/20 text-primary text-xl">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="text-center">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-primary font-medium mb-2">{role}</p>
            <p className="text-muted-foreground text-sm">{background}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMember;
