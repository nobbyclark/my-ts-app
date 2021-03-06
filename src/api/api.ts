import { ErrorInfo } from "react";

const sleep = (time: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, time);
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function reportError(error: Error, errorInfo: ErrorInfo) {
  await sleep(1000);
  return { success: true };
}

async function loadGreeting(subject: string) {
  return { data: { greeting: `Hello ${subject}` } };
}

async function savePost(postData: {
  title: string;
  content: string;
  tags: string[];
}) {
  await sleep(1000);
  return { data: { post: postData } };
}

export { reportError, loadGreeting, savePost };
