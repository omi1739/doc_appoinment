# Doctor Appointment System

A modern web application for booking and managing doctor appointments.

## Features
- **Dark Mode Support:** Smooth transition between light and dark themes.
- **User Authentication:** Secure login and registration using Better Auth.
- **Appointment Management:** Search, book, and view appointments.
- **Dashboard:** A centralized place to manage your activities.
- **Responsive Design:** Works perfectly on desktop and mobile devices.

## Tech Stack
- **Framework:** Next.js
- **Styling:** Tailwind CSS 4 & HeroUI
- **Authentication:** Better Auth
- **Database:** MongoDB
- **Icons:** Lucide React
- **Theming:** Next Themes

## Getting Started

### Prerequisites
Make sure you have **Node.js** installed on your machine.

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd doc_appointment
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_uri
   BETTER_AUTH_SECRET=your_secret_at_least_32_chars
   BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Go to [http://localhost:3000](http://localhost:3000) in your browser.

## License
This project is open-source and available under the MIT License.
