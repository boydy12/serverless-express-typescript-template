import axios from "axios";

test("health returns 200 OK", async () => {
  await axios.get(process.env["API_URL"] + "/health").then((response) => {
    expect(response.status).toBe(200);
  });
});
