# Quick Cart

Quick Cart is an e-commerce website built to develop an online shopping environment that is both consumer and seller friendly. The objective is to provide an intuitive and seamless shopping experience, allowing users to browse products, add items to their cart, and securely check out, while giving sellers an efficient platform to manage their inventory.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Developers](#developers)
- [Getting Started](#getting-started)
  - [Step 1: Cloning the Repository](#step-1-cloning-the-repository)
  - [Step 2: Installing Dependencies](#step-2-installing-dependencies)
    - [General Dependencies](#general-dependencies)
    - [Additional Dependencies](#additional-dependencies)
    - [Handling Peer Dependency Issues](#handling-peer-dependency-issues)
  - [Step 3: Running the Application](#step-3-running-the-application)
- [Learn More](#learn-more)

## Project Overview

Quick Cart is designed to create an accessible online shopping platform that caters to both buyers and sellers. It offers a user-friendly interface for browsing products, managing a shopping cart, and performing secure checkouts. The backend integration is managed via Supabase, while the frontend is built with React.

## Features

- **Responsive Design:** Built with React and Bootstrap for a user-friendly experience.
- **Product Catalog:** Detailed product view and a searchable catalog.
- **Shopping Cart:** Real-time cart updates and an intuitive checkout process.
- **User Authentication:** Secure sign-in and registration.
- **Database Integration:** Managed via Supabase for dynamic product and order management.

## Developers

- **Tanu99c** – Front-end development using React.
- **Test_Agent** – Database integration and backend management using Supabase.

## Getting Started

Follow these simple steps to set up the project on your local machine.

### Step 1: Cloning the Repository

Clone the repository using Git by running the following command in your terminal:

```bash
git clone https://github.com/your-username/quick_cart.git
```

Then, navigate into the project directory:

```bash
cd quick_cart
```

### Step 2: Installing Dependencies

This project requires several packages. You can install them using npm. Run the commands below in your project directory:

#### General Dependencies:

```bash
npm install react-router-dom react-bootstrap bootstrap react-toastify react-modal @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons react-spinners @supabase/supabase-js react-google-recaptcha react-tooltip react-search-autocomplete react-responsive --legacy-peer-deps
```

#### Additional Dependencies:

```bash
npm install @emailjs/browser @fortawesome/fontawesome-svg-core --legacy-peer-deps
```

#### Handling Peer Dependency Issues:

If you encounter any peer dependency issues during installation, try installing with the `--legacy-peer-deps` flag:

```bash
npm install --legacy-peer-deps
```

### Step 3: Running the Application

Once all dependencies are installed, start the development server by running:

```bash
npm start
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application. The page will automatically reload when you make changes to the code, and any lint errors will appear in the console.

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). For further details on React and the tools used in this project, refer to the following resources:

- [React Documentation](https://reactjs.org/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
- [Supabase Documentation](https://supabase.com/docs)
