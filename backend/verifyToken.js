import  jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const VerifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
      if (error) {
        return res.status(403).json("token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("Not authenticated");
  }
};

const VerifyTokenAndStudent = (req, res, next) => {
  VerifyToken(req, res, () => {
    if (req.user.role === "student") {
      next();
    } else {
      res.status(403).json("Not allowed");
    }
  });
};

const VerifyTokenAndAdmin = (req, res, next) => {
  VerifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(403).json("Not allowed");
    }
  });
};

const VerifyTokenAndOwner = (req, res, next) => {
    VerifyToken(req, res, () => {
      if (req.user.role === "owner") {
        next();
      } else {
        res.status(403).json("Not allowed");
      }
    });
  };

export { VerifyToken, VerifyTokenAndStudent, VerifyTokenAndAdmin, VerifyTokenAndOwner };
