require("dotenv").config();
const dbSetup = require("./db/db-setup");
const express = require("express");
const cors = require("cors");

const usersRoute = require("./routes/users");
const companyRoute = require("./routes/company");
const departmentRoute = require("./routes/department");
const skillsRoute = require("./routes/skills");
const rolesRoute = require("./routes/roles");

dbSetup();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", usersRoute);
app.use("/company", companyRoute);
app.use("/department", departmentRoute);
app.use("/skill", skillsRoute);
app.use("/role", rolesRoute);

app.listen(process.env.PORT || 3001, () =>
  console.log("Server is up on", process.env.PORT)
);
