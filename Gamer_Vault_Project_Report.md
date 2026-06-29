<style>
  body, p, li, td, th {
    font-size: 12px !important;
  }
</style>

[Institute Name]
## [Address / Location]
(Affiliated to [University Name])
Department of Computer Applications

## GAMER VAULT

## [Register Number]
## [Subject Name / Lab Name]
## Micro Project Report

## Submitted By

## [Student Name 1]
## [Student Name 2]
## [Student Name 3]

Under the guidance of

## [Guide Name 1]
## [Designation]
## &
## [Guide Name 2]
## [Designation]

MCA [Batch Year]                                                          [Subject Code] MICRO PROJECT

Department of Computer Applications

## [Month] – [Year]
<div style="page-break-after: always;"></div>

## Acknowledgement

We would like to express our sincere gratitude to all those who supported and guided us throughout the development of the **Gamer Vault** micro project. This project would not have been possible without their invaluable contributions and assistance.

We are deeply thankful to our mentors, **[Guide Name 1]** and **[Guide Name 2]**, for their expertise, continuous guidance, and encouragement. We are also grateful to our peers and friends who provided valuable insights, engaged in meaningful discussions regarding modern web application architecture, and offered their assistance whenever needed. Their diverse perspectives enriched the project's overall outcome.

We would like to acknowledge the open-source community for developing and maintaining the libraries, frameworks, and tools that we utilized in this project, particularly the developers behind React, Node.js, Express, MongoDB, and Vite. Their contributions have greatly facilitated the development and implementation process of this full-stack application.

## Place: [Place]
## Date: [Date]

<div style="page-break-after: always;"></div>

## Table of Contents

| SI No | Title | Page No |
|---|---|---|
| 1 | Abstract | 4 |
| 2 | Introduction | 5 |
| 3 | Key Features | 6 |
| 4 | Benefits | 7 |
| 5 | Existing System Study | 8 |
| 6 | Modules | 9 |
| 7 | Hardware & Software Requirements | 11 |
| 8 | Data Flow Diagrams | 13 |
| 9 | Table Designs | 15 |
| 10 | Screenshots | 17 |
| 11 | Conclusion | 20 |

<div style="page-break-after: always;"></div>

## 1. Abstract

This project, **Gamer Vault**, is a modern, full-stack web application designed to serve as a secure and interactive marketplace for trading game accounts. Developed using the MERN stack (MongoDB, Express.js, React, Node.js), it provides a robust platform bridging the gap between game account sellers and prospective buyers. The application features a dynamic, glassmorphic user interface built with React and styled with custom CSS, delivering a highly premium and immersive user experience tailored to the gaming community.

Gamer Vault is strictly divided into two distinct user roles: Buyers and Sellers. It incorporates a comprehensive storefront, dynamic search and filtering mechanisms, a real-time shopping cart, and a secure checkout process. Data persistence is managed seamlessly through MongoDB, ensuring that user profiles, product listings, and order histories are safely stored and instantly retrievable. The backend RESTful API, built with Node.js and Express, handles all critical business logic, database transactions, and client-server communication efficiently. This project effectively demonstrates the integration of advanced web technologies to create a scalable, secure, and user-centric e-commerce platform.

<div style="page-break-after: always;"></div>

## 2. Introduction

In the rapidly evolving landscape of digital entertainment, video games have grown from simple pastimes into massive, persistent digital ecosystems. Players invest hundreds of hours into building their accounts, acquiring rare in-game items, and climbing competitive ranks. Consequently, a vast secondary market has emerged where players wish to securely buy and sell these valuable game accounts. However, this market has traditionally been plagued by unorganized forums, fraudulent transactions, and a distinct lack of dedicated, secure platforms.

Gamer Vault was conceptualized and developed to directly address these challenges. It acts as a dedicated, centralized marketplace designed specifically for the secure trading of digital game accounts across various platforms (such as Steam, Riot Games, Epic Games, etc.). The primary goal of this project is to provide a highly secure, intuitive, and visually stunning web platform that standardizes the account trading process. 

