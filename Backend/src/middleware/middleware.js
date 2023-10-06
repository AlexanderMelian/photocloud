import jwt from "jsonwebtoken";

export async function validateToken(req, res, next){
  try{
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'NO_AUTHORIZATION' });
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer') {
      return res.status(401).json({ error: 'BAD_FORMAT_TOKEN' });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'INVALID_TOKEN' });
      }

      req.userId = decoded.userId;
      next();
    });
  }catch(error){
      res.status(400).json({error: "Error token"})
  }
}
