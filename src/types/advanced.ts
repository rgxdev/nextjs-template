export interface ColumnConfig<T = any> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  cell?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
}

export interface TableState {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  sorting: Array<{
    id: string;
    desc: boolean;
  }>;
  columnFilters: Array<{
    id: string;
    value: any;
  }>;
  globalFilter: string;
  rowSelection: Record<string, boolean>;
  columnVisibility: Record<string, boolean>;
  columnOrder: string[];
}

export interface FormFieldConfig {
  name: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'textarea' | 'select' | 'multiselect' | 'checkbox' | 'radio' | 'date' | 'time' | 'datetime-local' | 'file' | 'range';
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ label: string; value: string | number; disabled?: boolean }>;
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    step?: number;
    accept?: string; // for file inputs
  };
  conditional?: {
    dependsOn: string;
    condition: (value: any) => boolean;
  };
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FormFieldConfig[];
  validation?: (data: Record<string, any>) => boolean;
}

export interface AdvancedFormConfig {
  title: string;
  description?: string;
  steps?: FormStep[];
  fields?: FormFieldConfig[];
  submitText?: string;
  resetText?: string;
  multiStep?: boolean;
  showProgress?: boolean;
  autoSave?: boolean;
  onSubmit: (data: Record<string, any>) => Promise<void> | void;
  onReset?: () => void;
  onStepChange?: (step: number) => void;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: 'select' | 'multiselect' | 'range' | 'date' | 'search';
  options?: FilterOption[];
  min?: number;
  max?: number;
  placeholder?: string;
}

export interface TableAction<T = any> {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: (row: T) => void;
  disabled?: (row: T) => boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  confirmText?: string;
}

export interface BulkAction<T = any> {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: (selectedRows: T[]) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  confirmText?: string;
}

export interface AdvancedTableConfig<T = any> {
  columns: ColumnConfig<T>[];
  data: T[];
  loading?: boolean;
  error?: string | null;
  totalCount?: number;
  pageCount?: number;
  manualPagination?: boolean;
  manualSorting?: boolean;
  manualFiltering?: boolean;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableGlobalFilter?: boolean;
  enableRowSelection?: boolean;
  enableColumnResizing?: boolean;
  enableColumnReordering?: boolean;
  enableVirtualization?: boolean;
  rowActions?: TableAction<T>[];
  bulkActions?: BulkAction<T>[];
  filters?: FilterConfig[];
  initialState?: Partial<TableState>;
  onStateChange?: (state: TableState) => void;
  onRowClick?: (row: T) => void;
  onRefresh?: () => void;
  emptyMessage?: string;
  searchPlaceholder?: string;
}

export interface FileUploadConfig {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  onUpload: (files: File[]) => Promise<string[]> | string[];
  onError?: (error: string) => void;
  preview?: boolean;
  dragDrop?: boolean;
}

export interface NotificationConfig {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export type FormStepState = 'not-started' | 'current' | 'completed' | 'error';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings?: Record<string, string>;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
  meta?: {
    total?: number;
    page?: number;
    pageSize?: number;
    totalPages?: number;
  };
}

export interface PaginationInfo {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface SearchConfig {
  query: string;
  fields?: string[];
  debounceMs?: number;
}