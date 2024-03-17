// @ts-nocheck
import sessionHandler from "./sessionHandler";
import shopify from "./shopify";

const fetchSession = async ({ req, res, isOnline }) => {
    // console.log(req);
    //false for offline session, true for online session
    const sessionId = await shopify.session.getCurrentId({
        isOnline: isOnline,
        rawRequest: req,
        rawResponse: res,
    });
    const session = await sessionHandler.loadSession(sessionId);
    return session;
};

const clientProvider = async ({ req, res, isOnline }) => {
    const session = await fetchSession({ req, res, isOnline });
    const client = new shopify.clients.Rest({
        session,
        apiVersion: process.env.SHOPIFY_API_VERSION,
    });
    const { shop } = session;
    return { client, shop, session };
};

export default clientProvider;
