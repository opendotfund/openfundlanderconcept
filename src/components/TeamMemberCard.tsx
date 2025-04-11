
import React from 'react';
import { cn } from '@/lib/utils';

type TeamMemberCardProps = {
  name: string;
  role: string;
  background: string;
  imageSrc: string;
  className?: string;
};

const TeamMemberCard = ({ name, role, background, imageSrc, className }: TeamMemberCardProps) => {
  return (
    <div className={cn("relative rounded-lg overflow-hidden", className)}>
      {/* Green border effect */}
      <div className="absolute inset-0 rounded-lg border-2 border-openfund-green animate-glow" style={{ '--glow-color': 'rgba(0, 255, 0, 0.5)' } as React.CSSProperties}></div>
      
      {/* Card content */}
      <div className="bg-card border border-openfund-green/50 rounded-lg overflow-hidden p-4">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-openfund-green">
            <img 
              src={imageSrc} 
              alt={name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/150?text=" + name.charAt(0);
              }}
            />
          </div>
          
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-openfund-green text-sm mb-1">{role}</p>
          <p className="text-muted-foreground text-sm">{background}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
