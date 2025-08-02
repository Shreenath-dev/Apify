import { ApifyClient } from "apify-client";
import isEmpty from "is-empty";
import axios from "axios";

export const getActorList = async (req, res) => {
  try {
    const { body, cookies } = req;
    console.log(cookies.api_token,"srinath")
    const axios = require("axios");

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api.apify.com/v2/acts",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${cookies.api_token}`,
      },
    };

    const response = await axios.request(config);
    const data = response.data;

    console.log("Fetched actors:", data);

    return res.status(200).json({
      success: true,
      message: "Actors details fetched successfully",
      data: data.data,
    });
  } catch (err) {
    console.error("error message:", err);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const getActor = async (req, res) => {
  try {
    const { params, cookies } = req;

    if (!params.actorId) {
      return res.status(400).json({ success: false, message: "Missing actorId in URL" });
    }

    if (!cookies.api_token) {
      return res.status(401).json({ success: false, message: "Missing API token in cookies" });
    }

    console.log(params);

    const url = `https://api.apify.com/v2/acts/${params.actorId}`;
    console.log(url);

    const val = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${cookies.api_token}`,
      },
    };

    const response = await axios.request(val);
    const data = response.data;


    return res.status(200).json({
      success: true,
      message: "Actor details fetched successfully",
      data: data.data,
    });
  } catch (err) {
    console.error("Error fetching actor:", err.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const defaultActor = async (req, res) => {
  try {
    const { params, cookies } = req;

    if (!params.actorId) {
      return res.status(400).json({ success: false, message: "Missing actorId in URL" });
    }

    if (!cookies.api_token) {
      return res.status(401).json({ success: false, message: "Missing API token in cookies" });
    }

    const uri = `https://api.apify.com/v2/acts/${params.actorId}/run-sync`;

    const requestData = JSON.stringify({
      
        url: "https://app.apollo.io/#/people?sortByField=%5Bnone%5D&sortAscending=false&page=1&personLocations[]=United%20Kingdom"
      
    });

    const defaults = {
      method: 'post',
      maxBodyLength: Infinity,
      url: uri,
      headers: { 
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.api_token}`
      },
      data: requestData
    };

    const response = await axios.request(defaults);
    const data = response.data;

    return res.status(200).json({
      success: true,
      message: "Actor run started successfully",
      data: data,
    });
  } catch (err) {
    console.error("Error running actor:", err.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
