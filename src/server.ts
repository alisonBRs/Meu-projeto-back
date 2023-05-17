import { App } from "./app";
import { Home } from "./routes/home";

const port = 3030;
const url = `http://localhost:${port}`;
const message = `Server running at port: ${url}`;

const app = new App([new Home()]);

app.listen(port, message);
