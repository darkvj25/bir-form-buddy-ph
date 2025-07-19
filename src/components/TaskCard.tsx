import { BIRTask, TaskStatus } from '@/types';
import { StatusBadge } from './StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Edit, Trash2, Clock } from 'lucide-react';
import { format, isAfter, differenceInDays } from 'date-fns';

interface TaskCardProps {
  task: BIRTask;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onEdit: (task: BIRTask) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onStatusChange, onEdit, onDelete }: TaskCardProps) => {
  const deadline = new Date(task.deadline);
  const isOverdue = isAfter(new Date(), deadline);
  const daysUntilDeadline = differenceInDays(deadline, new Date());
  
  const getUrgencyColor = () => {
    if (isOverdue) return 'text-destructive';
    if (daysUntilDeadline <= 7) return 'text-warning';
    if (daysUntilDeadline <= 30) return 'text-accent';
    return 'text-muted-foreground';
  };

  return (
    <Card className="w-full shadow-card hover:shadow-elevated transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground">
              {task.formNumber} - {task.formName}
            </CardTitle>
            {task.description && (
              <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
            )}
          </div>
          <StatusBadge status={task.status} />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Deadline Info */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className={`text-sm font-medium ${getUrgencyColor()}`}>
              Due: {format(deadline, 'MMM dd, yyyy')}
            </span>
            {!isOverdue && daysUntilDeadline >= 0 && (
              <span className="text-xs text-muted-foreground">
                ({daysUntilDeadline === 0 ? 'Due today' : `${daysUntilDeadline} days left`})
              </span>
            )}
            {isOverdue && (
              <span className="text-xs text-destructive font-medium">
                (Overdue)
              </span>
            )}
          </div>

          {/* Frequency */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground capitalize">
              {task.frequency} filing
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <Select value={task.status} onValueChange={(value: TaskStatus) => onStatusChange(task.id, value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(task)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(task.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};