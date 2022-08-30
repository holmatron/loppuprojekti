const dotenv = require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DB_CONNECTIONSTRING });

exports.listAllProductsHandler = async function customers() {
  const client = await pool.connect();
  const res = await client.query("SELECT * FROM product");
  console.log(res.rows);
  await client.release();

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin":
        "http://sweety-bucket.s3-website.us-east-2.amazonaws.com", // replace with hostname of frontend (CloudFront)
      "Access-Control-Allow-Headers":
        "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS, POST, PUT",
    },
    body: JSON.stringify(res.rows),
  };

  return response;
};
