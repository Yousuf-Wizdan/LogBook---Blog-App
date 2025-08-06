# Blog Platform

This is a full-stack blog platform built with Next.js, Prisma, and Clerk for authentication.

## Features

*   **User Authentication:** Secure sign-up and sign-in with Clerk.
*   **Article Management:** Create, edit, and delete articles.
*   **Rich Text Editor:** Use of a rich text editor for creating and editing articles.
*   **Commenting System:** Users can comment on articles.
*   **Like/Dislike System:** Users can like or dislike articles.
*   **Search Functionality:** Search for articles by title or content.
*   **Dashboard:** A user dashboard to manage articles.

## Getting Started

### Prerequisites

*   Node.js (v20 or later)
*   npm
*   A PostgreSQL database

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd blog
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of the project and add the following variables:

    ```
    # Database
    DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"

    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
    CLERK_SECRET_KEY=""
    NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
    NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"

    # Cloudinary
    CLOUDINARY_CLOUD_NAME=""
    CLOUDINARY_API_KEY=""
    CLOUDINARY_API_SECRET=""
    ```

4.  **Run database migrations:**

    ```bash
    npx prisma migrate dev
    ```

5.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts a production server.
*   `npm run lint`: Lints the codebase.

## Technologies Used

*   **Framework:** [Next.js](https://nextjs.org/)
*   **ORM:** [Prisma](https://www.prisma.io/)
*   **Authentication:** [Clerk](https://clerk.com/)
*   **UI:** [Tailwind CSS](https://tailwindcss.com/), [Shadcn/ui](https://ui.shadcn.com/)
*   **Rich Text Editor:** [React Quill](https://github.com/zenoamaro/react-quill)
*   **Database:** [PostgreSQL](https://www.postgresql.org/)
*   **Image Uploads:** [Cloudinary](https://cloudinary.com/)
*   **Validation:** [Zod](https://zod.dev/)