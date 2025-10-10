import express from "express";
import cors from 'cors';
import { PORT } from "./config/env";
import router from "./routes/index.route";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
// testing server
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(cors())
app.use(express.json());

// Swagger docs (cast to any to satisfy Express v5 typings)
app.use('/api-docs', swaggerUi.serve as any, swaggerUi.setup(swaggerSpec) as any);

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
