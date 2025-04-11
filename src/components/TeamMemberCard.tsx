
import React from 'react';
import { cn } from '@/lib/utils';

type TeamMemberCardProps = {
  name: string;
  role: string;
  background: string;
  imageSrc?: string;
  className?: string;
};

const TeamMemberCard = ({ name, role, background, className }: TeamMemberCardProps) => {
  return (
    <div className={cn("team-member-card relative rounded-lg overflow-hidden", className)}>
      {/* Border effect with theme-sensitive coloring */}
      <div className="absolute inset-0 rounded-lg border-2 dark:border-openfund-green border-openfund-blue animate-glow" 
        style={{ '--glow-color': 'var(--card-border-glow)' } as React.CSSProperties}>
      </div>
      
      {/* Card content */}
      <div className="bg-card dark:border-openfund-green/50 border-openfund-blue/50 border rounded-lg overflow-hidden p-6">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <p className="role mb-1">{role}</p>
          <p className="text-muted-foreground text-sm text-center">{background}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
