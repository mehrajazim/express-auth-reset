# Express API Project Setup

This guide will help you set up and run the project after cloning the repository.

---

## Steps to Get Started

1. **Clone the repository**
    ```
    git clone https://github.com/yourusername/your-repo.git
    cd your-repo
    ```

2. **Install dependencies**
    ```
    npm install
    ```

3. **Create a `.env` file**  
    The `.env` file is not included in the repository. You need to create one in the root directory and add these variables:

    ```
    DB_HOST=your_mysql_host
    DB_USER=your_mysql_user
    DB_PASSWORD=your_mysql_password
    DB_NAME=your_database_name
    JWT_SECRET_KEY=your_jwt_secret_key
    ```

4. **Set up your MySQL database**
    - Create a database locally using MySQL.
    - Use the credentials above in your `.env` file to match your local setup.

5. **Start the Express server**
    ```
    npm start
    # or if your entry file is app.js
    node app.js
    ```

6. **Test the API**
    - Use the [Thunder Client extension for VS Code](https://www.thunderclient.com/) or [Postman](https://www.postman.com/) to send test requests to your API endpoints.
    - After a successful login, you'll receive a JWT token.
    - Use this token in the `Authorization` header for further authenticated requests (as your session key).

---

Feel free to open issues or contribute to the project!