By leveraging the MERN stack, Gamer Vault ensures high performance, seamless scalability, and a highly responsive single-page application (SPA) experience. The frontend utilizes React to create a fluid, non-blocking interface featuring modern design trends like glassmorphism and dynamic state management. The backend relies on the asynchronous capabilities of Node.js and Express to handle concurrent user requests, while MongoDB provides a flexible, document-based NoSQL database capable of adapting to complex product metadata.

This project aims to highlight the importance of combining premium graphical user interface design with robust, secure backend architecture in building practical, real-world e-commerce applications. It demonstrates how modular code structures, RESTful APIs, and responsive design can be implemented to solve specific domain problems effectively.

<div style="page-break-after: always;"></div>

## 3. Key Features

*   **Interactive Dual-Role System:**
    The platform seamlessly supports two distinct user workflows. Users can operate as Buyers to browse and purchase accounts, or instantly switch to a Seller dashboard to manage their own listings and track sales.
*   **Premium Glassmorphic UI:**
    The frontend boasts a state-of-the-art "glassmorphism" design aesthetic, utilizing advanced CSS backdrop filters, smooth animations, and a cohesive dark-purple color palette to resonate with the gaming demographic.
*   **Dynamic Product Storefront & Filtering:**
    A highly responsive marketplace grid allows buyers to effortlessly browse game accounts. It includes real-time search functionality and category filtering to help users find specific games or platforms instantly without page reloads.
*   **Real-Time Cart Management:**
    A fully functional shopping cart system that allows buyers to add, remove, and review items before purchase. It calculates totals dynamically and manages the state securely.
*   **Automated Credential Delivery:**
    Upon a successful transaction, the system is designed to automatically dispatch the purchased game account credentials directly to the buyer's registered email address, ensuring instant and secure digital delivery.
*   **Persistent Data Storage:**
    All critical data, including user profiles, encrypted passwords, game account details, image paths, and order histories, are persistently stored in a MongoDB database, ensuring data integrity and long-term availability.
*   **RESTful API Architecture:**
    The backend exposes a clean, modular RESTful API that handles CRUD (Create, Read, Update, Delete) operations, ensuring clean separation between the frontend presentation layer and the backend data layer.

<div style="page-break-after: always;"></div>

## 4. Benefits

*   **Enhanced Security and Trust:**
    By providing a centralized platform, Gamer Vault significantly reduces the risk of fraud commonly associated with trading accounts on social media or unmoderated forums.
*   **Superior User Experience:**
    The modern React-based Single Page Application (SPA) ensures lightning-fast page transitions and a highly interactive, engaging environment that keeps users retained.
*   **Efficient Data Management:**
    Integration with MongoDB allows for the flexible storage of complex, varying data structures (like different game account attributes), ensuring the system can adapt to new games and platforms effortlessly.
*   **Modular and Maintainable Code:**
    The separation of the project into a distinct React frontend and an Express backend promotes separation of concerns. This makes the codebase significantly easier to maintain, debug, and scale over time.
*   **Cross-Platform Compatibility:**
    Being a web-based application built with responsive CSS techniques, Gamer Vault functions flawlessly across various devices, including desktop computers, tablets, and modern mobile browsers.
*   **Educational Value:**
    This project serves as an excellent, comprehensive example of full-stack web development. It covers everything from UI/UX design and frontend state management to backend routing, API design, and NoSQL database management.
*   **Scalability:**
    The use of Node.js and MongoDB allows the application to handle a growing number of concurrent users and an expanding database of game accounts without significant performance degradation.

<div style="page-break-after: always;"></div>

## 5. Existing System Study

The digital account trading market currently operates largely in a fragmented and disorganized manner. Players looking to buy or sell game accounts typically resort to using generic social media platforms (like Facebook groups or Twitter), messaging apps (like Discord or Telegram), or specialized but outdated web forums. 

These existing methods have several critical drawbacks:

