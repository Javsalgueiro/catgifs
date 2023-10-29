const express = require('express');
const openai = require('openai');

const app = express();

app.use(express.json());

openai.apiKey = process.env.OPENAI_API_KEY;

app.post('/generate-response', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const completion = await openai.Completion.create({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 150,
    });

    res.json({ response: completion.choices[0].text.trim() });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
