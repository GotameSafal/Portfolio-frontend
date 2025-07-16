import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Dashboard from '../Dashboard';
import { useAuth } from '@/contexts/AuthContext';
import * as api from '@/lib/api';

// Mock the auth context
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn()
}));

// Mock the API functions
vi.mock('@/lib/api', async () => {
  const actual = await vi.importActual('@/lib/api');
  return {
    ...actual,
    getProjects: vi.fn(),
    getWorkplaces: vi.fn(),
    useDeleteProject: vi.fn(),
    useDeleteWorkplace: vi.fn()
  };
});

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    img: ({ children, ...props }) => <img {...props}>{children}</img>
  },
  AnimatePresence: ({ children }) => <>{children}</>
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Dashboard Delete Functionality', () => {
  const mockProjects = {
    projects: [
      {
        _id: '1',
        title: 'Test Project 1',
        description: 'Test description',
        technologies: ['React', 'Node.js'],
        imgUrl: { url: 'test-image.jpg' }
      }
    ]
  };

  const mockWorkplaces = {
    workplaces: [
      {
        _id: '1',
        company: 'Test Company',
        position: 'Developer',
        duration: '2023-2024',
        logoUrl: { url: 'test-logo.jpg' }
      }
    ]
  };

  beforeEach(() => {
    useAuth.mockReturnValue({
      logout: vi.fn()
    });

    // Mock successful queries
    vi.mocked(api.getProjects).mockResolvedValue(mockProjects);
    vi.mocked(api.getWorkplaces).mockResolvedValue(mockWorkplaces);

    // Mock delete mutations
    vi.mocked(api.useDeleteProject).mockReturnValue({
      mutate: vi.fn(),
      isPending: false
    });

    vi.mocked(api.useDeleteWorkplace).mockReturnValue({
      mutate: vi.fn(),
      isPending: false
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should show delete confirmation dialog when delete project button is clicked', async () => {
    render(<Dashboard />, { wrapper: createWrapper() });

    // Wait for projects to load
    await waitFor(() => {
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
    });

    // Find and click delete button
    const deleteButtons = screen.getAllByRole('button');
    const projectDeleteButton = deleteButtons.find(btn => 
      btn.querySelector('svg') && btn.className.includes('text-red-500')
    );

    fireEvent.click(projectDeleteButton);

    // Check if confirmation dialog appears
    await waitFor(() => {
      expect(screen.getByText('Delete Project')).toBeInTheDocument();
      expect(screen.getByText(/Are you sure you want to delete "Test Project 1"/)).toBeInTheDocument();
    });
  });

  test('should show delete confirmation dialog when delete workplace button is clicked', async () => {
    render(<Dashboard />, { wrapper: createWrapper() });

    // Wait for workplaces to load
    await waitFor(() => {
      expect(screen.getByText('Test Company')).toBeInTheDocument();
    });

    // Find and click delete button for workplace
    const deleteButtons = screen.getAllByRole('button');
    const workplaceDeleteButton = deleteButtons.find(btn => 
      btn.querySelector('svg') && btn.className.includes('text-red-500')
    );

    fireEvent.click(workplaceDeleteButton);

    // Check if confirmation dialog appears
    await waitFor(() => {
      expect(screen.getByText('Delete Workplace')).toBeInTheDocument();
      expect(screen.getByText(/Are you sure you want to delete "Test Company"/)).toBeInTheDocument();
    });
  });

  test('should call delete mutation when confirmed', async () => {
    const mockDeleteProject = vi.fn();
    vi.mocked(api.useDeleteProject).mockReturnValue({
      mutate: mockDeleteProject,
      isPending: false
    });

    render(<Dashboard />, { wrapper: createWrapper() });

    // Wait for projects to load and click delete
    await waitFor(() => {
      expect(screen.getByText('Test Project 1')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button');
    const projectDeleteButton = deleteButtons.find(btn => 
      btn.querySelector('svg') && btn.className.includes('text-red-500')
    );

    fireEvent.click(projectDeleteButton);

    // Confirm deletion
    await waitFor(() => {
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Delete'));

    // Check if delete mutation was called
    expect(mockDeleteProject).toHaveBeenCalledWith('1');
  });
});