1.  **Lack of Security and Trust:** Unmoderated forums and social media groups offer no protection against scams. Buyers often send money without receiving account details, and sellers often provide account details without receiving payment.
2.  **Poor User Interface and Organization:** Finding a specific game account on a forum requires manually scrolling through disorganized, text-heavy posts. There is rarely an efficient way to filter by game, platform, price, or account rank.
3.  **No Centralized Tracking:** Users have no centralized dashboard to track their purchases, monitor their active sales, or view their transaction history. Data is scattered across various direct messages and forum threads.
4.  **Manual Delivery:** The delivery of account credentials (usernames and passwords) must be handled manually between the buyer and seller, which is slow and inherently insecure.

**How Gamer Vault Solves This:**
Gamer Vault transitions this process into a modernized e-commerce environment. It replaces chaotic forum threads with a highly organized, visually appealing product grid with instant search capabilities. It replaces manual, risky transactions with a structured cart and checkout system. Furthermore, it introduces dedicated dashboards for sellers to manage their inventory professionally and for buyers to track their order history securely. This structured approach fills the massive gaps in existing solutions by combining ease of use, robust security, and persistent data storage in a dedicated web application.

<div style="page-break-after: always;"></div>

## 6. Modules

The Gamer Vault application is architected into specific functional modules to ensure separation of concerns and maintainability. Based on the core user workflows, the system is divided into the following primary modules:

### ❖ Buyer Module:
This module encompasses all features and interfaces accessible to a user looking to purchase game accounts on the platform.
*   **Marketplace Storefront:** Displays a dynamic grid of available game accounts fetched from the database, complete with cover images, game titles, descriptions, and prices.
*   **Search & Filtering:** Provides real-time search functionality allowing buyers to find specific accounts based on game names or categories instantly.
*   **Detailed Product View:** A dedicated page for each game account showing an expanded media gallery, specific account attributes, and seller information.
*   **Shopping Cart Management:** Allows buyers to add desired accounts to a virtual cart, view a summary of their pending orders, calculate total costs, and remove items dynamically.
*   **Order History:** A secure dashboard where buyers can review all their past successful purchases and access details regarding those transactions.

### ❖ Seller Module:
This module is dedicated to users who wish to list and manage their own game accounts for sale on the platform.
*   **Seller Dashboard:** A centralized control panel providing an overview of the seller's active listings and recent account activity.
*   **Account Listing Management:** A secure interface allowing sellers to add new game accounts to the marketplace. This includes uploading cover photos, setting prices, defining game platforms, and providing detailed descriptions.
*   **Inventory Tracking (My Products):** A specific view where sellers can see all the accounts they currently have listed, allowing them to monitor their stock.
*   **Order Management:** An interface that alerts sellers to newly placed orders for their accounts, allowing them to track which items have been successfully sold to buyers.
*   **Dynamic Role Switching:** A seamless mechanism allowing a user to switch their active interface context from "Buyer" to "Seller" without requiring a separate login.

<div style="page-break-after: always;"></div>

## 7. Hardware & Software Requirements

### Hardware Requirements:

**Client Machine (User):**
*   A personal computer, laptop, or modern mobile device capable of running a modern web browser smoothly.
*   Minimum hardware specifications include:
    *   **Processor:** Dual-core processor or higher.
    *   **RAM:** 4 GB or more recommended for smooth execution of the React SPA.
    *   **Network:** A stable broadband internet connection to interact with the backend API and load media assets.
    *   **Display:** Monitor or screen with a minimum resolution of 1024x768 for optimal viewing of the responsive UI.

**Server Environment (Hosting):**
*   If hosting the Node.js backend and MongoDB database:
    *   **Processor:** Multi-core virtual CPU (vCPU).
    *   **RAM:** Minimum 2 GB (4 GB recommended) to handle Node.js runtime and concurrent API requests.
    *   **Storage:** Sufficient SSD storage to hold the database, backend code, and uploaded media files (cover photos).

### Software Requirements:

