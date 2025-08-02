import isEmpty from "is-empty";
import ms from "ms";
import { v4 as uuid } from "uuid";
import config from "@/config";
import { User, Security, Token,UserSecurity } from "@/models";
import { decodeToken, generateAccessToken, generateRefreshToken } from "@/security/jwt";
import { comparePassword, hashingOTP, generatePassword, compareOTP } from "@/security/password";
import generateOTP from "@/utils/generateOtp";

export const apiToken = async (req, res) => {
  try {
    const { body, cookies } = req;

    const apiToken = body?.apiToken

    const cookieConfig = {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      partitioned: true,
    };

    res.header("Access-Control-Allow-Origin", config.FRONTEND_URL);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.cookie("api_token",apiToken, cookieConfig);

    return res.status(200).json({
      success: true,
      message: "Token recieved successfully",
      data:apiToken
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

