import CryptoJS from 'crypto-js';

export const config = { runtime: "edge" };

async function readStreamToString(stream) {
  const reader = stream.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    chunks.push(value);
  }

  // Concatenate all chunks into a single Uint8Array
  const combined = new Uint8Array(chunks.reduce((acc, val) => acc + val.length, 0)); // first create the correct-sized array
  let offset = 0;
  chunks.forEach(chunk => {
    combined.set(chunk, offset); // then fill it with data
    offset += chunk.length;
  });

  // Convert to string
  return new TextDecoder("utf-8").decode(combined);
}

export default async function handler(req, res) {
  const {
    nextUrl: { pathname },
    method,
    headers,
    body,
  } = req;
  headers.delete("host");
  headers.delete("referer");
  headers.delete("Content-Length");

  let path = pathname.split("/get");
  path.shift();
  path = path.join("");

  const encryptedPayload = await readStreamToString(body);

  const secretKey = "cu!PE8toBdRp";

  console.log("ecrypt payload: ",encryptedPayload);
  const bytes = CryptoJS.AES.decrypt(encryptedPayload, secretKey);
  const originalPayload = bytes.toString(CryptoJS.enc.Utf8);

  console.log("Decrypt payload: ",originalPayload);

  const url = `https://api.openai-sb.com${path}`;
  const options = {
    headers: headers,
    method: method,
    body: originalPayload,
    redirect: "follow",
  };
  const modifiedRequest = new Request(url, options);
  try {
    const response = await fetch(modifiedRequest);
    const modifiedResponse = new Response(response.body, response);
    modifiedResponse.headers.set("Access-Control-Allow-Origin", "*");
    return modifiedResponse;
  } catch (e) {
    console.log("catch: ", e);
  }
}
