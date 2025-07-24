import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import {
  ChevronUp,
  ChevronDown,
  Filter,
  Search,
  Download,
  RefreshCw,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Mail,
  Clock,
  User,
  Calendar,
  Tag,
  CheckSquare
} from 'lucide-react';
import { Task, TaskTableProps } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { PriorityBadge } from '../common/PriorityBadge';
import { format } from 'date-fns';
import clsx from 'clsx';

const columnHelper = createColumnHelper<Task>();

export const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  loading = false,
  onTaskSelect,
  onTaskUpdate,
  onBulkAction,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  const [pageSize, setPageSize] = useState(25);

  const columns = useMemo(() => [
    // Selection column
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 text-primary-600 rounded"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 text-primary-600 rounded"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      size: 50,
    }),

    // Task title and description
    columnHelper.accessor('title', {
      header: 'Task',
      cell: ({ row, getValue }) => (
        <div className="min-w-0 flex-1">
          <button
            onClick={() => onTaskSelect?.(row.original)}
            className="text-left hover:text-primary-600 transition-colors"
          >
            <p className="text-sm font-medium text-enterprise-gray-900 truncate">
              {getValue()}
            </p>
            <p className="text-sm text-enterprise-gray-500 truncate">
              {row.original.description}
            </p>
          </button>
          <div className="flex items-center space-x-2 mt-1">
            {row.original.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-enterprise-gray-100 text-enterprise-gray-800"
              >
                {tag}
              </span>
            ))}
            {row.original.tags.length > 2 && (
              <span className="text-xs text-enterprise-gray-400">
                +{row.original.tags.length - 2} more
              </span>
            )}
          </div>
        </div>
      ),
      size: 300,
    }),

    // Assignee
    columnHelper.accessor('assignee', {
      header: 'Assignee',
      cell: ({ getValue, row }) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-enterprise-gray-200 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-enterprise-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-enterprise-gray-900">
              {getValue()}
            </p>
            <p className="text-xs text-enterprise-gray-500">
              {row.original.assigneeEmail}
            </p>
          </div>
        </div>
      ),
      size: 200,
    }),

    // Status
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ getValue }) => <StatusBadge status={getValue()} />,
      size: 120,
    }),

    // Priority
    columnHelper.accessor('priority', {
      header: 'Priority',
      cell: ({ getValue }) => <PriorityBadge priority={getValue()} />,
      size: 100,
    }),

    // Category
    columnHelper.accessor('category', {
      header: 'Category',
      cell: ({ getValue }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
          {getValue()}
        </span>
      ),
      size: 120,
    }),

    // Due Date
    columnHelper.accessor('dueDate', {
      header: 'Due Date',
      cell: ({ getValue }) => {
        const date = new Date(getValue());
        const isOverdue = date < new Date() && date.toDateString() !== new Date().toDateString();
        const isToday = date.toDateString() === new Date().toDateString();
        
        return (
          <div className="text-sm">
            <p className={clsx(
              'font-medium',
              isOverdue && 'text-red-600',
              isToday && 'text-yellow-600',
              !isOverdue && !isToday && 'text-enterprise-gray-900'
            )}>
              {format(date, 'MMM dd, yyyy')}
            </p>
            <p className="text-xs text-enterprise-gray-500">
              {format(date, 'h:mm a')}
            </p>
          </div>
        );
      },
      size: 140,
    }),

    // Progress
    columnHelper.display({
      id: 'progress',
      header: 'Progress',
      cell: ({ row }) => {
        const task = row.original;
        const progress = task.actualHours && task.estimatedHours 
          ? Math.min((task.actualHours / task.estimatedHours) * 100, 100)
          : 0;
        
        return (
          <div className="w-full">
            <div className="flex justify-between text-xs text-enterprise-gray-600 mb-1">
              <span>{task.actualHours || 0}h</span>
              <span>{task.estimatedHours || 0}h</span>
            </div>
            <div className="w-full bg-enterprise-gray-200 rounded-full h-2">
              <div
                className={clsx(
                  'h-2 rounded-full transition-all',
                  progress >= 100 ? 'bg-green-500' :
                  progress >= 75 ? 'bg-blue-500' :
                  progress >= 50 ? 'bg-yellow-500' :
                  'bg-enterprise-gray-400'
                )}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        );
      },
      size: 120,
    }),

    // Actions
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onTaskSelect?.(row.original)}
            className="p-1 text-enterprise-gray-400 hover:text-enterprise-gray-600 transition-colors"
            title="View details"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            className="p-1 text-enterprise-gray-400 hover:text-enterprise-gray-600 transition-colors"
            title="Edit task"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            className="p-1 text-enterprise-gray-400 hover:text-enterprise-gray-600 transition-colors"
            title="View email thread"
          >
            <Mail className="h-4 w-4" />
          </button>
          <button
            className="p-1 text-enterprise-gray-400 hover:text-red-600 transition-colors"
            title="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
      size: 120,
    }),
  ], [onTaskSelect]);

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
  });

  const selectedRowCount = Object.keys(rowSelection).length;

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-enterprise-gray-900">
            Task Management
          </h2>
          <p className="text-sm text-enterprise-gray-500 mt-1">
            {tasks.length} total tasks • {selectedRowCount} selected
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="btn-outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button className="btn-outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-enterprise-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="form-input pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="btn-outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          
          {selectedRowCount > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-enterprise-gray-600">
                {selectedRowCount} selected
              </span>
              <button className="btn-outline text-sm">
                <CheckSquare className="h-4 w-4 mr-1" />
                Mark Complete
              </button>
              <button className="btn-outline text-sm">
                <User className="h-4 w-4 mr-1" />
                Reassign
              </button>
              <button className="btn-outline text-sm text-red-600">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-enterprise">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={clsx(
                        'relative',
                        header.column.getCanSort() && 'cursor-pointer hover:bg-enterprise-gray-100'
                      )}
                      style={{ width: header.getSize() }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center space-x-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <div className="flex flex-col">
                            <ChevronUp className={clsx(
                              'h-3 w-3',
                              header.column.getIsSorted() === 'asc' 
                                ? 'text-primary-600' 
                                : 'text-enterprise-gray-400'
                            )} />
                            <ChevronDown className={clsx(
                              'h-3 w-3 -mt-1',
                              header.column.getIsSorted() === 'desc' 
                                ? 'text-primary-600' 
                                : 'text-enterprise-gray-400'
                            )} />
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {loading ? (
                // Loading skeleton
                [...Array(pageSize)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {columns.map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 bg-enterprise-gray-200 rounded"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={clsx(
                      'hover:bg-enterprise-gray-50 transition-colors',
                      row.getIsSelected() && 'bg-primary-50'
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} style={{ width: cell.column.getSize() }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-enterprise-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-enterprise-gray-600">Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="form-select text-sm"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            
            <span className="text-sm text-enterprise-gray-600">
              Showing {table.getState().pagination.pageIndex * pageSize + 1} to{' '}
              {Math.min((table.getState().pagination.pageIndex + 1) * pageSize, tasks.length)} of{' '}
              {tasks.length} results
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="btn-outline text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-enterprise-gray-600">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="btn-outline text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};