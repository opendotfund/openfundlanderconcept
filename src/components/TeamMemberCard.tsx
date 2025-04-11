
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
    <div className={cn("relative rounded-lg overflow-hidden", className)}>
      {/* Green border effect */}
      <div className="absolute inset-0 rounded-lg border-2 border-openfund-green animate-glow" style={{ '--glow-color': 'rgba(0, 255, 0, 0.5)' } as React.CSSProperties}></div>
      
      {/* Card content */}
      <div className="bg-card border border-openfund-green/50 rounded-lg overflow-hidden p-6">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <p className="text-openfund-green text-sm mb-1">{role}</p>
          <p className="text-muted-foreground text-sm text-center">{background}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
