require("dotenv").config();
const dbSetup = require("./db/db-setup");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const usersRoute = require("./routes/users");
const companyRoute = require("./routes/company");
const departmentRoute = require("./routes/department");
const skillsRoute = require("./routes/skills");
const rolesRoute = require("./routes/roles");
const eventRoute = require("./routes/event");
const authRoute = require("./routes/auth");

dbSetup();
const app = express();

app.use(
  cors({
    preflightContinue: true,
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/user", usersRoute);
app.use("/company", companyRoute);
app.use("/department", departmentRoute);
app.use("/skill", skillsRoute);
app.use("/role", rolesRoute);
app.use("/event", eventRoute);
app.use("/auth", authRoute);

app.listen(process.env.PORT || 3001, () =>
  console.log("Server is up on", process.env.PORT)
);
