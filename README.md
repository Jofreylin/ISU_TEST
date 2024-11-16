 # To-Do List Application (Angular & .NET)

 ### Overview
 This To-Do List application is a CRUD project created with Angular 16 for the frontend and .NET 7 for the backend. The project uses Angular Material for a clean and responsive UI. Users can create, read, update, and delete tasks, with data stored in an MS SQL Server 2022 database.

 ---

 ## Prerequisites

 ### Required Software
 - **.NET SDK 7** - For the backend
 - **Node.js 16.20.2** - Recommended version for Angular 16
 - **Angular CLI 16.2.16** - To manage the Angular application
 - **MS SQL Server 2022** - Database to store tasks

 ### Technologies and Tools
 - **Entity Framework Core** - For data management, pagination, and filtering.
 - **xUnit** - For backend integration testing.
 - **Jasmine & Karma** - For frontend unit testing with Angular.
 - **Repository Pattern** - Implemented for backend service structure.

 ---

 ## Cloning the Project

 Clone the repository to your local machine using the following command:

 ```bash
 git clone https://github.com/Jofreylin/ISU_TEST.git
 ```

 Navigate into the project directory:
 ```bash
 cd ISU_TEST
 ```

 ---

 ## Setup Instructions

 ### Step 1: Database Setup
 1. **Create Database**: Run the SQL script (`database.sql`) located in the project root to set up the MS SQL Server 2022 database.
 2. **Configure Connection**: Database connection settings are already configured in `appsettings.json` in the backend project (`BackEnd`). No additional configuration is required.

 ### Step 2: Backend Setup
 1. **Navigate to the Backend Folder**:
    ```bash
    cd BackEnd
    ```
 2. **Restore Dependencies**:
    ```bash
    dotnet restore
    ```
 3. **Run the Backend**:
    Start the backend server with the following command:
    ```bash
    dotnet run --project BackEnd --launch-profile https
    ```
 4. **Backend URL**: The backend will be available at `https://localhost:7210`.

 ### Step 3: Frontend Setup
 1. **Navigate to the Frontend Folder**:
    ```bash
    cd Frontend
    ```
 2. **Install Dependencies**:
    ```bash
    npm install
    ```
 3. **Run the Frontend**:
    Start the frontend application with:
    ```bash
    ng serve
    ```
 4. **Frontend URL**: By default, the frontend runs at `http://localhost:4200`.

 ---

 ## Running Tests

 ### Backend Integration Tests
 The backend integration tests are located in the `BackEnd.Tests` folder and use **xUnit**. To run these tests:
 ```bash
 dotnet test BackEnd.Tests
 ```

 ### Frontend Unit Tests
 The frontend unit tests use **Jasmine and Karma**. To run these tests:
 ```bash
 ng test
 ```

 ---

 ## Additional Details

 - **Data Management**: The application uses Entity Framework Core to manage database operations, including pagination and filtering.
 - **Soft Delete**: When a task is deleted, it is marked as inactive instead of being permanently removed from the database.
 - **Repository Pattern**: The backend uses the repository pattern for organized and maintainable data access.

 ---

 ## Troubleshooting

 If you encounter any issues while setting up or running the application, please verify that:
 1. All prerequisites are installed.
 2. The database is running and the script was executed successfully.
 3. Dependencies are correctly installed in both the backend and frontend projects.


