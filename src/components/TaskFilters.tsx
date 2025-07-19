import { TaskStatus, TaskFrequency, TaskFilter, SortOption } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface TaskFiltersProps {
  filters: TaskFilter;
  sortBy: SortOption;
  onFilterChange: (filters: TaskFilter) => void;
  onSortChange: (sortBy: SortOption) => void;
  onClearFilters: () => void;
}

export const TaskFilters = ({ 
  filters, 
  sortBy, 
  onFilterChange, 
  onSortChange, 
  onClearFilters 
}: TaskFiltersProps) => {
  const hasActiveFilters = filters.status || filters.frequency;

  return (
    <div className="bg-card p-4 rounded-lg border shadow-card">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        {/* Status Filter */}
        <div className="space-y-2 flex-1 min-w-0">
          <Label htmlFor="status-filter" className="text-sm font-medium">
            Filter by Status
          </Label>
          <Select 
            value={filters.status || 'all'} 
            onValueChange={(value) => 
              onFilterChange({ 
                ...filters, 
                status: value === 'all' ? undefined : value as TaskStatus 
              })
            }
          >
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Frequency Filter */}
        <div className="space-y-2 flex-1 min-w-0">
          <Label htmlFor="frequency-filter" className="text-sm font-medium">
            Filter by Frequency
          </Label>
          <Select 
            value={filters.frequency || 'all'} 
            onValueChange={(value) => 
              onFilterChange({ 
                ...filters, 
                frequency: value === 'all' ? undefined : value as TaskFrequency 
              })
            }
          >
            <SelectTrigger id="frequency-filter">
              <SelectValue placeholder="All frequencies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Frequencies</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annually">Annually</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort */}
        <div className="space-y-2 flex-1 min-w-0">
          <Label htmlFor="sort-select" className="text-sm font-medium">
            Sort By
          </Label>
          <Select value={sortBy} onValueChange={(value: SortOption) => onSortChange(value)}>
            <SelectTrigger id="sort-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deadline">Deadline</SelectItem>
              <SelectItem value="formNumber">Form Number</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="createdAt">Date Created</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClearFilters}
            className="shrink-0"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};