# Circlesfundme Dashboard

A modern loan management and KYC review system built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🏦 **Loan Management** - Complete loan application processing and approval workflow
- 👤 **KYC Reviews** - User verification and document management
- 💬 **Communications** - Bulk messaging system with templates
- 📊 **Dashboard** - Real-time metrics and analytics
- 🎨 **Modern UI** - Clean, responsive design with custom color scheme
- 🔒 **TypeScript** - Full type safety throughout the application

## Color Scheme

- **Primary**: #1E3A8A (Blue)
- **Secondary**: #10B981 (Green)
- **Accent**: #FACC15 (Yellow)

## Getting Started

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

\`\`\`
├── app/                    # Next.js 14 App Router
│   ├── communications/     # Communication management
│   ├── kyc-reviews/       # KYC review system
│   ├── loan-management/   # Loan processing
│   ├── login/             # Authentication
│   └── subscriptions/     # Subscription settings
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   └── dashboard/        # Dashboard-specific components
└── lib/                  # Utility functions
\`\`\`

## Pages

- **Dashboard** (`/`) - Main overview with key metrics
- **Login** (`/login`) - User authentication
- **KYC Reviews** (`/kyc-reviews`) - User verification management
- **Loan Management** (`/loan-management`) - Loan application processing
- **Communications** (`/communications`) - Bulk messaging system
- **Subscriptions** (`/subscriptions`) - Parameter configuration

## Components

All UI components are built with:
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **Lucide React** for icons
- **Custom design system** with consistent theming

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Class Variance Authority** - Component variants
- **Tailwind Merge** - Conditional class merging

## License

This project is private and proprietary.
