import express from "express";
import { Authmiddleware } from "./middleware";
import { CreateRoom } from "./routes/route";

const app=express();
const PORT=process.env.PORT|| 3001;

app.use(express.json());

app.post("/room", Authmiddleware, CreateRoom);
app.post("/room/:id", Authmiddleware, );
app.post("/signup", );
app.post("/login",Authmiddleware );


app.listen(PORT, () => {
    console.log(`HTTP Backend is running on http://localhost:${PORT}`);
});