// import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
// export const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   console.log(authHeader);

//   if (!authHeader) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   const token = authHeader.split(' ')[1];
//   const secret = process.env.ACCESS_SECRET_KEY
//   try {
//     const user = jwt.verify(token, secret);
//     req.userId = user.id;
//     console.log(user);
//     next();
//   } catch (err) {
//     res.status(401).send({
//       message: "failed",
//       error: err.message
//     })
//     console.log(err);
//   }

// };
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // Extract the token from the "Authorization" header
  const token = req.header("Authorization");

  // Check if the token is missing or doesn't start with "Bearer "
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Remove "Bearer " from the token string
  const tokenWithoutBearer = token.slice(7);

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(
      tokenWithoutBearer,
      process.env.ACCESS_SECRET_KEY
    );
    // You can access the decoded data in the 'decoded' variable
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
