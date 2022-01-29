import express from "express";
import path from "path";
import AuthMiddleware, { AuthRequest } from "./middleware/Auth";

const app = express();
const port = parseInt(process.env.PORT ?? "8080");

app.use(AuthMiddleware);
app.use("/static", express.static(path.join(__dirname, "/static")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/templates"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/kucing", (req: AuthRequest, res) => {
  res.json({
    success: true,
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
