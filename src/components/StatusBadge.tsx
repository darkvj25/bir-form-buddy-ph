import { TaskStatus } from '@/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

const statusConfig = {
  'not-started': {
    label: 'Not Started',
    className: 'bg-status-not-started text-foreground'
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-status-in-progress text-warning-foreground'
  },
  'completed': {
    label: 'Completed',
    className: 'bg-status-completed text-success-foreground'
  }
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
};