**Client-Side (Frontend):**
*   **Operating System:** Any OS supporting a modern web browser (Windows, macOS, Linux, Android, iOS).
*   **Web Browser:** A modern, standards-compliant web browser such as Google Chrome, Mozilla Firefox, Safari, or Microsoft Edge (with JavaScript enabled).

**Server-Side (Backend & Development):**
*   **Node.js Environment:** Node.js (v18 or above) installed to run the backend server and frontend build tools.
*   **Package Manager:** NPM (Node Package Manager) or Yarn for managing project dependencies.
*   **Frontend Framework:** React (bootstrapped with Vite for faster development and optimized builds).
*   **Backend Framework:** Express.js for routing and API creation.
*   **Database Management System:** MongoDB (Local installation or cloud-based MongoDB Atlas) for NoSQL data storage. Mongoose ODM used for object data modeling.
*   **IDE (Integrated Development Environment):** Visual Studio Code (VS Code) recommended for development and debugging.

<div style="page-break-after: always;"></div>

## 8. Data Flow Diagrams

A Data Flow Diagram (DFD) is a visual representation that depicts the flow of data within a system or process. It is a graphical tool used to model the interactions and transformations of data as it moves through various components of a system.

### Zeroth Level Data Flow Diagram (Context Diagram)

Provides an overview of the entire system at a high level, showing the interactions between external entities (Buyers and Sellers) and the central Gamer Vault System. It presents a top-level perspective without going into the details of internal processes.

<br><br><br><br><br><br><br><br><br><br><br><br><br>
**[ Insert Image Here: Zeroth Level DFD (Context Diagram) ]**
<br><br><br><br>

<div style="page-break-after: always;"></div>

### First Level Data Flow Diagram

A First-Level Data Flow Diagram provides a high-level overview of how data moves between major functional processes and data stores within the system without delving into intricate programmatic details.

<br><br><br><br><br><br><br><br><br><br><br><br><br>
**[ Insert Image Here: First Level DFD ]**
<br><br><br><br>

<div style="page-break-after: always;"></div>

## 9. Table Designs (Database Schemas)

Gamer Vault utilizes MongoDB, a NoSQL database, which stores data in flexible, JSON-like documents rather than rigid relational tables. Below are the structural designs (Schemas) used within the system to map the application data.

### 1. Users Collection
Stores essential information for all registered users on the platform, enabling authentication and profile management.

| Field Name | Data Type | Description | Constraints |
|---|---|---|---|
| `_id` | ObjectId | Unique identifier for the user | Primary Key, Auto |
| `username` | String | Chosen display name | Required, Unique |
| `email` | String | User's email address | Required, Unique |
| `password` | String | Hashed password string | Required |
| `role` | String | Determines user privileges | Default: 'user' |
| `createdAt` | Date | Timestamp of registration | Auto-generated |

### 2. GameAccounts Collection
The core catalog containing all game accounts listed for sale by Sellers.

| Field Name | Data Type | Description | Constraints |
|---|---|---|---|
| `_id` | ObjectId | Unique identifier for the listing | Primary Key, Auto |
| `sellerId` | ObjectId | Reference to the User who listed it | Foreign Key (Users) |
| `gameName` | String | Title of the game | Required |
| `description` | String | Details about the account rank/items| Required |
| `price` | Number | Listed price of the account | Required |
| `platform` | String | E.g., Steam, Epic, Riot | Required |
| `coverPhoto` | String | File path/URL to the uploaded image | Required |
| `isSold` | Boolean | Availability status | Default: false |

<div style="page-break-after: always;"></div>

### 3. Carts Collection
Manages the temporary state of items a Buyer intends to purchase.

| Field Name | Data Type | Description | Constraints |
|---|---|---|---|
| `_id` | ObjectId | Unique identifier for the cart | Primary Key, Auto |
| `userId` | ObjectId | Reference to the Buyer | Foreign Key (Users) |
| `items` | Array | List of GameAccount Objects | References GameAccounts |
| `totalPrice` | Number | Calculated total of all items | Dynamic |
| `updatedAt` | Date | Last modification timestamp | Auto-updated |

