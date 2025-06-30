# Portfolio API Backend

This is the backend for a portfolio project built with **ASP.NET Core** and **Entity Framework Core** using **SQLite** as the database. It supports project management, user reviews, emoji-based reactions, email contact form, and protected Swagger access.

## 🚀 Features

- **Projects CRUD**: Add, update, delete, and list portfolio projects.
- **Reviews**: Users can leave comments on projects.
- **Reactions**: Add emoji reactions to reviews.
- **Contact Form**: Sends messages to your email via a contact endpoint.
- **Swagger UI**: Interactive API documentation with Basic Auth protection.
- **Health Check**: Endpoint for service monitoring.
- **CORS Policy**: Configurable frontend access policy for development and production.

---

## 📦 Technologies

- ASP.NET Core
- Entity Framework Core (EF Core)
- SQLite
- Swagger (Swashbuckle)
- MailKit (Email service)
- DotNetEnv (.env loading)

---

## 📁 Project Structure (MVC)

- `Controllers/`: API controllers for Projects, Reviews, Reactions, and Contacts.
- `Models/`: Entity and DTO classes.
- `Services/`: Reusable logic like database connection and Swagger authentication.
- `Program.cs`: Entry point with app configuration.
- `.env`: Configuration values.

---

## 🛠️ Setup & Run

1. **Clone the repository**:

   ```bash
   git clone https://github.com/alanarzumanjan/portfolio.git
   cd portfolio/backend
   ```

2. **Create `.env` file** in `/backend` directory:

   ```env
   DB_PATH=Data/portfolio.db
   EMAIL_ADDRESS=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   EMAIL_NAME=Your Name
   SWAGGER_ADMIN_LOGIN=admin
   SWAGGER_ADMIN_PASSWORD=secret
   ALLOWED_FRONTEND_ORIGIN=https://localhost:3000
   ```

3. **Run the app**:

   ```bash
   $env:ASPNETCORE_ENVIRONMENT="Development"
   dotnet run
   ```

4. **Open Swagger**:
   Visit [http://localhost:5000/swagger](http://localhost:5000/swagger)
   > Authenticate using your Swagger credentials from `.env`

---

## 📮 Contact Endpoint

**POST /Contacts**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, this is a test."
}
```

Sends an email to your configured Gmail inbox.

---

## 🔐 Swagger Authentication

Basic Authentication is enabled for `/swagger`. Use credentials from `.env`.

---

## 🧪 Health Check

**GET /health**  
Returns `200 OK` if the database is reachable.

---

## 📌 Notes

- Ensure the `.env` file **does not contain comments or spaces** that could break parsing.
- Make sure your **Google Account has "App Passwords" enabled** if you're using Gmail.
- CORS is restricted in production to the frontend origin defined in `.env`.

---

## 🧹 To Do

- Add logging to file
- Add pagination or filtering for projects
- Unit tests and CI

---

MIT License.
