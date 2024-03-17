import { Router } from "express";
import clientProvider from "./utils/clientProvider";

const userRoutes = Router();

userRoutes.get("/", (req, res) => {
    const sendData = { text: "This is coming from /apps/api route." };
    return res.status(200).json(sendData);
});

userRoutes.post("/", (req, res) => {
    return res.status(200).json(req.body);
});

userRoutes.get("/debug/rest", async (req, res) => {
    //false for offline session, true for online session
    const { client } = await clientProvider({
        req,
        res,
        isOnline: false,
    });

    const getResponse = await client.get({
        path: "products",
    });

    return res.status(200).json({ text: getResponse.body.products[0].title });
});

export default userRoutes;