### 4. Bookings / Orders Collection
Records successfully completed transactions and serves as the official invoice/history.

| Field Name | Data Type | Description | Constraints |
|---|---|---|---|
| `_id` | ObjectId | Unique order identifier | Primary Key, Auto |
| `buyerId` | ObjectId | Reference to the purchasing User | Foreign Key (Users) |
| `itemsPurchased`| Array | Snapshots of accounts bought | References GameAccounts |
| `amountPaid` | Number | Final transaction amount | Required |
| `paymentStatus` | String | E.g., 'completed', 'pending' | Required |
| `transactionId` | String | ID from external payment gateway | Unique |
| `purchasedAt` | Date | Exact time of the transaction | Auto-generated |

<div style="page-break-after: always;"></div>

## 10. Screenshots

### 1. Buyer Storefront (Marketplace)
*This interface displays the dynamic grid of game accounts available for purchase, featuring the glassmorphic UI and search functionalities.*

<br><br><br><br><br><br><br><br><br><br><br><br><br>
**[ Insert Screenshot Here: Buyer Storefront / Marketplace Grid ]**
<br><br><br><br>

### 2. Game Account Details Page
*The detailed view of a specific game account, showcasing the cover media, pricing, and "Add to Cart" functionality.*

<br><br><br><br><br><br><br><br><br><br><br><br><br>
**[ Insert Screenshot Here: Detailed Product Page ]**
<br><br><br><br>

<div style="page-break-after: always;"></div>

### 3. Shopping Cart Interface
*The interactive cart where buyers can review their selected items, view the dynamically calculated total, and proceed to checkout.*

<br><br><br><br><br><br><br><br><br><br><br><br><br>
**[ Insert Screenshot Here: Buyer Cart ]**
<br><br><br><br>

### 4. Payment Verification Success
*The premium success screen displayed after a secure transaction, confirming the vault is secured and credentials have been dispatched.*

<br><br><br><br><br><br><br><br><br><br><br><br><br>
**[ Insert Screenshot Here: Payment Success / Verification Screen ]**
<br><br><br><br>

<div style="page-break-after: always;"></div>

### 5. Seller Dashboard & Inventory
*The control panel for sellers showing their active listings, options to add new accounts, and an overview of their marketplace presence.*

<br><br><br><br><br><br><br><br><br><br><br><br><br>
**[ Insert Screenshot Here: Seller Dashboard / My Products ]**
<br><br><br><br>

### 6. Add New Game Account Listing
*The form interface used by sellers to upload cover photos, define specifications, and set the price for a new game account.*

<br><br><br><br><br><br><br><br><br><br><br><br><br>
**[ Insert Screenshot Here: Add Game Account Form ]**
<br><br><br><br>

<div style="page-break-after: always;"></div>

## 11. Conclusion

The Gamer Vault project successfully demonstrates the design, architecture, and implementation of a robust, full-stack e-commerce marketplace utilizing the MERN stack. By combining a highly interactive and visually premium frontend built with React with a scalable, asynchronous backend powered by Node.js and Express, the application provides a seamless and secure platform for trading digital game accounts.

The project effectively resolves the core issues of trust and disorganization prevalent in traditional account trading forums. The implementation of clear separation of concerns—through distinct Buyer and Seller modules—ensures a tailored user experience depending on the user's current goal. Furthermore, the integration of MongoDB guarantees flexible, persistent data storage, while the RESTful API ensures efficient communication across the network.

The utilization of modern UI/UX principles, specifically the cohesive glassmorphic design and dynamic state management, elevates the platform from a simple utility to a professional-grade web application. Overall, Gamer Vault serves as a strong foundation for a secure digital marketplace, showcasing practical skills in full-stack development, database design, API routing, and modern interface styling. It successfully meets its objective of providing a secure, centralized, and highly usable "vault" for gamers worldwide.
