import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = String(req.query.name);
  const fileContents = JSON.parse(
    await fs.readFile("json/all-routes.json", "utf8")
  );
  const keys = Object.keys(fileContents);

  if (fileContents[name]) {
    let result = {
      stat: true,
      route: fileContents[name],
    };

    res.status(200).json(result);
  } else {
    let closest = 10000000;
    let closestStr = null;

    for (let i = 0; i < keys.length; i++) {
      let dist = levenshteinDistance(keys[i], name);

      if (dist < closest) {
        closest = dist;
        closestStr = keys[i];
      }
    }

    let result = {
      stat: false,
      closest: closestStr,
    };

    res.status(200).json(result);
  }
}

function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;

  // Create a 2D array to store the distances
  const dp: number[][] = [];

  // Initialize the first row and first column of the array
  for (let i = 0; i <= m; i++) {
    dp[i] = [i];
  }

  for (let j = 1; j <= n; j++) {
    dp[0][j] = j;
  }

  // Fill the array using dynamic programming approach
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          Math.min(
            dp[i - 1][j], // Deletion
            dp[i][j - 1], // Insertion
            dp[i - 1][j - 1] // Substitution
          ) + 1;
      }
    }
  }

  // The final result is at the bottom-right of the array
  return dp[m][n];
}
