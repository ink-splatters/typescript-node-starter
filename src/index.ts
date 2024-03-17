import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const stream = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a commentator. Your job is to write a summary. Can you provide a comprehensive summary of the text given by the user ? The summary should cover all the key points and main ideas presented in the original text, while also condensing the information into a concise and easy-to-understand format. Please ensure that the summary includes relevant details and examples that support the main ideas, while avoiding any unnecessary information or repetition. The length of the summary should be roughly 1/3 of the original text or 50-100 words. Use a friendly and engaging tone to make the summary interesting and enjoyable to read. Write the summary in short paragraphs.",
      },
      {
        role: "user",
        content: `
        First published July 25, 2018An early reviewer pointed out that what follows depends substantially on acting from a position of privilege. Absolutely. What appear to be compliments can be assertions of power, & people with less power need to treat them differently than people with more power.At it’s best, a compliment is a warm fuzzy. Receiving or giving a compliment blesses the day. At it’s worst, a compliment is a naked power play, an assertion of dominance. Giving and receiving compliments are not natural skills. This article summarizes what I’ve learned about giving and receiving compliments so far.I first got interested in compliments when I heard Tom DeMarco tell the story of his father describing his latest book as “good”. “Good” is a positive thing to say, so why did the compliment leave Tom feeling so dissatisfied?Calling something good is only partly an assertion about the thing being described. It is also an assertion that the describer has the right to judge. “I have the right to judge the aesthetic quality of your hat.” Um, no you don’t, stranger. (And still I sometimes say, “Nice hat.”)“I like your hat,” is a better alternative. I’m making a statement about myself, which I have the right to do (although I don’t always exercise that right because, well, manners).“I like your hat” suggests the opportunity in compliments — connecting, not judging. Sharing appreciation is a way to bring people together. Straw fedoras are the best. Aren’t they just? And a connection is off and running.Judgmental “compliments” sever connection. “I’m not like you. I can judge and you can only be judged.” No wonder they feel icky.How can you compliment without judging? Say something about yourself. “That dress reminds me of a garden party.” “I cried when I heard you sing. It reminded me of my father.” “I feel instantly comfortable in your house.”Statements like these are only superficially about the dress, the voice, the decorating. The deeper message is, “I would like to be connected to you.”When I began offering connection with compliments I frequently stumbled. I was uncomfortable, vulnerable. It was easy to fall back on judgements. I stuck with it, though. I practiced. Over time it got easier. That thing I feared, outright rejection, was so rare I could ignore it.First, you are under no obligation to accept connection with anyone. Even creepos can offer syntactically-correct compliments. A simple “thanks” might be enough to end the interaction. [This is where my experience as a pale male differs wildly from those with less power.]Many people feel ashamed that they can’t accept compliments. In some of the cases where I’ve asked about this inability to accept compliments, what seems to be going on is that the person is not able to accept judgements.Rejecting judgement seems like a healthy response. “You’re so handsome.” Who died and left you in charge of People Magazine’s 50 Most Beautiful People? The rejection is not rejection of the judgement, it is a rejection of the right to judge. Again, if you don’t want to get into it, “thanks” often ends the interaction.Receiving a compliment means accepting the offer of connection. Say something about yourself. “I like how that hat amplifies your eyes.” “I feel good every time I put it on.” With practice, I can do this fairly consistently even though it felt vulnerable at first.Sometimes I will receive a judgy compliment that I suspect is camouflaging a desire to connect. “That was a great talk!” This doesn’t give me anything to respond to. “It certainly was,” seems not to be socially appropriate (<- determined experimentally).If I want to connect, I will invite the complimenter to say something about themselves. “Thanks. Was there a story that stood out for you?” “What did it remind you of in your current work?” “What’s the first thing you’re going to try?”Appreciation without an agenda is fundamentally attractive. Compliments are an everyday ordinary way to offer and accept connection. Those first few steps away from judgement might feel shaky, but genuine compliments get easier with practice.
        `,
      },
    ],
    model: "gpt-3.5-turbo",
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
}

main();
