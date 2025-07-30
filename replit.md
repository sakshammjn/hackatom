# Isospire - Aspiring the Isotopes

## Overview

Isospire is a professional business intelligence web application designed for industry managers and executives to explore the economic feasibility of adopting non-energy nuclear technologies across healthcare, agriculture, manufacturing, and space research sectors. The application provides interactive tools for comparing traditional methods with isotope-based solutions, including cost analysis, ROI calculations, and business case generation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React hooks with localStorage for persistence
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom design tokens
- **Data Fetching**: TanStack React Query for server state management
- **Charts**: Chart.js with react-chartjs-2 for data visualization
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Storage**: PostgreSQL with connect-pg-simple
- **API Design**: RESTful endpoints with /api prefix

### Design System
- **Theme**: Corporate design with navy blue, steel gray, and white color palette
- **Typography**: Inter font family for modern, readable interface
- **UI Pattern**: Glass morphism effects with atomic-themed animations
- **Responsive**: Desktop and tablet optimized layouts
- **Navigation**: Fixed sidebar with icon-based navigation

## Key Components

### 1. Industry Selection System
- Four main industry categories: Healthcare, Agriculture, Manufacturing, Space & R&D
- Each industry has specific use cases with associated isotopes
- Industry selection persists across sessions via localStorage

### 2. Use Case Explorer
- Dynamic content based on selected industry
- Each use case includes ROI potential, isotope requirements, and descriptions
- Interactive cards with hover effects and animations

### 3. Economic Simulator
- Real-time cost comparison between traditional and isotope solutions
- Interactive sliders for budget, timeframe, and facility size
- Chart.js integration for visual data representation
- Industry-specific calculation multipliers

### 4. Business Case Generator
- Form-based report creation for executive presentations
- PDF generation capability for boardroom use
- Template-driven content with customizable fields

### 5. Knowledge Center
- Educational content about isotopes and nuclear technologies
- Accordion-style information architecture
- Production methods and application explanations

## Data Flow

### Client-Side Flow
1. User selects industry on home page → stored in localStorage
2. Industry selection loads relevant use cases in explorer
3. Use case selection triggers simulator with pre-filled parameters
4. Simulation results can be used to generate business cases
5. All user interactions are tracked for session persistence

### Server-Side Flow
1. Express server handles API requests with /api prefix
2. Drizzle ORM manages database operations
3. PostgreSQL stores simulation results and business cases
4. Session management for user state persistence

### Data Models
- **Users**: Basic user authentication and identification
- **Simulation Results**: ROI calculations, costs, and emissions data
- **Business Cases**: Generated reports with company details and projections

## External Dependencies

### Frontend Dependencies
- **@radix-ui/***: Comprehensive UI component library
- **@tanstack/react-query**: Server state management
- **chart.js**: Data visualization
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight React router
- **date-fns**: Date manipulation utilities

### Backend Dependencies
- **express**: Web application framework
- **drizzle-orm**: Type-safe database ORM
- **@neondatabase/serverless**: Neon database client
- **connect-pg-simple**: PostgreSQL session store

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution environment

## Deployment Strategy

### Development Environment
- Vite dev server with HMR for frontend development
- Express server with middleware for API handling
- Replit-specific plugins for cloud development environment

### Production Build
1. Frontend built with Vite to `dist/public`
2. Backend compiled with esbuild to `dist/index.js`
3. Single server deployment serving both static files and API

### Database Setup
- PostgreSQL database provisioned through environment variables
- Drizzle migrations stored in `./migrations`
- Schema definitions shared between client and server

### Environment Configuration
- `DATABASE_URL` required for PostgreSQL connection
- Development vs production modes handled through `NODE_ENV`
- Replit-specific features enabled conditionally

### Build Scripts
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server startup
- `npm run db:push`: Database schema deployment