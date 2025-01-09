import express from "express";
import cors from "cors"; 

const app = express();
const PORT = 3000;

// Enable CORS for all routes and origins
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Endpoint to handle Langflow API request
app.post("/run-flow", async (req, res) => {
    const fetch = (await import("node-fetch")).default; // Dynamically import node-fetch
    const { inputValue } = req.body;

    const flowIdOrName = "d15dac27-2fab-484c-b455-aa8c465374ce";
    const langflowId = "745ec371-b319-42b9-984f-0e30fd586c1e";
    const applicationToken = "AstraCS:ZEtSMLhariZyxjZiuQvJDJSY:39ab815aa12dcd199c5943267d1301a928e8fc4861c9d8036c99e697a37f3b41";
    const baseURL = "https://api.langflow.astra.datastax.com";

    const tweaks = {
        "ChatInput-hhLJ6": {},
        "Agent-OuJKa": {},
        "Prompt-RAQCt": {},
        "AstraDBToolComponent-zKc4N": {},
        "ChatOutput-vvJh3": {},
    };

    try {
        const response = await fetch(`${baseURL}/lf/${langflowId}/api/v1/run/${flowIdOrName}?stream=false`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${applicationToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                input_value: inputValue,
                input_type: "chat",
                output_type: "chat",
                tweaks: tweaks,
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.json(data);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
